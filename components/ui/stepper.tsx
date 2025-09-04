"use client"

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface Step {
  id: string
  title: string
  description?: string
}

interface StepperProps {
  steps: Step[]
  currentStep: number
  className?: string
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <nav className={cn("flex items-center justify-center", className)}>
      <ol className="flex items-center space-x-2 md:space-x-4">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep

          return (
            <li key={step.id} className="flex items-center">
              <div className="flex items-center">
                <div
                  className={cn("flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium", {
                    "border-primary bg-primary text-primary-foreground": isCompleted,
                    "border-primary bg-background text-primary": isCurrent,
                    "border-muted-foreground bg-background text-muted-foreground": !isCompleted && !isCurrent,
                  })}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : stepNumber}
                </div>
                <div className="ml-2 hidden md:block">
                  <div
                    className={cn("text-sm font-medium", {
                      "text-primary": isCompleted || isCurrent,
                      "text-muted-foreground": !isCompleted && !isCurrent,
                    })}
                  >
                    {step.title}
                  </div>
                  {step.description && <div className="text-xs text-muted-foreground">{step.description}</div>}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn("ml-2 h-0.5 w-8 md:w-12", {
                    "bg-primary": stepNumber < currentStep,
                    "bg-muted": stepNumber >= currentStep,
                  })}
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
