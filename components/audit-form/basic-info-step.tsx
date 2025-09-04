"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { basicInfoSchema, type BasicInfoData } from "@/lib/audit-schemas"

interface BasicInfoStepProps {
  data: Partial<BasicInfoData>
  onNext: (data: BasicInfoData) => void
  onBack?: () => void
}

export function BasicInfoStep({ data, onNext, onBack }: BasicInfoStepProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BasicInfoData>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: data,
  })

  const auditType = watch("auditType")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>Enter the fundamental details about this audit</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onNext)} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="auditName">Audit Name *</Label>
              <Input id="auditName" placeholder="Q4 Financial Audit" {...register("auditName")} />
              {errors.auditName && <p className="text-sm text-destructive">{errors.auditName.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input id="company" placeholder="Company Name" {...register("company")} />
              {errors.company && <p className="text-sm text-destructive">{errors.company.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="auditDate">Audit Date *</Label>
              <Input id="auditDate" type="date" {...register("auditDate")} />
              {errors.auditDate && <p className="text-sm text-destructive">{errors.auditDate.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="auditor">Auditor *</Label>
              <Input id="auditor" placeholder="Auditor Name" {...register("auditor")} />
              {errors.auditor && <p className="text-sm text-destructive">{errors.auditor.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department *</Label>
              <Input id="department" placeholder="Finance, IT, Operations, etc." {...register("department")} />
              {errors.department && <p className="text-sm text-destructive">{errors.department.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="auditType">Audit Type *</Label>
              <Select value={auditType} onValueChange={(value) => setValue("auditType", value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select audit type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="financial">Financial Audit</SelectItem>
                  <SelectItem value="operational">Operational Audit</SelectItem>
                  <SelectItem value="compliance">Compliance Audit</SelectItem>
                  <SelectItem value="security">Security Audit</SelectItem>
                  <SelectItem value="quality">Quality Audit</SelectItem>
                </SelectContent>
              </Select>
              {errors.auditType && <p className="text-sm text-destructive">{errors.auditType.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of the audit scope and objectives..."
              rows={4}
              {...register("description")}
            />
          </div>

          <div className="flex justify-between">
            {onBack && (
              <Button type="button" variant="outline" onClick={onBack}>
                Back
              </Button>
            )}
            <Button type="submit" className="ml-auto">
              Next
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
