import { authenticator } from "@/utils/auth.server"
import type { LoaderFunctionArgs } from "@remix-run/node"

export const config = { runtime: "edge" }

export function loader({ request }: LoaderFunctionArgs) {
  return authenticator.authenticate("spotify", request, {
    successRedirect: "/",
    failureRedirect: "/login",
  })
}
