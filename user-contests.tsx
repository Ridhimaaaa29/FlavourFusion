import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, Trophy } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data for user contests
const userContests = [
  {
    id: "1",
    title: "Summer Delights",
    image: "/placeholder.svg?height=300&width=400",
    sponsor: "Fresh Farms",
    endDate: "2023-08-15",
    status: "active",
    entries: 1,
  },
  {
    id: "2",
    title: "Healthy Breakfast Challenge",
    image: "/placeholder.svg?height=300&width=400",
    sponsor: "Nutrition Plus",
    endDate: "2023-07-30",
    status: "completed",
    entries: 2,
    winner: true,
  },
]

export function UserContests() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Your Contest Entries</h2>
        <Button asChild>
          <Link href="/contests">View All Contests</Link>
        </Button>
      </div>

      {userContests.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {userContests.map((contest) => (
            <Card key={contest.id}>
              <div className="relative aspect-video overflow-hidden">
                <Image src={contest.image || "/placeholder.svg"} alt={contest.title} fill className="object-cover" />
                {contest.winner && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="flex flex-col items-center text-white">
                      <Trophy className="h-12 w-12 text-yellow-400" />
                      <span className="mt-2 text-lg font-bold">Winner!</span>
                    </div>
                  </div>
                )}
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{contest.title}</CardTitle>
                  <Badge variant={contest.status === "active" ? "default" : "secondary"}>
                    {contest.status === "active" ? "Active" : "Completed"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-muted-foreground">
                    Sponsored by <span className="font-medium">{contest.sponsor}</span>
                  </p>
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {contest.status === "active"
                        ? `Ends on ${new Date(contest.endDate).toLocaleDateString()}`
                        : `Ended on ${new Date(contest.endDate).toLocaleDateString()}`}
                    </span>
                  </div>
                  <p className="text-sm">
                    Your entries: <span className="font-medium">{contest.entries}</span>
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/contests/${contest.id}`}>
                    {contest.status === "active" ? "Submit Another Entry" : "View Results"}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <h3 className="mt-4 text-lg font-semibold">No contest entries yet</h3>
          <p className="mb-4 mt-2 text-sm text-muted-foreground">
            You haven't participated in any contests yet. Join a contest to showcase your recipes!
          </p>
          <Button asChild>
            <Link href="/contests">Browse Contests</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

