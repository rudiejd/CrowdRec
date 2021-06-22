import React from 'react';

export function isDevReact() {
    try {
      React.createClass({});
    } catch(e) {
      if (e.message.indexOf('render') >= 0) {
        return true;  // A nice, specific error message
      } else {
        return false;  // A generic error message
      }
    }
    return false;  // should never happen, but play it safe.
}