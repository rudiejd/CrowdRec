import {withRouter} from 'react-router-dom';
import React, {Component} from 'react';
import {
   Form, Button, Alert, Row
} from 'react-bootstrap';
import {connect} from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-js';
import Text from './Text';
import BandPaginator from './BandPaginator';

const spotify = new SpotifyWebApi();


class SpotifyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {resultReceived: false, recOutput: {}, recItems: [], errorStatus: undefined};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.processResults = this.processResults.bind(this);
    this.getRecs = this.getRecs.bind(this);
    this.createPlaylist = this.createPlaylist.bind(this);
    this.countTracks = this.countTracks.bind(this);
    this.getRandomTrack = this.getRandomTrack.bind(this);
  }

  /**
   * Runs after component mounts,  decodes the access token if applicable
   */
  componentDidMount() {
    const hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce(function (initial, item) {
      if (item) {
        var parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});

    const access_token = hash.access_token;
    this.props.change({'name': 'token', 'value': access_token})
  }

  /**
     * Handle change in the artist value
     * @param {Object} event Event incurred by change
     */
  handleChange(event) {
    this.setState({resultReceived: false, alert: undefined});
    const {target} = event;
    const {value} = target;
    const {name} = target;
    this.setState({[name]: value});
    this.render();
  }

  /**
     * Handle HTTP errors encountered by updating the state with an error message
     * @param {Object} err
     */
  async handleError(err) {
    switch (err.status) {
      case 401:
        this.setState({errorStatus: 'You don\'t seem to be authorized. Try clicking the button above to authorize with Spotify and try again.', resultReceived: false});
        break;
      case 429:
        this.setState({errorStatus: 'Looks like we\'re making too many requests to Spotify right now. Wait a little bit and try that again.'});
        break;
      case 501:
        this.setState({errorStatus: 'Spotify\'s servers are fried! Check out their status, then try again when they\'re back up'});
        break;
      default:
        console.log(err);
    }
  }

  /**
     * Checks whether a playlist contains is valid. Criteria for validity are:
     *  - playlist attributes are well-defined (no null properties)
     *  - playlist must contain the artist for which user is searching
     * @param {string} id ID of playlist
     * @param {*} artist Name of artist
     * @return {Promise<boolean>} true if playlist is valid, false otherwise
     */
  async isPlaylistValid(id, artist) {
    return spotify.getPlaylistTracks(id)
        .then(
            (pt) => {
              if (pt === undefined) {
                return;
              }
              for (const track of pt.items) {
                if (track === undefined || track.track === null) {
                  continue;
                } else if (track.track.artists[0].name === artist) {
                  return true;
                }
              }
              return false;
            },
        );
  }

  /**
     * Asynchronously counts tracks by a given artist in a given playlist
     * @param {string} id ID of the playlist
     * @param {string} name Name of the artist
     * @param {object} output Reference to output object which should be modified
     * @return {Promise}
     */
  async countTracks(id, name, output) {
    const MAX_SONGS = 200;
    return spotify.getPlaylistTracks(id).then(
        (pt) => {
          let curSongs = 0;
          for (const track of pt.items) {
            if (curSongs > MAX_SONGS) break;
            if (track.track != null &&
                        track.track.artists[0].name !== name &&
                        track.track.artists[0].name !== '') {
              if (track.track.artists[0].name in output) {
                output[track.track.artists[0].name]++;
              } else {
                output[track.track.artists[0].name] = 1;
              }
            }
            curSongs++;
          }
        },
    ).catch((err) => {
        if (err.status === 429) {
            setTimeout(this.countTracks(id, name, output), 500);
        } 
        this.handleError(err)
    });
  }

  /**
     * Gets recommendations for a specific artist and outputs recOutput value in state
     * @param {string} name The name of the artist
     * @return {Promise}
     * /
    * */
  async getRecs(name) {
    const output = {};

    const promises = [];
    await spotify.searchPlaylists(name, {limit: 1})
        .then(async (searchTotal) => await spotify.searchPlaylists(name, {limit: 50, offset: Math.floor(Math.random() * (searchTotal.playlists.total / 50))}).then(
            (res) => {
              for (const i of res.playlists.items) {
                promises.push(this.isPlaylistValid(i.id, name)
                    .then((valid) => (valid ? this.countTracks(i.id, name, output) : null)));
              }
            },
        )).catch((err) => {
                this.handleError(err)
        });

    return Promise.all(promises).then(() => this.setState({recOutput: this.processResults(output), artist: name}));
  }

  /**
     * Processesresults from our query to spotify, removing entries beyond a certain threshhold then sorting the object.
     * @return Results
     */
  processResults(input) {
    const processed = {};
    for (const key in input) {
      if (input[key] > 10) {
        processed[key] = input[key];
      }
    }
    const sorted = Object.fromEntries(
        Object.entries(processed).sort(([, a], [, b]) => b - a),
    );
    let output = [];
    for (const key in sorted) {
      output.push(key);
    }
    this.setState({recItems: output});
    fetch("https://api64.ipify.org?format=json")
      .then(response => {
        return response.json();
      }, "jsonp")
      .then(res => {
      fetch(`https://rudiejd.aws.csi.miamioh.edu/final.php?method=logRec&artist=${this.state.artist}&recommendations=${output.join(',')}&ip=${res.ip}`, {
        method: 'POST',
        })
      })
      .catch(err => console.log(err))
    return sorted; 
  }

  /**
   * Gets a random track for a given band. 
   * @param {string} band 
   */
  getRandomTrack(band) {
    return spotify.searchTracks(band, {limit: 1})
        .then((searchTotal) => spotify.searchTracks(band, {limit: 50}))
        .then(
            (tracks) => {
              if (tracks === undefined || tracks.tracks === null) {
                  return this.getRandomTrack(band);
              }
              // filter so we only get songs by the artist
              let filteredByBand = tracks.tracks.items.filter(song =>
                song.artists[0].name === band
              )

              return filteredByBand[Math.floor(Math.random() * filteredByBand.length)];
            },
        ).catch(err => { 
            
            if (err.status === 429) {
                setTimeout(() => console.log("waiting to prevent 429..."), 500)
                return this.getRandomTrack(band)
            } else {
                this.handleError(err);
            } 
            
             
        })
  }

  /**
     * Creates playlist with one random song from each output artist
     */
  createPlaylist() {
    const promises = [];
    const trackUris = [];

    Object.keys(this.state.recOutput).forEach(async (artist) => {
      promises.push(
              this.getRandomTrack(artist)
              .then((track) => trackUris.push(track.uri))
              .catch((err) => this.handleError(err)
      ));
    });

    // this.setState({playlistUrl: playlist.external_urls["spotify"]})
    Promise.all(promises).then(() => {
      if (this.state.errorStatus === undefined) {
        const addPromises = [];
        spotify.getMe()
            .then((me) => spotify.createPlaylist(me.id, {name: `Recommendations Based on  ${this.state.artist}`, public: false}))
            .then((playlist) => {
              trackUris.forEach(
                  (uri) => addPromises.push(
                      spotify.addTracksToPlaylist(playlist.id, [uri])
                      .catch(err => {
                        if (err.status === 429) {
                            setTimeout(() => console.log("waiting to prevent 429..."), 500)
                            return spotify.addTracksToPlaylist(playlist.id, [uri]);
                        } else {
                            this.handleError(err);
                        }
                        
                      })
                      
                    )
              );
              this.setState({playlistUrl: playlist.external_urls.spotify});
            });
        Promise.all(addPromises).then(() => this.setState({playlistCreated: true}));
      }
    });
  }

  /**
     *  Handles submission of Artist form
     * @param {Object} e Submission event
     * 
     */
  handleSubmit(e) {
    e.preventDefault();
    spotify.setAccessToken(this.props.vars.token);
    this.setState({errorStatus: undefined, alert: undefined});
    spotify.searchArtists(this.state.artist)
        .then(async (res) => await this.getRecs(res.artists.items[0].name))
        .then(() => {
        // Only show recommendations if they're non empty
          if (this.state.errorStatus === undefined) {
            if (Object.keys(this.state.recOutput).length === 0) {
              this.setState(
                  {errorStatus: 'Unfortunately, we could not find any recommendations for that artist at this time. Feel free to try another one, or try again since recommendations are randomly generated.'},
              );
            } else {
              this.setState({resultReceived: true});
            }
          }
        })
        .catch((err) => {
            if (err.status === 429) {
                setTimeout(() => console.log("waiting to prevent 429..."), 500)
                return this.handleSubmit(e);
            } 
            this.handleError(err)}
        );
  }


  /**
     * Render the component
     * @return JSX
     */
  render() {
    return (
      <>
        {this.state.alert !== undefined ? (
          <Alert className="alert-success">
            <Text>
              {this.state.alert}
              <br />
              <a href={this.state.playlistUrl}>{this.state.playlistUrl}</a>
            </Text>
          </Alert>
        ) : null }
        {this.state.errorStatus !== undefined ? 
        <Alert className="alert-danger">
          <Text>{this.state.errorStatus}</Text>
        </Alert>
         : null }
            
            
            {this.state.resultReceived ? 
              null : 
            <div className="p-lg-5">
            <h1 className="mb-5 text-center">Enter artist's name for recommendations</h1>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group className="d-flex justify-content-center">
                <Form.Control type="text" placeholder="Iron Maiden" name="artist" className="w-50" onChange={this.handleChange} required />
              </Form.Group>
              <Form.Group className="d-flex justify-content-center">
                <Form.Control type="submit" className="w-25 bg-primary text-light" value="Go!"/>
              </Form.Group>
            </Form> 
            </div>}

        <div>
          {this.state.resultReceived ? (
            <h1 className="mb-2 text-center">
              Since you like {this.state.artist}, you might like:
            </h1>
          ) : null }
              {this.state.resultReceived ? 
              (
                <BandPaginator bands={this.state.recItems} perPage={5}></BandPaginator>
              ) : null }
            <Row className="d-flex justify-content-center">
              {this.state.resultReceived ? 
                this.state.playlistCreated ?
                <Button className="bg-success mt-3"onClick={ () => {window.location.href = this.state.playlistUrl;} }> Playlist created! Click to open it up.</Button> :
                <Button className="mt-3" onClick={this.createPlaylist}>Create a playlist with songs from these artists</Button> : 
                null
                }
            </Row>    
        </div>

      </>


    );
  }
}

// mapping our redux state to box props
const mapStateToProps = (state) => ({
  vars: state.vars,
});

// mapping the dispatches from our reducer to box props
const mapDispatchToProps = (dispatch) => ({
  change: (vName) => dispatch({type: 'CHANGE', name: vName}),

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SpotifyForm));
