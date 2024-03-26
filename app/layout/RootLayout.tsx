import { Suspense } from "react"
import Nav from "@/layout/Nav"
import UserInfo from "@/layout/UserInfo"
import Welcome from "@/pages/welcome"
import { authClient } from "@/utils/auth.server"
import type { LoaderFunctionArgs } from "@remix-run/node"
import { Await, Outlet, useLoaderData } from "@remix-run/react"
import { defer } from "@vercel/remix"

export async function loader({ request }: LoaderFunctionArgs) {
  const data = authClient.getSession(request)
  return defer({ data })
}

export default function RootLayout() {
  const { data: session } = useLoaderData<typeof loader>()
  if (!session) {
    return <Welcome />
  }
  return (
    <main className="container flex flex-1 flex-col items-center gap-4 px-6 py-20">
      <div className="flex w-full flex-col items-center gap-5">
        <Suspense fallback={null}>
          <Await resolve={session}>
            {(session) =>
              !session?.user ? (
                <Welcome />
              ) : (
                <>
                  <div className="flex flex-col items-center gap-2">
                    <UserInfo user={session.user} />
                    <Nav />
                  </div>
                  <Outlet />
                </>
              )
            }
          </Await>
        </Suspense>
      </div>
    </main>
  )
}
