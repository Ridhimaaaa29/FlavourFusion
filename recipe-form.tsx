"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Mic, MicOff, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"

// Declare SpeechRecognition, SpeechRecognitionEvent, and SpeechRecognitionErrorEvent
declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
  interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList
  }
  interface SpeechRecognitionErrorEvent extends Event {
    error: string
  }
}

export function RecipeForm() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [isRecording, setIsRecording] = useState(false)
  const [recordingFor, setRecordingFor] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    prepTime: "30",
    isVeg: "veg",
    image: null,
  })

  // Web Speech API setup
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)

  useEffect(() => {
    if ((typeof window !== "undefined" && "SpeechRecognition" in window) || "webkitSpeechRecognition" in window) {
      // @ts-ignore - TypeScript doesn't know about webkitSpeechRecognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognitionInstance = new SpeechRecognition()
      recognitionInstance.continuous = true
      recognitionInstance.interimResults = true
      recognitionInstance.lang = "en-US"

      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("")

        if (recordingFor && event.results[0].isFinal) {
          setFormData((prev) => ({
            ...prev,
            [recordingFor]: prev[recordingFor as keyof typeof prev] + " " + transcript,
          }))
        }
      }

      recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Speech recognition error", event.error)
        stopRecording()
        toast({
          title: "Voice Recognition Error",
          description: `Error: ${event.error}. Please try again.`,
          variant: "destructive",
        })
      }

      setRecognition(recognitionInstance)
    }

    return () => {
      if (recognition) {
        recognition.stop()
      }
    }
  }, [recordingFor, toast])

  const startRecording = (field: string) => {
    if (!recognition) {
      toast({
        title: "Voice Recognition Not Supported",
        description: "Your browser doesn't support voice recognition. Please try a different browser.",
        variant: "destructive",
      })
      return
    }

    setIsRecording(true)
    setRecordingFor(field)
    recognition.start()

    toast({
      title: "Voice Recording Started",
      description: `Speak now to add content to the ${field} field.`,
    })
  }

  const stopRecording = () => {
    if (recognition) {
      recognition.stop()
    }
    setIsRecording(false)
    setRecordingFor(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files?.[0] || null }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to create a recipe.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    // Here you would typically send the data to your API
    console.log("Submitting recipe:", formData)

    toast({
      title: "Recipe Created",
      description: "Your recipe has been successfully created!",
    })

    // Redirect to the recipes page
    router.push("/recipes")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Recipe Details</CardTitle>
          <CardDescription>
            Fill in the details of your recipe. Use the microphone button to dictate instead of typing.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Recipe Title</Label>
            <div className="flex gap-2">
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter recipe title"
                required
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => (isRecording && recordingFor === "title" ? stopRecording() : startRecording("title"))}
                className={isRecording && recordingFor === "title" ? "bg-red-100 dark:bg-red-900" : ""}
              >
                {isRecording && recordingFor === "title" ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <div className="flex gap-2">
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your recipe"
                required
                className="flex-1 min-h-[100px]"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() =>
                  isRecording && recordingFor === "description" ? stopRecording() : startRecording("description")
                }
                className={isRecording && recordingFor === "description" ? "bg-red-100 dark:bg-red-900" : ""}
              >
                {isRecording && recordingFor === "description" ? (
                  <MicOff className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ingredients">Ingredients</Label>
            <div className="flex gap-2">
              <Textarea
                id="ingredients"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                placeholder="List your ingredients (one per line)"
                required
                className="flex-1 min-h-[150px]"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() =>
                  isRecording && recordingFor === "ingredients" ? stopRecording() : startRecording("ingredients")
                }
                className={isRecording && recordingFor === "ingredients" ? "bg-red-100 dark:bg-red-900" : ""}
              >
                {isRecording && recordingFor === "ingredients" ? (
                  <MicOff className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions">Instructions</Label>
            <div className="flex gap-2">
              <Textarea
                id="instructions"
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                placeholder="Step-by-step instructions"
                required
                className="flex-1 min-h-[200px]"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() =>
                  isRecording && recordingFor === "instructions" ? stopRecording() : startRecording("instructions")
                }
                className={isRecording && recordingFor === "instructions" ? "bg-red-100 dark:bg-red-900" : ""}
              >
                {isRecording && recordingFor === "instructions" ? (
                  <MicOff className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="prepTime">Preparation Time</Label>
              <Select value={formData.prepTime} onValueChange={(value) => handleSelectChange("prepTime", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2+ hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="isVeg">Dietary Type</Label>
              <Select value={formData.isVeg} onValueChange={(value) => handleSelectChange("isVeg", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="veg">Vegetarian</SelectItem>
                  <SelectItem value="non-veg">Non-Vegetarian</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Recipe Image</Label>
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => document.getElementById("image")?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Image
              </Button>
              <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              {formData.image && (
                <span className="text-sm text-muted-foreground">
                  {typeof formData.image === "object" ? formData.image.name : "Image selected"}
                </span>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit">Create Recipe</Button>
        </CardFooter>
      </Card>
    </form>
  )
}

