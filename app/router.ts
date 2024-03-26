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
    route("/welcome", "pages/welcome.tsx"),
    route("/", "layout/RootLayout.tsx", () => {
      route("", "pages/home.tsx", { index: true }),
        route("artists", "pages/artists.tsx"),
        route("tracks", "pages/tracks.tsx"),
        route("recent", "pages/recent.tsx"),
        route("logout", "pages/auth/logout.tsx"),
        route("login", "pages/auth/login.tsx"),
        route("callback", "pages/auth/callback.tsx")
    })
  })
}
