import Nav from "@/layout/Nav"
import UserInfo from "@/layout/UserInfo"
import Welcome from "@/layout/Welcome"
import { User } from "remix-auth-spotify"

export default function PageLayout({
  user,
  children,
}: {
  user?: User | null
  children?: React.ReactNode
}) {
  if (!user) return <Welcome />
  return (
    <main className="container flex flex-1 flex-col items-center gap-4 px-6 py-20">
      <div className="flex w-full flex-col items-center gap-5">
        <div className="flex flex-col items-center gap-2">
          <UserInfo user={user} />
          <Nav />
        </div>
        {children}
      </div>
    </main>
  )
}
