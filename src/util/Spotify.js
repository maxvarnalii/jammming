let accessToken;
let expiresIn;
const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId ='5b7788d3c24446d390a67a0130167be1';
const redirectUri = 'https://varnalii_jammming.surge.sh';


const Spotify = {
// Checks to see if an active access token exists and, if not, requests one from Spotify
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    } else {
// Extracts the access token from the URL returned by Spotify
      if(window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/)) {
        accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
        expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
        window.setTimeout(() => accessToken = '', expiresIn*1000);
        window.history.pushState('Access Token', null, '/');
        return accessToken;
      } else {
// If there is no saved access token and one cannot be extracted from the URL,
// request one from Spotify
        let url = `${authEndpoint}?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
        window.location = url;
      }
    }
  }, // End of getAccessToken

  // Takes the term passed from the search function in App,
  // searches for that title, artist or album on Spotify and returns the results.
  search(searchTerm) {
    accessToken = this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
      {
        headers: {Authorization: `Bearer ${accessToken}`}
      }).then(response => {
          return response.json();
      }).then(jsonResponse => {
          if (jsonResponse.tracks.items) {
            return jsonResponse.tracks.items.map(track => ({
              id : track.id,
              name : track.name,
              artist : track.artists[0].name,
              album : track.album.name,
              uri : track.uri
            }));
          }
        })
  }, // End of search

  // Creates a new playlist on Spotify with the name passed to it,
  // then uploads the tracks into the new playlist.
  async savePlaylist(playlistName, trackUris) {
    if (!playlistName || !trackUris) {
// If either playlistName or tracks is empty, return without doing anything
      return
    }
    accessToken = this.getAccessToken();
    let userId;
    let playlistId;
    try {

// This section retrieves the user ID from Spotify,
// which will be used to create a new playlist

      let response = await fetch('https://api.spotify.com/v1/me', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (!response.ok) {
        alert('There was a problem retrieving your user ID.');
        return;
      }
      let jsonResponse = await response.json();
      userId = jsonResponse.id;

// If the user ID was successfully retrieved, this section will create
// a new playlist on Spotify with the name chosen by the user

      let nameResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: playlistName
        })
      });
      if (!nameResponse.ok) {
        alert('There was a problem posting the playlist name.');
        return;
      }
      jsonResponse = await nameResponse.json();
      playlistId = jsonResponse.id;

// If the playlist was successfully created, this section will pass the
// list of tracks to the playlist in the form of uri's

      let tracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({uris: trackUris})
      });
      if (!tracksResponse.ok) {
        alert('There was a problem posting the playlist tracks.');
        return;
      }
    } // End of try
    // Catch errors from try
    catch(error) {
      console.log(error);
      return;
    }
    return 'Done';
  } // end of savePlaylist
}; // end of Spotify method



export default Spotify;
