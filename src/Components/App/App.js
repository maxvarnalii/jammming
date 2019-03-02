import React, { Component } from 'react';
import './App.css';

import SearchResults from '../SearchResults/SearchResults';
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';




class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [
        { name: 'Wonderwall',
          artist: 'Oasis',
          album: 'What\'s the story morning glory',
          id: '111'
        },

        { name: 'Here Comes The Sun',
          artist: 'Beatles',
          album: 'Abbey Road',
          id: '222'
        },

        { name: 'Somebody To Love',
          artist: 'Queen',
          album: 'A Day at the Races',
          id: '333'
        }
      ],

      playlistName: 'My songs',
      playlistTracks: [
        { name: 'Wonderwall',
          artist: 'Oasis',
          album: 'What\'s the story morning glory',
          id: '111'
        }]
    }

    this.addTrack = this.addTrack.bind(this);
  }
//{/*end of constructor*/}

    addTrack (track) {
        if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
          return;
        } /*else {
            const newPlaylist = [];
            newPlaylist.push(track);
            this.setState({ playlistTracks : newPlaylist });
          }
        }*/
    };
render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults SearchResultsPropFromApp = {this.state.searchResults} onAdd = {this.state.addTrack} isRemoval = {false} />
            <Playlist AddedSongs = {this.state.playlistTracks} playlistName = {this.state.playlistName} />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
