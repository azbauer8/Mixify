import PageLayout from "@/layout/PageLayout"
import { authClient } from "@/utils/auth.server"
import spotifyClient from "@/utils/spotify"
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node"
import { json, Link, useLoaderData } from "@remix-run/react"
import { $path } from "remix-routes"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const meta: MetaFunction = () => {
  return [
    { title: "Home | Spoofy" },
    {
      name: "description",
      content: "A dashboard for viewing your Spotify statistics.",
    },
  ]
}

export async function loader({ request }: LoaderFunctionArgs) {
  const data = await authClient.getSession(request)
  if (data && data.user) {
    const spotify = spotifyClient(data.accessToken)
    const {
      body: { items: topArtists },
    } = await spotify.getMyTopArtists({
      limit: 20,
    })
    const {
      body: { items: topTracks },
    } = await spotify.getMyTopTracks({
      limit: 20,
    })
    return json(
      {
        user: data.user,
        topArtists,
        topTracks,
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

export default function Home() {
  const data = useLoaderData<typeof loader>()

  if (!data) return <PageLayout />

  return (
    <PageLayout user={data.user}>
      <div className="flex w-full flex-col items-center gap-4 md:flex-row">
        <TopList list={{ type: "Artists", items: data.topArtists }} />
        <TopList list={{ type: "Tracks", items: data.topTracks }} />
      </div>
    </PageLayout>
  )
}

function TopList({
  list,
}: {
  list:
    | { type: "Tracks"; items: SpotifyApi.TrackObjectFull[] }
    | { type: "Artists"; items: SpotifyApi.ArtistObjectFull[] }
}) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="grid gap-2">
          <CardTitle>Top {list.type}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {list.items.map((item) => (
          <a
            key={item.id}
            href={item.external_urls.spotify}
            className="flex items-center gap-2 rounded-lg p-3 hover:bg-accent"
          >
            <Avatar>
              <AvatarImage
                src={
                  list.type === "Tracks"
                    ? (item as SpotifyApi.TrackObjectFull).album.images[2].url
                    : (item as SpotifyApi.ArtistObjectFull).images[2].url
                }
              />
              <AvatarFallback>{item.name[0]}</AvatarFallback>
            </Avatar>
            <h2>{item.name}</h2>
          </a>
        ))}
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link
            to={list.type === "Tracks" ? $path("/tracks") : $path("/artists")}
            prefetch="intent"
          >
            More
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
