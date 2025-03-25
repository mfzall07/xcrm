"use client"

import { useState } from "react"
import { Search, User, X } from "lucide-react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"

interface NewChatDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Sample contacts for the dialog
const allContacts = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    department: "Sales",
  },
  {
    id: 2,
    name: "Michael Brown",
    email: "m.brown@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    department: "Marketing",
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "emily.d@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    department: "Product",
  },
  {
    id: 4,
    name: "Robert Wilson",
    email: "r.wilson@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    department: "Design",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    email: "l.anderson@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    department: "Finance",
  },
  {
    id: 6,
    name: "David Miller",
    email: "d.miller@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    department: "Engineering",
  },
  {
    id: 7,
    name: "Jennifer Lee",
    email: "j.lee@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    department: "HR",
  },
  {
    id: 8,
    name: "James Wilson",
    email: "j.wilson@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    department: "Support",
  },
  {
    id: 9,
    name: "Patricia Moore",
    email: "p.moore@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    department: "Sales",
  },
  {
    id: 10,
    name: "Richard Taylor",
    email: "r.taylor@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    department: "Engineering",
  },
]

export function NewChatDialog({ open, onOpenChange }: NewChatDialogProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedContacts, setSelectedContacts] = useState<number[]>([])

  const filteredContacts = allContacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSelectContact = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedContacts([...selectedContacts, id])
    } else {
      setSelectedContacts(selectedContacts.filter((contactId) => contactId !== id))
    }
  }

  const handleStartChat = () => {
    // In a real app, you would create a new chat with the selected contacts
    console.log("Starting chat with:", selectedContacts)
    setSelectedContacts([])
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>New Chat</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="mb-4">
            <Input
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              prefix={<Search className="h-4 w-4 text-muted-foreground" />}
            />
          </div>

          {selectedContacts.length > 0 && (
            <div className="mb-4">
              <div className="text-sm font-medium mb-2">Selected ({selectedContacts.length})</div>
              <div className="flex flex-wrap gap-2">
                {selectedContacts.map((id) => {
                  const contact = allContacts.find((c) => c.id === id)
                  if (!contact) return null
                  return (
                    <div key={contact.id} className="flex items-center gap-2 bg-muted p-2 rounded-md">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={contact.avatar} alt={contact.name} />
                        <AvatarFallback>
                          <User className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{contact.name}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5"
                        onClick={() => handleSelectContact(contact.id, false)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          <ScrollArea className="h-[300px]">
            <div className="space-y-2">
              {filteredContacts.map((contact) => (
                <div key={contact.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted">
                  <Checkbox
                    checked={selectedContacts.includes(contact.id)}
                    onCheckedChange={(checked) => handleSelectContact(contact.id, checked as boolean)}
                  />
                  <Avatar>
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{contact.name}</div>
                    <div className="text-sm text-muted-foreground truncate">{contact.email}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{contact.department}</div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleStartChat} disabled={selectedContacts.length === 0}>
            Start Chat
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

