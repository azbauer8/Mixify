import {
  DefineRouteFunction,
  RouteManifest,
} from "@remix-run/dev/dist/config/routes"

export default function router(
  defineRoutes: (
    callback: (defineRoute: DefineRouteFunction) => void
  ) => RouteManifest
) {
  return defineRoutes((route) => {
    route("/", "pages/home.tsx", { index: true }),
      route("/artists", "pages/artists.tsx", { index: true }),
      route("/tracks", "pages/tracks.tsx", { index: true }),
      route("/recent", "pages/recent.tsx", { index: true }),
      route("/logout", "pages/auth/logout.tsx", { index: true }),
      route("/login", "pages/auth/login.tsx", { index: true }),
      route("/callback", "pages/auth/callback.tsx", { index: true })
  })
}
