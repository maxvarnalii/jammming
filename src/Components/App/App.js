import React, { Component } from 'react';
import './App.css';

import SearchResults from '../SearchResults/SearchResults';
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';





class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: 'My songs',
      playlistTracks: []
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

  };

addTrack(track) {
    //Check if the track being added to the playlist is already in the playlist
      if (this.state.playlistTracks.find(addTrack => addTrack.id === track.id)) {
          return;
      }
      let tracks = this.state.playlistTracks;
      tracks.push(track);
      this.setState({playlistTracks: tracks});
  }

removeTrack(track) {
    // remove track from the Playlist state and then update state
    const playlistAfterRemove = this.state.playlistTracks.filter((arrayTrack) => {
      return arrayTrack.id !== track.id;
    })
    this.setState({playlistTracks : playlistAfterRemove });
  }

updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
      const playlistUris = this.state.playlistTracks.map(track => track.uri);
      Spotify.savePlaylist(this.state.playlistName, playlistUris).then(response => {
        if (response) {
          this.setState({ playlistName: "New Playlist",
            playlistTracks : [] });
        }});
    }

search(searchTerm) {
      Spotify.search(searchTerm).then(searchTracks => {
      this.setState({searchResults : searchTracks});
    });
  }


render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch = {this.search}/>
          <div className="App-playlist">
            <SearchResults SearchResultsPropFromApp = {this.state.searchResults} onAdd = {this.addTrack} isRemoval = {false} />
            <Playlist AddedSongs = {this.state.playlistTracks} playlistName = {this.state.playlistName} onRemove = {this.removeTrack} onNameChange = {this.updatePlaylistName} onSave ={this.savePlaylist} />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
