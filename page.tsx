"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Clock, Heart, MessageSquare, Share2, Star, ThumbsUp, Utensils } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

// Mock recipe data
const recipe = {
  id: "1",
  title: "Creamy Garlic Parmesan Pasta",
  image: "/placeholder.svg?height=600&width=1200",
  prepTime: "30 min",
  cookTime: "15 min",
  totalTime: "45 min",
  servings: 4,
  difficulty: "Easy",
  likes: 245,
  rating: 4.8,
  isVeg: true,
  author: {
    name: "Chef Maria",
    image: "/placeholder.svg?height=100&width=100",
    recipes: 24,
  },
  description:
    "This creamy garlic parmesan pasta is a quick and easy dish that's perfect for busy weeknights. It's rich, flavorful, and absolutely delicious!",
  ingredients: [
    "8 oz fettuccine pasta",
    "2 tablespoons olive oil",
    "4 cloves garlic, minced",
    "1 cup heavy cream",
    "1 cup grated Parmesan cheese",
    "Salt and pepper to taste",
    "Fresh parsley for garnish",
  ],
  instructions: [
    "Bring a large pot of salted water to a boil. Add the pasta and cook according to package instructions until al dente. Drain and set aside.",
    "In a large skillet, heat the olive oil over medium heat. Add the minced garlic and sauté for 1-2 minutes until fragrant.",
    "Pour in the heavy cream and bring to a simmer. Cook for 3-4 minutes until slightly thickened.",
    "Reduce heat to low and gradually whisk in the Parmesan cheese until melted and smooth.",
    "Season with salt and pepper to taste.",
    "Add the cooked pasta to the sauce and toss to coat evenly.",
    "Serve immediately, garnished with fresh parsley and additional Parmesan cheese if desired.",
  ],
  comments: [
    {
      id: "1",
      user: {
        name: "Sarah",
        image: "/placeholder.svg?height=50&width=50",
      },
      text: "Made this last night and it was amazing! I added some grilled chicken and it was perfect.",
      date: "2023-06-10",
      likes: 12,
    },
    {
      id: "2",
      user: {
        name: "Michael",
        image: "/placeholder.svg?height=50&width=50",
      },
      text: "So creamy and delicious! Will definitely make again.",
      date: "2023-06-08",
      likes: 8,
    },
  ],
}

export default function RecipeDetailPage({ params }: { params: { id: string } }) {
  const { user } = useAuth()
  const [isLiked, setIsLiked] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [userRating, setUserRating] = useState(0)

  const toggleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleRating = (rating: number) => {
    setUserRating(rating)
  }

  const submitComment = () => {
    if (!commentText.trim()) return

    // In a real app, you would send this to your API
    console.log("Submitting comment:", commentText)

    // Reset the comment text
    setCommentText("")
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        {/* Recipe Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Link href="/recipes" className="text-muted-foreground hover:text-foreground">
              Recipes
            </Link>
            <span className="text-muted-foreground">/</span>
            <span>{recipe.title}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-3xl font-bold">{recipe.title}</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={toggleLike} className={isLiked ? "text-primary" : ""}>
                <Heart className="h-5 w-5" fill={isLiked ? "currentColor" : "none"} />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <Badge variant={recipe.isVeg ? "default" : "secondary"} className="px-3 py-1">
              {recipe.isVeg ? "Vegetarian" : "Non-Vegetarian"}
            </Badge>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Total Time: {recipe.totalTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Utensils className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Servings: {recipe.servings}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">
                {recipe.rating} ({recipe.likes} ratings)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={recipe.author.image} alt={recipe.author.name} />
              <AvatarFallback>{recipe.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Recipe by {recipe.author.name}</p>
              <p className="text-xs text-muted-foreground">{recipe.author.recipes} recipes</p>
            </div>
          </div>
        </div>

        {/* Recipe Image */}
        <div className="relative aspect-video w-full rounded-xl overflow-hidden">
          <Image src={recipe.image || "/placeholder.svg"} alt={recipe.title} fill className="object-cover" />
        </div>

        {/* Recipe Description */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Description</h2>
          <p className="text-muted-foreground">{recipe.description}</p>
        </div>

        {/* Recipe Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ingredients */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">Ingredients</h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <Utensils className="h-3 w-3 text-primary" />
                  </div>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">Instructions</h2>
            <ol className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <Separator />

        {/* Rating Section */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">Rate this Recipe</h2>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Button
                key={star}
                variant="ghost"
                size="icon"
                onClick={() => handleRating(star)}
                className={star <= userRating ? "text-yellow-500" : "text-muted-foreground"}
              >
                <Star className="h-6 w-6" fill={star <= userRating ? "currentColor" : "none"} />
              </Button>
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              {userRating > 0 ? `You rated this recipe ${userRating} stars` : "Click to rate"}
            </span>
          </div>
        </div>

        <Separator />

        {/* Comments Section */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold">Comments ({recipe.comments.length})</h2>

          {/* Comment Form */}
          {user ? (
            <div className="flex flex-col gap-4">
              <Textarea
                placeholder="Share your experience with this recipe..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex justify-end">
                <Button onClick={submitComment}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Post Comment
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <p className="text-muted-foreground">Please sign in to leave a comment</p>
              <Button asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-6">
            {recipe.comments.map((comment) => (
              <div key={comment.id} className="flex flex-col gap-2 p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={comment.user.image} alt={comment.user.name} />
                    <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{comment.user.name}</p>
                    <p className="text-xs text-muted-foreground">{new Date(comment.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <p className="mt-2">{comment.text}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <ThumbsUp className="mr-1 h-4 w-4" />
                    {comment.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    Reply
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

