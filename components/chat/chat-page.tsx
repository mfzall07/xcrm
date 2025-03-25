"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import {
  Search,
  Plus,
  MoreHorizontal,
  Phone,
  Video,
  Info,
  Paperclip,
  Smile,
  Send,
  Image,
  File,
  User,
  MessageSquare,
  Trash2,
  RefreshCw,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { NewChatDialog } from "@/components/chat/new-chat-dialog"
import type { Contact, Message } from "@/lib/data"
import { chatService } from "@/lib/data-service"
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

export function ChatPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState<number | null>(null)
  const [messageText, setMessageText] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [isNewChatOpen, setIsNewChatOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [contactToDelete, setContactToDelete] = useState<number | null>(null)
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const { toast } = useToast()

  useEffect(() => {
    loadContacts()
  }, [])

  useEffect(() => {
    if (selectedContact) {
      loadMessages(selectedContact)
    }
  }, [selectedContact])

  const loadContacts = async () => {
    setIsLoading(true)
    try {
      const data = await chatService.getContacts()
      setContacts(data)
      if (data.length > 0 && !selectedContact) {
        setSelectedContact(data[0].id)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load contacts",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const loadMessages = async (contactId: number) => {
    try {
      const data = await chatService.getMessages(contactId)
      setMessages(data)
      // Mark messages as read
      const unreadMessages = data.filter((m) => m.senderId !== 0 && !m.read)
      if (unreadMessages.length > 0) {
        unreadMessages.forEach((message) => {
          chatService.markAsRead(message.id)
        })
        // Update contacts to reflect read status
        setContacts(contacts.map((contact) => (contact.id === contactId ? { ...contact, unread: 0 } : contact)))
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive",
      })
    }
  }

  const handleSendMessage = async () => {
    if (messageText.trim() === "" || !selectedContact) return

    try {
      const newMessage: Omit<Message, "id"> = {
        senderId: 0, // Current user
        receiverId: selectedContact,
        text: messageText,
        timestamp: new Date().toISOString(),
        read: true,
      }

      const createdMessage = await chatService.sendMessage(newMessage)
      setMessages([...messages, createdMessage])
      setMessageText("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      })
    }
  }

  const handleCreateContact = async (contact: Omit<Contact, "id">) => {
    try {
      const newContact = await chatService.createContact(contact)
      setContacts([...contacts, newContact])
      setSelectedContact(newContact.id)
      toast({
        title: "Success",
        description: "Contact created successfully",
      })
      return true
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create contact",
        variant: "destructive",
      })
      return false
    }
  }

  const handleDeleteContact = async (id: number) => {
    try {
      const success = await chatService.deleteContact(id)
      if (success) {
        setContacts(contacts.filter((c) => c.id !== id))
        if (selectedContact === id) {
          setSelectedContact(contacts.length > 1 ? contacts.find((c) => c.id !== id)?.id || null : null)
        }
        toast({
          title: "Success",
          description: "Contact deleted successfully",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete contact",
        variant: "destructive",
      })
    }
  }

  const handleDeleteConversation = async () => {
    if (!selectedContact) return

    try {
      const success = await chatService.deleteConversation(selectedContact)
      if (success) {
        setMessages([])
        toast({
          title: "Success",
          description: "Conversation deleted successfully",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete conversation",
        variant: "destructive",
      })
    }
  }

  const handleReset = async () => {
    try {
      const success = await chatService.reset()
      if (success) {
        loadContacts()
        setMessages([])
        toast({
          title: "Success",
          description: "Chat data reset to initial data",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reset chat data",
        variant: "destructive",
      })
    }
  }

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "unread" && contact.unread > 0) ||
      (activeTab === "groups" && contact.isGroup)

    return matchesSearch && matchesTab
  })

  const selectedContactData = contacts.find((contact) => contact.id === selectedContact)

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Chat</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setIsResetDialogOpen(true)}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset Data
          </Button>
          <Button onClick={() => setIsNewChatOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Chat
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-200px)]">
        {/* Contacts List */}
        <div className="md:col-span-1 border rounded-lg overflow-hidden flex flex-col">
          <div className="p-4 border-b">
            <div className="flex items-center gap-2 mb-4">
              <Input
                placeholder="Search contacts..."
                className="flex-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                prefix={<Search className="h-4 w-4 text-muted-foreground" />}
              />
            </div>
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="groups">Groups</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <ScrollArea className="flex-1">
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              </div>
            ) : filteredContacts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-center p-4">
                <MessageSquare className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No contacts found</p>
                <Button variant="outline" className="mt-2" onClick={() => setIsNewChatOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Contact
                </Button>
              </div>
            ) : (
              <div className="divide-y">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`flex gap-3 p-3 hover:bg-muted/50 cursor-pointer ${
                      selectedContact === contact.id ? "bg-muted/50" : ""
                    }`}
                    onClick={() => setSelectedContact(contact.id)}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={contact.avatar} alt={contact.name} />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <span
                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                          contact.status === "online"
                            ? "bg-green-500"
                            : contact.status === "away"
                              ? "bg-yellow-500"
                              : "bg-gray-500"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="font-medium truncate">{contact.name}</div>
                        <div className="text-xs text-muted-foreground">{contact.lastMessageTime}</div>
                      </div>
                      <div className="text-sm text-muted-foreground truncate">{contact.lastMessage}</div>
                    </div>
                    {contact.unread > 0 && (
                      <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center">
                        {contact.unread}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Chat Content */}
        <div className="md:col-span-2 border rounded-lg overflow-hidden flex flex-col">
          {selectedContactData ? (
            <>
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedContactData.avatar} alt={selectedContactData.name} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{selectedContactData.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {selectedContactData.status === "online"
                        ? "Online"
                        : selectedContactData.status === "away"
                          ? "Away"
                          : "Offline"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Info className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View profile</DropdownMenuItem>
                      <DropdownMenuItem>Search in conversation</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Mute notifications</DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setContactToDelete(selectedContactData.id)
                          setIsDeleteDialogOpen(true)
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete contact
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleDeleteConversation} className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Clear chat
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <ScrollArea className="flex-1 p-4">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No messages yet</h3>
                    <p className="text-muted-foreground">Start the conversation by sending a message</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => {
                      const isCurrentUser = message.senderId === 0
                      return (
                        <div key={message.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                          <div className={`flex gap-2 max-w-[80%] ${isCurrentUser ? "flex-row-reverse" : ""}`}>
                            {!isCurrentUser && (
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={selectedContactData.avatar} alt={selectedContactData.name} />
                                <AvatarFallback>
                                  <User className="h-4 w-4" />
                                </AvatarFallback>
                              </Avatar>
                            )}
                            <div>
                              <div
                                className={`rounded-lg p-3 ${
                                  isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted"
                                }`}
                              >
                                <p>{message.text}</p>
                                {message.attachment && (
                                  <div className="mt-2 flex items-center gap-2 rounded-md bg-background/50 p-2">
                                    {message.attachment.type === "image" ? (
                                      <Image className="h-4 w-4" />
                                    ) : (
                                      <File className="h-4 w-4" />
                                    )}
                                    <div className="text-xs">
                                      <div>{message.attachment.name}</div>
                                      <div className="text-muted-foreground">{message.attachment.size}</div>
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className="mt-1 text-xs text-muted-foreground">
                                {format(new Date(message.timestamp), "h:mm a")}
                                {isCurrentUser && <span className="ml-2">{message.read ? "Read" : "Delivered"}</span>}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </ScrollArea>
              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                  />
                  <Button variant="ghost" size="icon">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button size="icon" onClick={handleSendMessage} disabled={messageText.trim() === ""}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No conversation selected</h3>
              <p className="text-muted-foreground">Select a contact from the list to start chatting</p>
              <Button className="mt-4" onClick={() => setIsNewChatOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Start a new chat
              </Button>
            </div>
          )}
        </div>
      </div>

      <NewChatDialog open={isNewChatOpen} onOpenChange={setIsNewChatOpen} onSave={handleCreateContact} />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Contact?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete the contact and all associated messages. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (contactToDelete) {
                  handleDeleteContact(contactToDelete)
                }
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
            <AlertDialogTitle>Reset Chat Data?</AlertDialogTitle>
            <AlertDialogDescription>
              This will reset all contacts and messages to the initial demo data. Any changes you've made will be lost.
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

