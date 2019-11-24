// @flow

import * as React from 'react';
import { Component } from 'react-simplified';

export class Up extends Component {
  render() {
    return (
      <div>
        <button type="button" className="btn btn-info up" onClick={this.toTop}>
          To the {<div> top </div>}
        </button>
      </div>
    );
  }

  toTop() {
    document.documentElement.scrollTop = 0;
  }
}
