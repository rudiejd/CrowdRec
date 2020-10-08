import {withRouter} from 'react-router-dom';
import React, {Component} from 'react';
import {
  Card, Form, Button, Alert, Row, Container
} from 'react-bootstrap';
import {connect} from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-js';

const spotify = new SpotifyWebApi();


class SpotifyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {resultReceived: false, recOutput: {}, errorStatus: undefined};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.processResults = this.processResults.bind(this);
    this.getRecs = this.getRecs.bind(this);
    this.createPlaylist = this.createPlaylist.bind(this);
    this.countTracks = this.countTracks.bind(this);
    this.getRandomTrack = this.getRandomTrack.bind(this);
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
    debugger;
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
    return sorted;
  }


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
                song.artists[0] = band
              )
              console.log('filtered: ');
              console.log(filteredByBand);
              console.log('regular: ');
              console.log(tracks);
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
    debugger;
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
        Promise.all(addPromises).then(() => this.setState({alert: 'Playlist created! Click below to open it up. Enjoy :)'}));
      }
    });
  }

  /**
     *  Handles submission of Artist form
     * @param {Object} e Submission event
     * TODO: Error handling
     */
  handleSubmit(e) {
    e.preventDefault();
    spotify.setAccessToken(this.props.vars.token);
    this.setState({errorStatus: undefined, alert: undefined});
    console.log(this.state);
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
            <Container>{this.state.alert}
              <br />
              <a href={this.state.playlistUrl}>{this.state.playlistUrl}</a>
            </Container>
          </Alert>
        ) : null }
        {this.state.errorStatus !== undefined ? <Alert className="alert-danger">{this.state.errorStatus}</Alert> : null }
        <Card>
          <Card.Body>
            <Card.Title>Enter artist's name for recommendations</Card.Title>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>Artist</Form.Label>
                <Form.Control type="text" placeholder="Iron Maiden" name="artist" onChange={this.handleChange} required />
              </Form.Group>
              <Form.Group>
                <Form.Control type="submit" className="bg-primary text-light col-8 offset-2" />
              </Form.Group>
              <Form.Group>
                <Form.Control type="reset" className="bg-primary text-light col-8 offset-2" />
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>

        <div className="d-block">
          {this.state.resultReceived ? (
            <h4>
              Recommended Artists for {this.state.artist}
            </h4>
          ) : null }
          <Row>
            <ul className="col-6">
              {this.state.resultReceived ? Object.keys(this.state.recOutput).map((band) => (
                <li key={band}>
                  {band}
                  :
                  {' '}
                  {this.state.recOutput[band]}
                </li>
              )) : null }
            </ul>
            {this.state.resultReceived ? <Button className="mt-3 col-6 h-50 w-50" onClick={this.createPlaylist}>Create a playlist with songs from these artists</Button> : null}
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
