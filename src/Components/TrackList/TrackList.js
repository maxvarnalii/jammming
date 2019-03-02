import React, { Component } from 'react';
import './TrackList.css';
import Track from "../Track/Track";

class TrackList extends Component {
  render () {
    return (
      <div className="TrackList">
        {this.props.tracks.map(oneTrack =>
          <Track track={oneTrack} key={oneTrack.id}/>)
        }
      </div>
    )
  };
}

export default TrackList;
