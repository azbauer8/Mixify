import spotifyClient from "@/utils/spotify"
import type { MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { json, type LoaderFunctionArgs } from "@vercel/remix"

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
  const spotify = await spotifyClient(request)
  const {
    body: { items: recentTracks },
  } = await spotify.getMyRecentlyPlayedTracks({
    limit: 50,
  })
  return json(
    {
      recentTracks: recentTracks,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600",
      },
    }
  )
}

export default function Recent() {
  const { recentTracks } = useLoaderData<typeof loader>()

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="grid gap-2">
          <CardTitle>Recent Tracks</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {recentTracks.map((item) => (
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
  )
}
