"use client"

import type React from "react"

import { useState } from "react"
import { Paperclip, X } from "lucide-react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ComposeEmailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  replyTo?: {
    email: string
    subject: string
  }
}

export function ComposeEmailDialog({ open, onOpenChange, replyTo }: ComposeEmailDialogProps) {
  const [formData, setFormData] = useState({
    to: replyTo?.email || "",
    cc: "",
    bcc: "",
    subject: replyTo ? `Re: ${replyTo.subject}` : "",
    message: "",
  })

  const [attachments, setAttachments] = useState<File[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
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
    // Here you would typically send the email
    console.log("Email data:", formData)
    console.log("Attachments:", attachments)
    // Reset form and close dialog
    setFormData({
      to: "",
      cc: "",
      bcc: "",
      subject: "",
      message: "",
    })
    setAttachments([])
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Compose Email</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-12 items-center gap-4">
              <Label htmlFor="to" className="text-right col-span-1">
                To
              </Label>
              <Input id="to" name="to" value={formData.to} onChange={handleChange} className="col-span-11" required />
            </div>
            <div className="grid grid-cols-12 items-center gap-4">
              <Label htmlFor="cc" className="text-right col-span-1">
                Cc
              </Label>
              <Input id="cc" name="cc" value={formData.cc} onChange={handleChange} className="col-span-11" />
            </div>
            <div className="grid grid-cols-12 items-center gap-4">
              <Label htmlFor="bcc" className="text-right col-span-1">
                Bcc
              </Label>
              <Input id="bcc" name="bcc" value={formData.bcc} onChange={handleChange} className="col-span-11" />
            </div>
            <div className="grid grid-cols-12 items-center gap-4">
              <Label htmlFor="subject" className="text-right col-span-1">
                Subject
              </Label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="col-span-11"
                required
              />
            </div>
            <div className="grid grid-cols-12 items-start gap-4">
              <div className="col-span-1"></div>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                className="col-span-11 min-h-[200px]"
                required
              />
            </div>

            {attachments.length > 0 && (
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-1"></div>
                <div className="col-span-11">
                  <Label className="mb-2 block">Attachments</Label>
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
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter className="flex justify-between">
            <div className="flex items-center gap-2">
              <Input id="attachment" type="file" onChange={handleFileChange} className="hidden" multiple />
              <Label htmlFor="attachment" className="cursor-pointer">
                <Button type="button" variant="outline" size="sm" className="gap-1" asChild>
                  <span>
                    <Paperclip className="h-4 w-4" />
                    Attach
                  </span>
                </Button>
              </Label>
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Send</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

