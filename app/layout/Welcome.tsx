import { useState } from "react"
import { cn } from "@/utils/general"
import { Form } from "@remix-run/react"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Welcome() {
  const [isLoading, setLoading] = useState(false)
  return (
    <div>
      <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
          Spoofy
        </h1>
        <p className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl">
          A dashboard for viewing your Spotify statistics.
        </p>
        <div className="py-4">
          <Form action="/login" method="post" reloadDocument>
            <Button
              type="submit"
              className={cn(
                "font-bold",
                isLoading && "pointer-events-none opacity-50"
              )}
              size="lg"
              onClick={() => setLoading(true)}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </Form>
        </div>
      </section>
    </div>
  )
}
