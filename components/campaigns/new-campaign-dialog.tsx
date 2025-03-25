"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

interface NewCampaignDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewCampaignDialog({ open, onOpenChange }: NewCampaignDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: "email",
    audience: "all",
    startDate: "",
    endDate: "",
    subject: "",
    content: "",
    goal: "awareness",
    budget: "",
  })

  const [campaignTab, setCampaignTab] = useState("details")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value }))
  }

  const handleAudienceChange = (value: string) => {
    setFormData((prev) => ({ ...prev, audience: value }))
  }

  const handleGoalChange = (value: string) => {
    setFormData((prev) => ({ ...prev, goal: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically save the campaign data
    console.log("Campaign data:", formData)
    // Reset form and close dialog
    setFormData({
      name: "",
      type: "email",
      audience: "all",
      startDate: "",
      endDate: "",
      subject: "",
      content: "",
      goal: "awareness",
      budget: "",
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Campaign</DialogTitle>
            <DialogDescription>Create a new marketing campaign to reach your audience.</DialogDescription>
          </DialogHeader>

          <Tabs value={campaignTab} onValueChange={setCampaignTab} className="mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Campaign Details</TabsTrigger>
              <TabsTrigger value="audience">Audience</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4 mt-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Campaign Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="col-span-3"
                  placeholder="Spring Sale Promotion"
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Campaign Type
                </Label>
                <Select value={formData.type} onValueChange={handleTypeChange}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select campaign type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="push">Push Notification</SelectItem>
                    <SelectItem value="multi-channel">Multi-channel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="goal" className="text-right">
                  Campaign Goal
                </Label>
                <RadioGroup value={formData.goal} onValueChange={handleGoalChange} className="col-span-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="awareness" id="awareness" />
                    <Label htmlFor="awareness">Brand Awareness</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="engagement" id="engagement" />
                    <Label htmlFor="engagement">Engagement</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="conversion" id="conversion" />
                    <Label htmlFor="conversion">Conversion</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="retention" id="retention" />
                    <Label htmlFor="retention">Customer Retention</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startDate" className="text-right">
                  Start Date
                </Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endDate" className="text-right">
                  End Date
                </Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="budget" className="text-right">
                  Budget
                </Label>
                <Input
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="$0.00"
                  className="col-span-3"
                />
              </div>
            </TabsContent>

            <TabsContent value="audience" className="space-y-4 mt-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="audience" className="text-right">
                  Target Audience
                </Label>
                <Select value={formData.audience} onValueChange={handleAudienceChange}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Customers</SelectItem>
                    <SelectItem value="active">Active Customers</SelectItem>
                    <SelectItem value="inactive">Inactive Customers</SelectItem>
                    <SelectItem value="leads">All Leads</SelectItem>
                    <SelectItem value="segment">Custom Segment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.audience === "segment" && (
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label className="text-right">Segment Criteria</Label>
                  <div className="col-span-3 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="location" />
                      <Label htmlFor="location">Location</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="age" />
                      <Label htmlFor="age">Age Range</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="purchase" />
                      <Label htmlFor="purchase">Purchase History</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="engagement" />
                      <Label htmlFor="engagement">Engagement Level</Label>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Estimated Reach</Label>
                <div className="col-span-3">
                  <p className="text-sm">
                    <span className="font-bold">1,248 recipients</span> will receive this campaign
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="content" className="space-y-4 mt-4">
              {formData.type === "email" && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="subject" className="text-right">
                    Subject Line
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="col-span-3"
                    placeholder="Enter email subject line"
                    required={formData.type === "email"}
                  />
                </div>
              )}

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="content" className="text-right">
                  Content
                </Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder={
                    formData.type === "email"
                      ? "Email content..."
                      : formData.type === "sms"
                        ? "SMS message..."
                        : formData.type === "push"
                          ? "Push notification message..."
                          : "Campaign content..."
                  }
                  className="col-span-3"
                  rows={6}
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right">Options</Label>
                <div className="col-span-3 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="personalize" defaultChecked />
                    <Label htmlFor="personalize">Personalize content</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="tracking" defaultChecked />
                    <Label htmlFor="tracking">Enable tracking</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="ab-testing" />
                    <Label htmlFor="ab-testing">A/B testing</Label>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Campaign</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

