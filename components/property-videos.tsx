import Link from "next/link"
import { ExternalLink } from "lucide-react"
import type { Property } from "@/content/properties"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

function youtubeEmbed(url: string) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^?&/]+)/)
  return match ? `https://www.youtube-nocookie.com/embed/${match[1]}` : null
}

export function PropertyVideos({ videos }: { videos: Property["videos"] }) {
  if (!videos.length) return null
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-20">
      <div className="mb-10 text-center">
        <h2 className="text-xl font-semibold sm:text-2xl bg-linear-to-b from-foreground to-muted-foreground text-transparent bg-clip-text">Videos</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {videos.map((video) => {
          const embed = video.provider === "youtube" ? youtubeEmbed(video.url) : null
          return (
            <Card key={video.url} className="overflow-hidden rounded-2xl">
              <CardContent className="space-y-4 p-4 sm:p-6">
                <AspectRatio ratio={16 / 9}>
                  {video.provider === "local" ? (
                    <video className="h-full w-full rounded-xl bg-card" controls preload="metadata" poster={video.poster} aria-label={video.title}>
                      <source src={video.url} />
                    </video>
                  ) : embed ? (
                    <iframe className="h-full w-full rounded-xl border border-border" src={embed} title={video.title} loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                  ) : (
                    <div className="flex h-full items-center justify-center rounded-xl border border-border bg-card"><Button asChild><Link href={video.url} target="_blank" rel="noopener noreferrer">Abrir video <ExternalLink /></Link></Button></div>
                  )}
                </AspectRatio>
                <h3 className="font-semibold">{video.title}</h3>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
