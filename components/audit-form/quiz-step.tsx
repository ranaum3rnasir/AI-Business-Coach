"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { quizSchema, type QuizData } from "@/lib/audit-schemas"

interface QuizStepProps {
  data: Partial<QuizData>
  onNext: (data: QuizData) => void
  onBack: () => void
}

export function QuizStep({ data, onNext, onBack }: QuizStepProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<QuizData>({
    resolver: zodResolver(quizSchema),
    defaultValues: data,
  })

  const watchedValues = watch()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assessment Quiz</CardTitle>
        <CardDescription>Answer these questions to help assess the audit scope and risk level</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onNext)} className="space-y-8">
          <div className="space-y-4">
            <Label className="text-base font-medium">Risk Assessment Level *</Label>
            <RadioGroup
              value={watchedValues.riskAssessment}
              onValueChange={(value) => setValue("riskAssessment", value as any)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="risk-low" />
                <Label htmlFor="risk-low">Low Risk - Routine audit with minimal concerns</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="risk-medium" />
                <Label htmlFor="risk-medium">Medium Risk - Some areas require attention</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="risk-high" />
                <Label htmlFor="risk-high">High Risk - Significant concerns identified</Label>
              </div>
            </RadioGroup>
            {errors.riskAssessment && <p className="text-sm text-destructive">{errors.riskAssessment.message}</p>}
          </div>

          <div className="space-y-4">
            <Label className="text-base font-medium">Current Compliance Status *</Label>
            <RadioGroup
              value={watchedValues.complianceStatus}
              onValueChange={(value) => setValue("complianceStatus", value as any)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="compliant" id="compliance-full" />
                <Label htmlFor="compliance-full">Fully Compliant - All requirements met</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="partial" id="compliance-partial" />
                <Label htmlFor="compliance-partial">Partially Compliant - Some gaps exist</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="non-compliant" id="compliance-none" />
                <Label htmlFor="compliance-none">Non-Compliant - Major gaps identified</Label>
              </div>
            </RadioGroup>
            {errors.complianceStatus && <p className="text-sm text-destructive">{errors.complianceStatus.message}</p>}
          </div>

          <div className="space-y-4">
            <Label className="text-base font-medium">Previous Audit Issues *</Label>
            <RadioGroup
              value={watchedValues.previousAuditIssues}
              onValueChange={(value) => setValue("previousAuditIssues", value as any)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="issues-yes" />
                <Label htmlFor="issues-yes">Yes - Previous audits identified issues</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="issues-no" />
                <Label htmlFor="issues-no">No - No significant issues in previous audits</Label>
              </div>
            </RadioGroup>
            {errors.previousAuditIssues && (
              <p className="text-sm text-destructive">{errors.previousAuditIssues.message}</p>
            )}
          </div>

          <div className="space-y-4">
            <Label className="text-base font-medium">Stakeholder Involvement Level *</Label>
            <RadioGroup
              value={watchedValues.stakeholderInvolvement}
              onValueChange={(value) => setValue("stakeholderInvolvement", value as any)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="minimal" id="stakeholder-minimal" />
                <Label htmlFor="stakeholder-minimal">Minimal - Limited stakeholder engagement</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="moderate" id="stakeholder-moderate" />
                <Label htmlFor="stakeholder-moderate">Moderate - Regular stakeholder updates</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="extensive" id="stakeholder-extensive" />
                <Label htmlFor="stakeholder-extensive">Extensive - High stakeholder involvement</Label>
              </div>
            </RadioGroup>
            {errors.stakeholderInvolvement && (
              <p className="text-sm text-destructive">{errors.stakeholderInvolvement.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalNotes">Additional Notes</Label>
            <Textarea
              id="additionalNotes"
              placeholder="Any additional context or concerns..."
              rows={4}
              {...register("additionalNotes")}
            />
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
