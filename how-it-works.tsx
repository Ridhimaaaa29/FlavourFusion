import { Mic, Edit, Share } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: Mic,
      title: "Speak Your Recipe",
      description: "Use our voice-to-text feature to dictate your recipe ingredients and steps.",
      color: "primary",
    },
    {
      icon: Edit,
      title: "Review and Edit",
      description: "Make any necessary adjustments to your recipe before publishing.",
      color: "secondary",
    },
    {
      icon: Share,
      title: "Share with the World",
      description: "Publish your recipe and share it with the FlavorFusion community.",
      color: "accent",
    },
  ]

  return (
    <div className="grid gap-8 md:grid-cols-3">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center text-center">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-full bg-${step.color} text-${step.color}-foreground`}
          >
            <step.icon className="h-8 w-8" />
          </div>
          <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
          <p className="mt-2 text-muted-foreground">{step.description}</p>
        </div>
      ))}
    </div>
  )
}

