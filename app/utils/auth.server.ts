import { sessionStorage } from "@/utils/session.server"
import { Authenticator } from "remix-auth"
import { SpotifyStrategy } from "remix-auth-spotify"

if (!process.env.SPOTIFY_CLIENT_ID) {
  throw new Error("Missing SPOTIFY_CLIENT_ID env")
}

if (!process.env.SPOTIFY_CLIENT_SECRET) {
  throw new Error("Missing SPOTIFY_CLIENT_SECRET env")
}

if (
  !process.env.SPOTIFY_CALLBACK_URL_DEV ||
  !process.env.SPOTIFY_CALLBACK_URL_PROD
) {
  throw new Error("Missing SPOTIFY_CALLBACK_URL env")
}

const scopes = [
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-library-read",
  "user-top-read",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-read-currently-playing",
  "user-read-playback-position",
  // "user-read-private",
  // "streaming",
  // "user-modify-playback-state",
  // "app-remote-control",
  // "streaming",
].join(" ")

export const authClient = new SpotifyStrategy(
  {
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL:
      process.env.NODE_ENV === "development"
        ? process.env.SPOTIFY_CALLBACK_URL_DEV
        : process.env.SPOTIFY_CALLBACK_URL_PROD,
    sessionStorage,
    scope: scopes,
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => ({
    accessToken,
    refreshToken,
    expiresAt: Date.now() + extraParams.expiresIn * 1000,
    tokenType: extraParams.tokenType,
    user: {
      id: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
      image: profile.__json.images?.[0]?.url,
    },
  })
)

export const authenticator = new Authenticator(sessionStorage, {
  sessionKey: authClient.sessionKey,
  sessionErrorKey: authClient.sessionErrorKey,
})

authenticator.use(authClient)
