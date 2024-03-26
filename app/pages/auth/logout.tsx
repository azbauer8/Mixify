import { destroySession, getSession } from "@/utils/session.server"
import type { ActionFunctionArgs } from "@remix-run/node"
import { json, redirect } from "@remix-run/node"

export const config = { runtime: "edge" }

export async function action({ request }: ActionFunctionArgs) {
  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(
        await getSession(request.headers.get("cookie"))
      ),
    },
  })
}

export function loader() {
  throw json({}, { status: 404 })
}
