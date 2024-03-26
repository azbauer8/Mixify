import Nav from "@/layout/Nav"
import UserInfo from "@/layout/UserInfo"
import Welcome from "@/layout/Welcome"
import { authClient } from "@/utils/auth.server"
import type { LoaderFunctionArgs } from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"
import { json } from "@vercel/remix"

export async function loader({ request }: LoaderFunctionArgs) {
  const data = await authClient.getSession(request)
  return json(data?.user ?? null)
}

export default function RootLayout() {
  const user = useLoaderData<typeof loader>()
  if (!user) return <Welcome />
  return (
    <main className="container flex flex-1 flex-col items-center gap-4 px-6 py-20">
      <div className="flex w-full flex-col items-center gap-5">
        <div className="flex flex-col items-center gap-2">
          <UserInfo user={user} />

          <Nav />
        </div>
        <Outlet />
      </div>
    </main>
  )
}
