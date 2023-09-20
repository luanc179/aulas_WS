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
};