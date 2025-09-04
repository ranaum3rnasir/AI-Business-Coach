"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { processEvaluationSchema, type ProcessEvaluationData } from "@/lib/audit-schemas"

interface ProcessEvaluationStepProps {
  data: Partial<ProcessEvaluationData>
  onNext: (data: ProcessEvaluationData) => void
  onBack: () => void
}

export function ProcessEvaluationStep({ data, onNext, onBack }: ProcessEvaluationStepProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProcessEvaluationData>({
    resolver: zodResolver(processEvaluationSchema),
    defaultValues: {
      processEfficiency: 5,
      documentationQuality: 5,
      controlEffectiveness: 5,
      resourceAdequacy: 5,
      ...data,
    },
  })

  const watchedValues = watch()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Process Evaluation</CardTitle>
        <CardDescription>Rate various aspects of the processes being audited (1-10 scale)</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onNext)} className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-base font-medium">Process Efficiency</Label>
                <span className="text-sm text-muted-foreground">{watchedValues.processEfficiency}/10</span>
              </div>
              <Slider
                value={[watchedValues.processEfficiency || 5]}
                onValueChange={(value) => setValue("processEfficiency", value[0])}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">How efficiently are the current processes operating?</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-base font-medium">Documentation Quality</Label>
                <span className="text-sm text-muted-foreground">{watchedValues.documentationQuality}/10</span>
              </div>
              <Slider
                value={[watchedValues.documentationQuality || 5]}
                onValueChange={(value) => setValue("documentationQuality", value[0])}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">Quality and completeness of process documentation</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-base font-medium">Control Effectiveness</Label>
                <span className="text-sm text-muted-foreground">{watchedValues.controlEffectiveness}/10</span>
              </div>
              <Slider
                value={[watchedValues.controlEffectiveness || 5]}
                onValueChange={(value) => setValue("controlEffectiveness", value[0])}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">Effectiveness of existing controls and safeguards</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-base font-medium">Resource Adequacy</Label>
                <span className="text-sm text-muted-foreground">{watchedValues.resourceAdequacy}/10</span>
              </div>
              <Slider
                value={[watchedValues.resourceAdequacy || 5]}
                onValueChange={(value) => setValue("resourceAdequacy", value[0])}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">Adequacy of resources allocated to these processes</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="processImprovements">Process Improvements *</Label>
            <Textarea
              id="processImprovements"
              placeholder="Describe recommended process improvements..."
              rows={4}
              {...register("processImprovements")}
            />
            {errors.processImprovements && (
              <p className="text-sm text-destructive">{errors.processImprovements.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="keyFindings">Key Findings *</Label>
            <Textarea
              id="keyFindings"
              placeholder="Summarize key findings from the process evaluation..."
              rows={4}
              {...register("keyFindings")}
            />
            {errors.keyFindings && <p className="text-sm text-destructive">{errors.keyFindings.message}</p>}
          </div>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button type="submit">Next</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
