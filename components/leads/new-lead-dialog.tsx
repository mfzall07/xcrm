"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
import type { KanbanLead } from "@/lib/data"

interface NewLeadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  lead: KanbanLead | null
  isEditMode: boolean
  onSave: (lead: any) => void
}

export function NewLeadDialog({ open, onOpenChange, lead, isEditMode, onSave }: NewLeadDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    contact: "",
    value: "",
    dueDate: "",
    tags: "",
    priority: "Medium",
    notes: "",
  })

  // Initialize form data when editing a lead
  useEffect(() => {
    if (isEditMode && lead) {
      setFormData({
        title: lead.title,
        company: lead.company,
        contact: lead.contact,
        value: lead.value,
        dueDate: lead.dueDate,
        tags: lead.tags.join(", "),
        priority: lead.priority,
        notes: "",
      })
    } else {
      // Reset form when adding a new lead
      setFormData({
        title: "",
        company: "",
        contact: "",
        value: "",
        dueDate: "",
        tags: "",
        priority: "Medium",
        notes: "",
      })
    }
  }, [isEditMode, lead, open])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePriorityChange = (value: string) => {
    setFormData((prev) => ({ ...prev, priority: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Lead" : "Add New Lead"}</DialogTitle>
            <DialogDescription>
              {isEditMode
                ? "Update the lead details below."
                : "Enter the lead details below to add it to your pipeline."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
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
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="company" className="text-right">
                Company
              </Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contact" className="text-right">
                Contact
              </Label>
              <Input
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="value" className="text-right">
                Value
              </Label>
              <Input
                id="value"
                name="value"
                value={formData.value}
                onChange={handleChange}
                placeholder="$0.00"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dueDate" className="text-right">
                Due Date
              </Label>
              <Input
                id="dueDate"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tags" className="text-right">
                Tags
              </Label>
              <Input
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Web, Design, Marketing (comma separated)"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                Priority
              </Label>
              <Select value={formData.priority} onValueChange={handlePriorityChange}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Additional information about this lead"
                className="col-span-3"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{isEditMode ? "Update" : "Save"} Lead</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

