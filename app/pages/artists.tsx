import PageLayout from "@/layout/PageLayout"
import { authClient } from "@/utils/auth.server"
import spotifyClient from "@/utils/spotify"
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node"
import { json, useLoaderData, useSearchParams } from "@remix-run/react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const meta: MetaFunction = () => {
  return [
    { title: "Artists | Spoofy" },
    {
      name: "description",
      content: "A dashboard for viewing your Spotify statistics.",
    },
  ]
}
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const range = (url.searchParams.get("range") ?? "long_term") as
    | "long_term"
    | "medium_term"
    | "short_term"
  const data = await authClient.getSession(request)
  if (data && data.user) {
    const spotify = spotifyClient(data.accessToken)
    const {
      body: { items: topArtists },
    } = await spotify.getMyTopArtists({
      time_range: range,
      limit: 50,
    })
    return json(
      {
        user: data.user,
        topArtists: topArtists,
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

export default function Artists() {
  const data = useLoaderData<typeof loader>()
  const [, setSearchParams] = useSearchParams({
    range: "long_term",
  })

  if (!data) return <PageLayout />

  return (
    <PageLayout user={data.user}>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="grid gap-2">
            <CardTitle>Top Artists</CardTitle>
          </div>
          <Select
            defaultValue="long_term"
            onValueChange={(value) => setSearchParams({ range: value })}
          >
            <SelectTrigger className="w-[125px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="long_term">All Time</SelectItem>
              <SelectItem value="medium_term">Last 6 Months</SelectItem>
              <SelectItem value="short_term">Last 4 Weeks</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          {data.topArtists?.map((item) => (
            <a
              key={item.id}
              href={item.external_urls.spotify}
              className="flex items-center gap-2 rounded-lg p-3  hover:bg-accent"
            >
              <Avatar>
                <AvatarImage src={item.images[2].url} />
                <AvatarFallback>{item.name[0]}</AvatarFallback>
              </Avatar>
              <h2>{item.name}</h2>
            </a>
          ))}
        </CardContent>
      </Card>
    </PageLayout>
  )
}
