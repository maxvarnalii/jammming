import React, { Component } from 'react';
import './Track.css';

class Track extends Component {

    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.renderAction = this.renderAction.bind(this);

    }

    addTrack() {
      this.props.onAdd(this.props.track)
    }

    removeTrack () {
      this.props.onRemove(this.props.track)
    }

    renderAction() {
      return (this.props.isRemoval) ?
        <a className="Track-action" onClick={this.removeTrack}>-</a> :
        <a className="Track-action" onClick={this.addTrack}>+</a>
      }


  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.renderAction()}
      </div>

    )
  }
}

export default Track;
