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
import { Send, Calendar } from "lucide-react"
import { Broadcast } from "@/lib/data"

interface NewBroadcastDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  broadcast: Broadcast | null
  onSave: (broadcast: Omit<Broadcast, "id">) => Promise<boolean>
}

export function NewBroadcastDialog({ open, onOpenChange }: NewBroadcastDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    type: "email",
    audience: "all",
    subject: "",
    content: "",
    scheduledDate: "",
    scheduledTime: "",
  })

  const [broadcastTab, setBroadcastTab] = useState("compose")

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically save the broadcast data
    console.log("Broadcast data:", formData)
    // Reset form and close dialog
    setFormData({
      title: "",
      type: "email",
      audience: "all",
      subject: "",
      content: "",
      scheduledDate: "",
      scheduledTime: "",
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Broadcast</DialogTitle>
            <DialogDescription>Create a new broadcast campaign to send to your audience.</DialogDescription>
          </DialogHeader>

          <Tabs value={broadcastTab} onValueChange={setBroadcastTab} className="mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="compose">Compose</TabsTrigger>
              <TabsTrigger value="audience">Audience</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>

            <TabsContent value="compose" className="space-y-4 mt-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="col-span-3"
                  placeholder="Campaign title (internal use)"
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select value={formData.type} onValueChange={handleTypeChange}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select broadcast type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="push">Push Notification</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.type === "email" && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="subject" className="text-right">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="col-span-3"
                    placeholder="Email subject line"
                    required
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
                      : formData.type === "whatsapp"
                        ? "WhatsApp message..."
                        : formData.type === "sms"
                          ? "SMS message..."
                          : "Push notification message..."
                  }
                  className="col-span-3"
                  rows={6}
                  required
                />
              </div>
            </TabsContent>

            <TabsContent value="audience" className="space-y-4 mt-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="audience" className="text-right">
                  Audience
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
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Segment</Label>
                  <div className="col-span-3">
                    <p className="text-sm text-muted-foreground mb-2">
                      Create a custom segment based on customer attributes.
                    </p>
                    <Button type="button" variant="outline" size="sm">
                      Configure Segment
                    </Button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Estimated Reach</Label>
                <div className="col-span-3">
                  <p className="text-sm">
                    <span className="font-bold">1,248 recipients</span> will receive this broadcast
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4 mt-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="scheduledDate" className="text-right">
                  Date
                </Label>
                <Input
                  id="scheduledDate"
                  name="scheduledDate"
                  type="date"
                  value={formData.scheduledDate}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="scheduledTime" className="text-right">
                  Time
                </Label>
                <Input
                  id="scheduledTime"
                  name="scheduledTime"
                  type="time"
                  value={formData.scheduledTime}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Send Options</Label>
                <div className="col-span-3 flex gap-2">
                  <Button type="button" variant="outline" className="flex-1">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule
                  </Button>
                  <Button type="button" variant="default" className="flex-1">
                    <Send className="mr-2 h-4 w-4" />
                    Send Now
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save as Draft</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

