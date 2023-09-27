const clientId = 'f6974b78e2d0494da23391cd8599b3bb';
const clientSecret = 'cae1c2b6ba8948488df8d97de2bd4c31';

const getToken = async () => {
    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic "+btoa(clientId+":"+clientSecret)
        },
        body: "grant_type=client_credentials"
    });

    const data = await result.json();
    return data.access_token;
};

const getGeneres = async(token) =>{
    const result = await fetch('https://api.spotify.com/v1/browse/categories?locale=pt_BR',
    {
        method: "GET",
        headers: {
            "Authorization": "Bearer "+token
        }
    });
    const data = await result.json();
    return data.categories;
};

const getPlaylistByGenre = async (token, genreId) => {
    const limit = 10;
  
    const result = await fetch(
      `https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`,
      {
        method: "GET",
        headers: { "Authorization": "Bearer " + token },
      }
    );
  
    const data = await result.json();
    return data.playlists;
  };
  
  const getPlaylistTracks =  async ( token, playlistID) =>{
    const result = await fetch(`https://api.spotify.com/v1/playlist/${playlistID}`,
    {
        method: "GET",
        headers: { "Authorization": "Bearer " + token },
    })
    const data = await result.json();
    return data.tracks;
  }

(async () =>{
    const token = await getToken();
    const generos = await getGeneres(token);
    console.log('Token:', token);
    const genID = generos.items[0].id;
    const playlists = await getPlaylistByGenre(token, genID);
    const playlistID = playlists.items[0].id;
    const tracks = await getPlaylistTracks(token, playlistID);
    console.log(tracks); 
})();



