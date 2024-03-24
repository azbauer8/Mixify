import PageLayout from "@/layout/PageLayout"
import { authClient } from "@/utils/auth.server"
import spotifyClient from "@/utils/spotify"
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node"
import { json, useLoaderData } from "@remix-run/react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const meta: MetaFunction = () => {
  return [
    { title: "Recent | Spoofy" },
    {
      name: "description",
      content: "A dashboard for viewing your Spotify statistics.",
    },
  ]
}
export async function loader({ request }: LoaderFunctionArgs) {
  const data = await authClient.getSession(request)
  console.log("fetching data")
  if (data && data.user) {
    const spotify = spotifyClient(data.accessToken)
    const {
      body: { items: recentTracks },
    } = await spotify.getMyRecentlyPlayedTracks({
      limit: 50,
    })
    return json(
      {
        user: data.user,
        recentTracks: recentTracks,
      },
      {
        headers: {
          "Cache-Control": "public, max-age=3600",
        },
      }
    )
  }
  return null
}

export default function Recent() {
  const data = useLoaderData<typeof loader>()

  if (!data) return <PageLayout />

  return (
    <PageLayout user={data.user}>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="grid gap-2">
            <CardTitle>Recent Tracks</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {data.recentTracks?.map((item) => (
            <a
              key={item.track.id}
              href={item.track.external_urls.spotify}
              className="flex items-center gap-2 rounded-lg p-3  hover:bg-accent"
            >
              <Avatar>
                <AvatarImage src={item.track.album.images[2].url} />
                <AvatarFallback>{item.track.name[0]}</AvatarFallback>
              </Avatar>
              <h2>{item.track.name}</h2>
            </a>
          ))}
        </CardContent>
      </Card>
    </PageLayout>
  )
}
