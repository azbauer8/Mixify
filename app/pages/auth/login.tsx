import { authenticator } from "@/utils/auth.server"
import type { ActionFunctionArgs } from "@remix-run/node"
import { redirect } from "@remix-run/node"

export const config = { runtime: "edge" }

export function loader() {
  return redirect("/login")
}

export async function action({ request }: ActionFunctionArgs) {
  return await authenticator.authenticate("spotify", request)
}
