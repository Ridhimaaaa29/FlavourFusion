import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Trophy } from "lucide-react"

export function ContestBanner() {
  return (
    <section className="py-16 bg-accent/10">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 rounded-2xl bg-accent/20 border border-accent/30">
          <div className="flex-1">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Join Our Monthly Recipe Contest</h2>
            <p className="text-muted-foreground max-w-xl">
              This month's theme: <span className="font-semibold text-accent">Summer Delights</span> - Share your best
              summer recipes and win amazing prizes from our sponsors!
            </p>
            <Button asChild className="mt-6 bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/contests">
                <Trophy className="mr-2 h-5 w-5" />
                Enter Contest
              </Link>
            </Button>
          </div>
          <div className="flex-shrink-0 w-full max-w-xs">
            <div className="aspect-square relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full bg-accent/30 flex items-center justify-center">
                  <div className="w-36 h-36 rounded-full bg-accent/50 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center">
                      <Trophy className="h-12 w-12 text-accent-foreground" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

