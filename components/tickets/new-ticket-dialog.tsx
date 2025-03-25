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
import { Paperclip } from "lucide-react"

interface NewTicketDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  ticket: Ticket | null;
  onSave: (ticket: Omit<Ticket, "id">) => Promise<boolean>;
}

export function NewTicketDialog({ open, onOpenChange }: NewTicketDialogProps) {
  const [formData, setFormData] = useState({
    subject: "",
    customer: "",
    category: "technical",
    priority: "medium",
    description: "",
    assignTo: "",
  })

  const [attachments, setAttachments] = useState<File[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setAttachments((prev) => [...prev, ...newFiles])
    }
  }

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically save the ticket data
    console.log("Ticket data:", formData)
    console.log("Attachments:", attachments)
    // Reset form and close dialog
    setFormData({
      subject: "",
      customer: "",
      category: "technical",
      priority: "medium",
      description: "",
      assignTo: "",
    })
    setAttachments([])
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Support Ticket</DialogTitle>
            <DialogDescription>Create a new ticket to track customer issues and requests.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
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
                placeholder="Brief description of the issue"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customer" className="text-right">
                Customer
              </Label>
              <Select value={formData.customer} onValueChange={(value) => handleSelectChange("customer", value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john.smith@example.com">John Smith (john.smith@example.com)</SelectItem>
                  <SelectItem value="sarah.j@example.com">Sarah Johnson (sarah.j@example.com)</SelectItem>
                  <SelectItem value="m.brown@example.com">Michael Brown (m.brown@example.com)</SelectItem>
                  <SelectItem value="emily.d@example.com">Emily Davis (emily.d@example.com)</SelectItem>
                  <SelectItem value="r.wilson@example.com">Robert Wilson (r.wilson@example.com)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="billing">Billing</SelectItem>
                  <SelectItem value="feature-request">Feature Request</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                Priority
              </Label>
              <Select value={formData.priority} onValueChange={(value) => handleSelectChange("priority", value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Detailed description of the issue"
                className="col-span-3"
                rows={5}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="assignTo" className="text-right">
                Assign To
              </Label>
              <Select value={formData.assignTo} onValueChange={(value) => handleSelectChange("assignTo", value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select agent (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emily.davis">Emily Davis</SelectItem>
                  <SelectItem value="robert.wilson">Robert Wilson</SelectItem>
                  <SelectItem value="lisa.anderson">Lisa Anderson</SelectItem>
                  <SelectItem value="david.miller">David Miller</SelectItem>
                  <SelectItem value="john.smith">John Smith</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Attachments</Label>
              <div className="col-span-3">
                <Input id="attachments" type="file" onChange={handleFileChange} className="hidden" multiple />
                <div className="flex flex-wrap gap-2">
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 bg-muted p-2 rounded-md">
                      <span className="text-sm truncate max-w-[150px]">{file.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5"
                        onClick={() => removeAttachment(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  <Label htmlFor="attachments" className="cursor-pointer">
                    <Button type="button" variant="outline" size="sm" className="gap-1" asChild>
                      <span>
                        <Paperclip className="h-4 w-4" />
                        Add Files
                      </span>
                    </Button>
                  </Label>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Upload screenshots or relevant files. Max 5MB per file.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Ticket</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Import X icon which was missing
import { X } from "lucide-react"
import { Ticket } from "@/lib/data"

