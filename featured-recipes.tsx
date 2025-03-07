import Link from "next/link"
import Image from "next/image"
import { Clock, Heart, Star } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data for featured recipes
const featuredRecipes = [
  {
    id: "1",
    title: "Creamy Garlic Parmesan Pasta",
    image: "/placeholder.svg?height=300&width=400",
    prepTime: "30 min",
    likes: 245,
    rating: 4.8,
    isVeg: true,
    author: "Chef Maria",
  },
  {
    id: "2",
    title: "Spicy Chicken Tacos",
    image: "/placeholder.svg?height=300&width=400",
    prepTime: "45 min",
    likes: 189,
    rating: 4.6,
    isVeg: false,
    author: "Chef John",
  },
  {
    id: "3",
    title: "Chocolate Lava Cake",
    image: "/placeholder.svg?height=300&width=400",
    prepTime: "60 min",
    likes: 312,
    rating: 4.9,
    isVeg: true,
    author: "Chef Emily",
  },
]

export function FeaturedRecipes() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {featuredRecipes.map((recipe) => (
        <Link key={recipe.id} href={`/recipes/${recipe.id}`}>
          <Card className="overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 duration-300">
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={recipe.image || "/placeholder.svg"}
                alt={recipe.title}
                fill
                className="object-cover transition-transform hover:scale-105 duration-300"
              />
              <div className="absolute right-2 top-2">
                <Badge variant={recipe.isVeg ? "default" : "secondary"} className="font-semibold">
                  {recipe.isVeg ? "Veg" : "Non-Veg"}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="line-clamp-1 text-xl font-semibold">{recipe.title}</h3>
              <p className="text-sm text-muted-foreground">by {recipe.author}</p>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4">
              <div className="flex items-center gap-1 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{recipe.prepTime}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-sm">
                  <Heart className="h-4 w-4 text-primary" />
                  <span>{recipe.likes}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>{recipe.rating}</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}

