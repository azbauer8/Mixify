import Nav from "@/layout/Nav"
import { Form } from "@remix-run/react"
import { User } from "remix-auth-spotify"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function UserInfo({ user }: { user: User }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Avatar className="size-28">
        <AvatarImage src={user.image ?? undefined} />
        <AvatarFallback>{user.name?.[0]}</AvatarFallback>
      </Avatar>
      <a
        href={`https://open.spotify.com/user/${user.id}`}
        target="_blank"
        rel="noreferrer"
        className="text-3xl font-bold text-primary hover:underline"
      >
        {user.name}
      </a>
      <Form action="/logout" method="post" reloadDocument>
        <Button type="submit" variant="outline">
          Sign out
        </Button>
      </Form>
      <Nav />
    </div>
  )
}
