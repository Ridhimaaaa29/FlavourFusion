import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Clock, Heart, MoreHorizontal, Plus, Star } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for user recipes
const userRecipes = [
  {
    id: "1",
    title: "Homemade Pizza with Fresh Basil",
    image: "/placeholder.svg?height=300&width=400",
    prepTime: "60 min",
    likes: 124,
    rating: 4.7,
    isVeg: true,
  },
  {
    id: "2",
    title: "Lemon Garlic Butter Shrimp Pasta",
    image: "/placeholder.svg?height=300&width=400",
    prepTime: "30 min",
    likes: 87,
    rating: 4.5,
    isVeg: false,
  },
  {
    id: "3",
    title: "Chocolate Chip Cookies",
    image: "/placeholder.svg?height=300&width=400",
    prepTime: "45 min",
    likes: 156,
    rating: 4.9,
    isVeg: true,
  },
]

export function UserRecipes() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Your Recipes</h2>
        <Button asChild>
          <Link href="/recipes/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New Recipe
          </Link>
        </Button>
      </div>

      {userRecipes.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {userRecipes.map((recipe) => (
            <Card key={recipe.id} className="overflow-hidden">
              <div className="relative aspect-video overflow-hidden">
                <Image src={recipe.image || "/placeholder.svg"} alt={recipe.title} fill className="object-cover" />
                <div className="absolute right-2 top-2">
                  <Badge variant={recipe.isVeg ? "default" : "secondary"}>{recipe.isVeg ? "Veg" : "Non-Veg"}</Badge>
                </div>
                <div className="absolute right-2 bottom-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/recipes/${recipe.id}`}>View</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/recipes/${recipe.id}/edit`}>Edit</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="line-clamp-1 text-xl font-semibold">{recipe.title}</h3>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-4">
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>{recipe.prepTime}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-sm">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>{recipe.likes}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{recipe.rating}</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <h3 className="mt-4 text-lg font-semibold">No recipes yet</h3>
          <p className="mb-4 mt-2 text-sm text-muted-foreground">
            You haven't created any recipes yet. Start sharing your culinary creations!
          </p>
          <Button asChild>
            <Link href="/recipes/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Recipe
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}

