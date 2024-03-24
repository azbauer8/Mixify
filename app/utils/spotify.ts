import SpotifyWebApi from "spotify-web-api-node"

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri:
    process.env.NODE_ENV === "development"
      ? process.env.SPOTIFY_CALLBACK_URL_DEV
      : process.env.SPOTIFY_CALLBACK_URL_PROD,
})

const spotifyClient = (accessToken: string) => {
  spotifyApi.setAccessToken(accessToken)
  return spotifyApi
}

export default spotifyClient
