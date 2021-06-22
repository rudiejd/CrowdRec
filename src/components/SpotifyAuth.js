import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';

// I got most of this authorization method from StackOverflow. I used redux to share the token across components. 

export const authEndpoint = 'https://accounts.spotify.com/authorize';
class SpotifyAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticatedWithSpotify: false
    };
    this.state.handleRedirect = this.handleRedirect.bind(this);
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
 * On click of button, redirect to the spotify Implicit-Grant flow portal with our presets. Auth modes used:
 *  user-read-private
 *  playlist-modify-public
 *  playlist-modify-private
 * @param {*} event Change event for button 
 */
  handleRedirect(event) {
    event.preventDefault();
    let url =
      'https://accounts.spotify.com/authorize' +    
      '?response_type=token' +
      '&client_id=3f31f6d13b974219a7093698a47d76f9' +
      '&scope=' +
      encodeURIComponent('user-read-private%20playlist-modify-public%20playlist-modify-private') +
      '&redirect_uri=' +
      encodeURIComponent('https://crowdrec.rudiejd.io');
      window.location = url;
  }

  render() {
    return (

        <Button className="sp_button mt-4" onClick={(event) => this.handleRedirect(event)} >
          Link spotify to get started
        </Button>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      vars:state.vars
    }
  };
  
  // mapping the dispatches from our reducer to box props 
  const mapDispatchToProps = (dispatch) => {
    return {
      change: (vName) => dispatch( {type: 'CHANGE', name: vName} ),
  
    }
  
  }

export default connect(mapStateToProps, mapDispatchToProps)(SpotifyAuth);