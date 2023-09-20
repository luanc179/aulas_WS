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

(async () =>{
    const token = await getToken();
    const generos = await getGeneres(token);
    console.log('Token:', token);
    console.log(generos);
})();
