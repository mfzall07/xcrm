"use client"

import { useState, useEffect } from "react"
import {
  Archive,
  ArchiveX,
  Clock,
  Edit,
  File,
  InboxIcon,
  Mail,
  MoreHorizontal,
  Plus,
  Search,
  Star,
  Trash2,
  User,
  RefreshCw,
  Upload,
  Download,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ComposeEmailDialog } from "@/components/inbox/compose-email-dialog"
import type { Email } from "@/lib/data"
import { emailService, fileUtils } from "@/lib/data-service"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ImportDialog } from "@/components/shared/import-dialog"

export function InboxPage() {
  const [emails, setEmails] = useState<Email[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null)
  const [isComposeOpen, setIsComposeOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEmails, setSelectedEmails] = useState<number[]>([])
  const [activeTab, setActiveTab] = useState("inbox")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [emailsToDelete, setEmailsToDelete] = useState<number[]>([])
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false)
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadEmails()
  }, [activeTab])

  const loadEmails = async () => {
    setIsLoading(true)
    try {
      const data = await emailService.getAll(activeTab)
      setEmails(data)
      if (data.length > 0 && !selectedEmail) {
        setSelectedEmail(data[0].id)
      } else if (data.length === 0) {
        setSelectedEmail(null)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load emails",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailSelect = async (id: number) => {
    setSelectedEmail(id)

    // Mark as read when selected
    const email = emails.find((e) => e.id === id)
    if (email && !email.read) {
      try {
        await emailService.markAsRead(id)
        setEmails(emails.map((e) => (e.id === id ? { ...e, read: true } : e)))
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to mark email as read",
          variant: "destructive",
        })
      }
    }
  }

  const handleSelectAllEmails = (checked: boolean) => {
    if (checked) {
      setSelectedEmails(emails.map((email) => email.id))
    } else {
      setSelectedEmails([])
    }
  }

  const handleCheckboxSelect = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedEmails([...selectedEmails, id])
    } else {
      setSelectedEmails(selectedEmails.filter((emailId) => emailId !== id))
    }
  }

  const handleStarEmail = async (id: number) => {
    try {
      const email = emails.find((e) => e.id === id)
      if (email) {
        const updated = await emailService.toggleStar(id)
        setEmails(emails.map((e) => (e.id === id ? { ...e, starred: !e.starred } : e)))
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update email",
        variant: "destructive",
      })
    }
  }

  const handleArchiveEmails = async (ids: number[]) => {
    try {
      const success = await emailService.archiveEmails(ids)
      if (success) {
        setEmails(emails.filter((e) => !ids.includes(e.id)))
        setSelectedEmails([])
        if (selectedEmail && ids.includes(selectedEmail)) {
          setSelectedEmail(null)
        }
        toast({
          title: "Success",
          description: `${ids.length} email(s) archived`,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to archive emails",
        variant: "destructive",
      })
    }
  }

  const handleDeleteEmails = async (ids: number[]) => {
    try {
      const success = await emailService.deleteEmails(ids)
      if (success) {
        setEmails(emails.filter((e) => !ids.includes(e.id)))
        setSelectedEmails([])
        if (selectedEmail && ids.includes(selectedEmail)) {
          setSelectedEmail(null)
        }
        toast({
          title: "Success",
          description: `${ids.length} email(s) deleted`,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete emails",
        variant: "destructive",
      })
    }
  }

  const handleMarkAsRead = async (ids: number[]) => {
    try {
      const success = await emailService.markMultipleAsRead(ids)
      if (success) {
        setEmails(emails.map((e) => (ids.includes(e.id) ? { ...e, read: true } : e)))
        toast({
          title: "Success",
          description: `${ids.length} email(s) marked as read`,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark emails as read",
        variant: "destructive",
      })
    }
  }

  const handleMarkAsUnread = async (ids: number[]) => {
    try {
      const success = await emailService.markMultipleAsUnread(ids)
      if (success) {
        setEmails(emails.map((e) => (ids.includes(e.id) ? { ...e, read: false } : e)))
        toast({
          title: "Success",
          description: `${ids.length} email(s) marked as unread`,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark emails as unread",
        variant: "destructive",
      })
    }
  }

  const handleSendEmail = async (email: Omit<Email, "id">) => {
    try {
      const newEmail = await emailService.sendEmail(email)
      toast({
        title: "Success",
        description: "Email sent successfully",
      })
      if (activeTab === "sent") {
        loadEmails()
      }
      return true
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send email",
        variant: "destructive",
      })
      return false
    }
  }

  const handleExport = (format: "csv" | "json") => {
    try {
      const data = emailService.export(format)
      const contentType = format === "csv" ? "text/csv" : "application/json"
      const fileName = `emails.${format}`
      fileUtils.downloadFile(data, fileName, contentType)

      toast({
        title: "Success",
        description: `Emails exported as ${format.toUpperCase()}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export emails",
        variant: "destructive",
      })
    }
  }

  const handleImport = async (data: string, format: "csv" | "json") => {
    try {
      const success = await emailService.import(data, format)
      if (success) {
        loadEmails()
        toast({
          title: "Success",
          description: "Emails imported successfully",
        })
        return true
      }
      return false
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to import emails",
        variant: "destructive",
      })
      return false
    }
  }

  const handleReset = async () => {
    try {
      const success = await emailService.reset()
      if (success) {
        loadEmails()
        setSelectedEmail(null)
        setSelectedEmails([])
        toast({
          title: "Success",
          description: "Emails reset to initial data",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reset emails",
        variant: "destructive",
      })
    }
  }

  const filteredEmails = emails.filter(
    (email) =>
      email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.from.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.preview.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const selectedEmailData = emails.find((email) => email.id === selectedEmail)

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Inbox</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setIsResetDialogOpen(true)}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset Data
          </Button>
          <Button onClick={() => setIsComposeOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Compose
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Email List */}
        <div className="md:col-span-1 border rounded-lg overflow-hidden">
          <div className="p-4 border-b bg-muted/30">
            <div className="flex items-center gap-2 mb-4">
              <Input
                placeholder="Search emails..."
                className="flex-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                prefix={<Search className="h-4 w-4 text-muted-foreground" />}
              />
            </div>
            <Tabs defaultValue="inbox" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="inbox">Inbox</TabsTrigger>
                <TabsTrigger value="starred">Starred</TabsTrigger>
                <TabsTrigger value="sent">Sent</TabsTrigger>
                <TabsTrigger value="drafts">Drafts</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex items-center gap-2 p-2 border-b">
            <Checkbox
              checked={selectedEmails.length === emails.length && emails.length > 0}
              onCheckedChange={(checked) => handleSelectAllEmails(checked as boolean)}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => handleMarkAsRead(selectedEmails)}>Mark as read</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleMarkAsUnread(selectedEmails)}>Mark as unread</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleArchiveEmails(selectedEmails)}>Archive</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setEmailsToDelete(selectedEmails)
                    setIsDeleteDialogOpen(true)
                  }}
                  className="text-destructive"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleArchiveEmails(selectedEmails)}
              disabled={selectedEmails.length === 0}
            >
              <Archive className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => {
                setEmailsToDelete(selectedEmails)
                setIsDeleteDialogOpen(true)
              }}
              disabled={selectedEmails.length === 0}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <div className="ml-auto flex gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleExport("csv")}>Export as CSV</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport("json")}>Export as JSON</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsImportDialogOpen(true)}>
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="divide-y max-h-[calc(100vh-300px)] overflow-y-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              </div>
            ) : filteredEmails.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-center p-4">
                <InboxIcon className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No emails found</p>
                {activeTab === "inbox" && (
                  <Button variant="outline" className="mt-2" onClick={() => setIsComposeOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Compose Email
                  </Button>
                )}
              </div>
            ) : (
              filteredEmails.map((email) => (
                <div
                  key={email.id}
                  className={`flex gap-2 p-3 hover:bg-muted/50 cursor-pointer ${
                    selectedEmail === email.id ? "bg-muted/50" : ""
                  } ${!email.read ? "font-medium" : ""}`}
                  onClick={() => handleEmailSelect(email.id)}
                >
                  <div className="flex items-start gap-2">
                    <Checkbox
                      checked={selectedEmails.includes(email.id)}
                      onCheckedChange={(checked) => handleCheckboxSelect(email.id, checked as boolean)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <button
                      className="text-muted-foreground hover:text-yellow-500"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleStarEmail(email.id)
                      }}
                    >
                      <Star className={`h-4 w-4 ${email.starred ? "fill-yellow-500 text-yellow-500" : ""}`} />
                    </button>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="font-medium truncate">{email.from.name}</div>
                      <div className="text-xs text-muted-foreground">{new Date(email.date).toLocaleDateString()}</div>
                    </div>
                    <div className="truncate">{email.subject}</div>
                    <div className="text-sm text-muted-foreground truncate">{email.preview}</div>
                    <div className="flex items-center gap-1 mt-1">
                      {email.attachments && email.attachments.length > 0 && (
                        <Badge variant="outline" className="text-xs">
                          <File className="h-3 w-3 mr-1" />
                          {email.attachments.length}
                        </Badge>
                      )}
                      {email.labels &&
                        email.labels.map((label) => (
                          <Badge key={label} variant="secondary" className="text-xs">
                            {label}
                          </Badge>
                        ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Email Content */}
        <div className="md:col-span-2 border rounded-lg overflow-hidden">
          {selectedEmailData ? (
            <div className="flex flex-col h-full">
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="text-xl font-semibold">{selectedEmailData.subject}</h3>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleArchiveEmails([selectedEmailData.id])}>
                    <ArchiveX className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEmailsToDelete([selectedEmailData.id])
                      setIsDeleteDialogOpen(true)
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleMarkAsUnread([selectedEmailData.id])}>
                        Mark as unread
                      </DropdownMenuItem>
                      <DropdownMenuItem>Forward</DropdownMenuItem>
                      <DropdownMenuItem>Print</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Add label</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStarEmail(selectedEmailData.id)}>
                        {selectedEmailData.starred ? "Remove from starred" : "Add to starred"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedEmailData.from.avatar} alt={selectedEmailData.from.name} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{selectedEmailData.from.name}</div>
                        <div className="text-sm text-muted-foreground">{selectedEmailData.from.email}</div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {new Date(selectedEmailData.date).toLocaleString()}
                      </div>
                    </div>
                    <div className="text-sm mt-1">
                      To:{" "}
                      <span className="text-muted-foreground">
                        {selectedEmailData.to.map((recipient) => `${recipient.name} <${recipient.email}>`).join(", ")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 flex-1 overflow-auto">
                <div dangerouslySetInnerHTML={{ __html: selectedEmailData.body }} />

                {selectedEmailData.attachments && selectedEmailData.attachments.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium mb-2">Attachments ({selectedEmailData.attachments.length})</h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedEmailData.attachments.map((attachment, index) => (
                        <div key={index} className="border rounded-lg p-3 flex items-center gap-2">
                          <File className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <div className="text-sm font-medium">{attachment.name}</div>
                            <div className="text-xs text-muted-foreground">{attachment.size}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4 border-t">
                <Button className="w-full" onClick={() => setIsComposeOpen(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Reply
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <InboxIcon className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No email selected</h3>
              <p className="text-muted-foreground">Select an email from the list to view its contents</p>
            </div>
          )}
        </div>
      </div>

      <ComposeEmailDialog
        open={isComposeOpen}
        onOpenChange={setIsComposeOpen}
        replyTo={selectedEmailData}
        onSend={handleSendEmail}
      />

      <ImportDialog
        open={isImportDialogOpen}
        onOpenChange={setIsImportDialogOpen}
        onImport={handleImport}
        entityName="emails"
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Email{emailsToDelete.length > 1 ? "s" : ""}?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the selected email
              {emailsToDelete.length > 1 ? "s" : ""}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleDeleteEmails(emailsToDelete)
                setIsDeleteDialogOpen(false)
              }}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset Email Data?</AlertDialogTitle>
            <AlertDialogDescription>
              This will reset all email data to the initial demo data. Any changes you've made will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleReset}>Reset Data</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

