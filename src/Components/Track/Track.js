import React, { Component } from 'react';
import './Track.css';

class Track extends Component {

    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
    }

    addTrack() {
      this.props.onAdd(this.props.track)
    }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        <a class="Track-action" onClick = {this.addTrack}>+{/*<!-- + or - will go here -->*/}</a>
      { /* Create a method called renderAction that displays a - anchor tag if the isRemoval property is true, and a + anchor tag if the isRemoval property is false. */}

      </div>

    )
  }
}

export default Track;
