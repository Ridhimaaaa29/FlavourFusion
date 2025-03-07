import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, Users } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data for contests
const contests = [
  {
    id: "1",
    title: "Summer Delights",
    description:
      "Create refreshing recipes perfect for hot summer days. Think cool drinks, light salads, and fruity desserts.",
    image: "/placeholder.svg?height=300&width=400",
    sponsor: "Fresh Farms",
    sponsorLogo: "/placeholder.svg?height=50&width=100",
    endDate: "2023-08-15",
    participants: 124,
    prize: "Kitchen Appliance Set worth $500",
  },
  {
    id: "2",
    title: "Healthy Breakfast Challenge",
    description: "Design nutritious and delicious breakfast recipes that are quick to prepare and packed with energy.",
    image: "/placeholder.svg?height=300&width=400",
    sponsor: "Nutrition Plus",
    sponsorLogo: "/placeholder.svg?height=50&width=100",
    endDate: "2023-07-30",
    participants: 98,
    prize: "Premium Cookware Set worth $300",
  },
  {
    id: "3",
    title: "Festive Baking Showdown",
    description:
      "Share your most impressive baking recipes for the holiday season. Cakes, cookies, pies - show us your best!",
    image: "/placeholder.svg?height=300&width=400",
    sponsor: "Bake Master",
    sponsorLogo: "/placeholder.svg?height=50&width=100",
    endDate: "2023-12-15",
    participants: 156,
    prize: "Professional Baking Equipment worth $400",
  },
]

export function ContestList() {
  return (
    <div className="grid grid-cols-1 gap-8">
      {contests.map((contest) => (
        <Card key={contest.id} className="overflow-hidden">
          <div className="grid md:grid-cols-3">
            <div className="relative aspect-video md:aspect-square md:h-full">
              <Image src={contest.image || "/placeholder.svg"} alt={contest.title} fill className="object-cover" />
              <div className="absolute left-4 top-4">
                <Badge className="text-sm">Sponsored</Badge>
              </div>
            </div>
            <div className="col-span-2 flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{contest.title}</CardTitle>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Sponsored by</span>
                      <div className="relative h-6 w-16">
                        <Image
                          src={contest.sponsorLogo || "/placeholder.svg"}
                          alt={contest.sponsor}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="mb-4">{contest.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">End Date</p>
                      <p className="text-sm text-muted-foreground">{new Date(contest.endDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Participants</p>
                      <p className="text-sm text-muted-foreground">{contest.participants}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium">Prize</p>
                  <p className="text-sm text-muted-foreground">{contest.prize}</p>
                </div>
              </CardContent>
              <CardFooter className="border-t">
                <Button asChild className="w-full">
                  <Link href={`/contests/${contest.id}`}>Enter Contest</Link>
                </Button>
              </CardFooter>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

