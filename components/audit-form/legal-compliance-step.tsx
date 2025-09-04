"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { legalComplianceSchema, type LegalComplianceData } from "@/lib/audit-schemas"

interface LegalComplianceStepProps {
  data: Partial<LegalComplianceData>
  onNext: (data: LegalComplianceData) => void
  onBack: () => void
}

const legalRequirementOptions = [
  "GDPR Compliance",
  "SOX Compliance",
  "HIPAA Compliance",
  "PCI DSS",
  "ISO 27001",
  "Local Regulations",
  "Industry Standards",
  "Other",
]

export function LegalComplianceStep({ data, onNext, onBack }: LegalComplianceStepProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LegalComplianceData>({
    resolver: zodResolver(legalComplianceSchema),
    defaultValues: {
      legalRequirements: [],
      ...data,
    },
  })

  const watchedValues = watch()
  const selectedRequirements = watchedValues.legalRequirements || []

  const handleRequirementChange = (requirement: string, checked: boolean) => {
    const current = selectedRequirements
    if (checked) {
      setValue("legalRequirements", [...current, requirement])
    } else {
      setValue(
        "legalRequirements",
        current.filter((r) => r !== requirement),
      )
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Legal & Compliance</CardTitle>
        <CardDescription>Assess legal and regulatory compliance requirements</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onNext)} className="space-y-8">
          <div className="space-y-4">
            <Label className="text-base font-medium">Regulatory Compliance Status *</Label>
            <RadioGroup
              value={watchedValues.regulatoryCompliance}
              onValueChange={(value) => setValue("regulatoryCompliance", value as any)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="full" id="reg-full" />
                <Label htmlFor="reg-full">Full Compliance - All regulations met</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="partial" id="reg-partial" />
                <Label htmlFor="reg-partial">Partial Compliance - Some gaps exist</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="non-compliant" id="reg-none" />
                <Label htmlFor="reg-none">Non-Compliant - Significant violations</Label>
              </div>
            </RadioGroup>
            {errors.regulatoryCompliance && (
              <p className="text-sm text-destructive">{errors.regulatoryCompliance.message}</p>
            )}
          </div>

          <div className="space-y-4">
            <Label className="text-base font-medium">Applicable Legal Requirements *</Label>
            <div className="grid gap-3 md:grid-cols-2">
              {legalRequirementOptions.map((requirement) => (
                <div key={requirement} className="flex items-center space-x-2">
                  <Checkbox
                    id={requirement}
                    checked={selectedRequirements.includes(requirement)}
                    onCheckedChange={(checked) => handleRequirementChange(requirement, checked as boolean)}
                  />
                  <Label htmlFor={requirement} className="text-sm">
                    {requirement}
                  </Label>
                </div>
              ))}
            </div>
            {errors.legalRequirements && <p className="text-sm text-destructive">{errors.legalRequirements.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="complianceGaps">Compliance Gaps</Label>
            <Textarea
              id="complianceGaps"
              placeholder="Describe any identified compliance gaps..."
              rows={3}
              {...register("complianceGaps")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="remedialActions">Remedial Actions Required *</Label>
            <Textarea
              id="remedialActions"
              placeholder="Describe actions needed to address compliance issues..."
              rows={4}
              {...register("remedialActions")}
            />
            {errors.remedialActions && <p className="text-sm text-destructive">{errors.remedialActions.message}</p>}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="complianceDeadline">Compliance Deadline *</Label>
              <Input id="complianceDeadline" type="date" {...register("complianceDeadline")} />
              {errors.complianceDeadline && (
                <p className="text-sm text-destructive">{errors.complianceDeadline.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsibleParty">Responsible Party *</Label>
              <Input
                id="responsibleParty"
                placeholder="Name of responsible person/department"
                {...register("responsibleParty")}
              />
              {errors.responsibleParty && <p className="text-sm text-destructive">{errors.responsibleParty.message}</p>}
            </div>
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
