// Data service for CRUD operations and import/export functionality
import {
  type Customer,
  type Lead,
  type Invoice,
  type Broadcast,
  type Event,
  type Email,
  type Contact,
  type Message,
  type Ticket,
  customers as initialCustomers,
  leads as initialLeads,
  invoices as initialInvoices,
  activities as initialActivities,
  tasks as initialTasks,
  kanbanLeads as initialKanbanLeads,
  broadcasts as initialBroadcasts,
  events as initialEvents,
  emails as initialEmails,
  contacts as initialContacts,
  messages as initialMessages,
  tickets as initialTickets
} from "./data"

// In-memory data store
let customersStore = [...initialCustomers]
let leadsStore = [...initialLeads]
let invoicesStore = [...initialInvoices]
const activitiesStore = [...initialActivities]
const tasksStore = [...initialTasks]
const kanbanLeadsStore = { ...initialKanbanLeads }
let broadcastsStore = [...initialBroadcasts]
let eventsStore = [...initialEvents]
let emailsStore = [...initialEmails]
let contactsStore = [...initialContacts]
let messagesStore = { ...initialMessages }
let ticketsStore = [...initialTickets]

// Generate a unique ID for new items
const generateId = (prefix: string) => {
  const randomId = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")
  return `${prefix}-${randomId}`
}

// Customer CRUD operations
export const customerService = {
  getAll: (): Promise<Customer[]> => {
    return Promise.resolve(customersStore)
  },

  getById: (id: string): Promise<Customer | undefined> => {
    return Promise.resolve(customersStore.find((customer) => customer.id === id))
  },

  create: (customer: Omit<Customer, "id">): Promise<Customer> => {
    const newCustomer = {
      ...customer,
      id: generateId("CUST"),
    } as Customer

    customersStore = [...customersStore, newCustomer]
    return Promise.resolve(newCustomer)
  },

  update: (id: string, customer: Partial<Customer>): Promise<Customer | undefined> => {
    const index = customersStore.findIndex((c) => c.id === id)
    if (index === -1) return Promise.resolve(undefined)

    const updatedCustomer = { ...customersStore[index], ...customer }
    customersStore[index] = updatedCustomer
    customersStore = [...customersStore] // Create a new array to trigger reactivity

    return Promise.resolve(updatedCustomer)
  },

  delete: (id: string): Promise<boolean> => {
    const initialLength = customersStore.length
    customersStore = customersStore.filter((customer) => customer.id !== id)
    return Promise.resolve(customersStore.length !== initialLength)
  },

  export: (format: "csv" | "json"): string => {
    if (format === "json") {
      return JSON.stringify(customersStore, null, 2)
    } else {
      // CSV format
      const headers = Object.keys(customersStore[0]).join(",")
      const rows = customersStore.map((customer) =>
        Object.values(customer)
          .map((value) => (typeof value === "string" && value.includes(",") ? `"${value}"` : value))
          .join(","),
      )
      return [headers, ...rows].join("\n")
    }
  },

  import: (data: string, format: "csv" | "json"): Promise<boolean> => {
    try {
      if (format === "json") {
        const parsedData = JSON.parse(data) as Customer[]
        customersStore = parsedData
        return Promise.resolve(true)
      } else {
        // CSV format
        const lines = data.split("\n")
        const headers = lines[0].split(",")

        const parsedData = lines.slice(1).map((line) => {
          const values = line.split(",")
          return headers.reduce((obj, header, index) => {
            let value = values[index]
            // Remove quotes if present
            if (value && value.startsWith('"') && value.endsWith('"')) {
              value = value.slice(1, -1)
            }
            return { ...obj, [header]: value }
          }, {}) as Customer
        })

        customersStore = parsedData
        return Promise.resolve(true)
      }
    } catch (error) {
      console.error("Import error:", error)
      return Promise.resolve(false)
    }
  },

  reset: (): Promise<boolean> => {
    customersStore = [...initialCustomers]
    return Promise.resolve(true)
  },
}

// Lead CRUD operations
export const leadService = {
  getAll: (): Promise<Lead[]> => {
    return Promise.resolve(leadsStore)
  },

  getById: (id: string): Promise<Lead | undefined> => {
    return Promise.resolve(leadsStore.find((lead) => lead.id === id))
  },

  create: (lead: Omit<Lead, "id">): Promise<Lead> => {
    const newLead = {
      ...lead,
      id: generateId("LEAD"),
    } as Lead

    leadsStore = [...leadsStore, newLead]
    return Promise.resolve(newLead)
  },

  update: (id: string, lead: Partial<Lead>): Promise<Lead | undefined> => {
    const index = leadsStore.findIndex((l) => l.id === id)
    if (index === -1) return Promise.resolve(undefined)

    const updatedLead = { ...leadsStore[index], ...lead }
    leadsStore[index] = updatedLead
    leadsStore = [...leadsStore] // Create a new array to trigger reactivity

    return Promise.resolve(updatedLead)
  },

  delete: (id: string): Promise<boolean> => {
    const initialLength = leadsStore.length
    leadsStore = leadsStore.filter((lead) => lead.id !== id)
    return Promise.resolve(leadsStore.length !== initialLength)
  },

  export: (format: "csv" | "json"): string => {
    if (format === "json") {
      return JSON.stringify(leadsStore, null, 2)
    } else {
      // CSV format
      const headers = Object.keys(leadsStore[0]).join(",")
      const rows = leadsStore.map((lead) =>
        Object.values(lead)
          .map((value) => (typeof value === "string" && value.includes(",") ? `"${value}"` : value))
          .join(","),
      )
      return [headers, ...rows].join("\n")
    }
  },

  import: (data: string, format: "csv" | "json"): Promise<boolean> => {
    try {
      if (format === "json") {
        const parsedData = JSON.parse(data) as Lead[]
        leadsStore = parsedData
        return Promise.resolve(true)
      } else {
        // CSV format
        const lines = data.split("\n")
        const headers = lines[0].split(",")

        const parsedData = lines.slice(1).map((line) => {
          const values = line.split(",")
          return headers.reduce((obj, header, index) => {
            let value = values[index]
            // Remove quotes if present
            if (value && value.startsWith('"') && value.endsWith('"')) {
              value = value.slice(1, -1)
            }
            return { ...obj, [header]: value }
          }, {}) as Lead
        })

        leadsStore = parsedData
        return Promise.resolve(true)
      }
    } catch (error) {
      console.error("Import error:", error)
      return Promise.resolve(false)
    }
  },

  reset: (): Promise<boolean> => {
    leadsStore = [...initialLeads]
    return Promise.resolve(true)
  },
}

// Invoice CRUD operations
export const invoiceService = {
  getAll: (): Promise<Invoice[]> => {
    return Promise.resolve(invoicesStore)
  },

  getById: (id: string): Promise<Invoice | undefined> => {
    return Promise.resolve(invoicesStore.find((invoice) => invoice.id === id))
  },

  create: (invoice: Omit<Invoice, "id">): Promise<Invoice> => {
    const newInvoice = {
      ...invoice,
      id: generateId("INV"),
    } as Invoice

    invoicesStore = [...invoicesStore, newInvoice]
    return Promise.resolve(newInvoice)
  },

  update: (id: string, invoice: Partial<Invoice>): Promise<Invoice | undefined> => {
    const index = invoicesStore.findIndex((i) => i.id === id)
    if (index === -1) return Promise.resolve(undefined)

    const updatedInvoice = { ...invoicesStore[index], ...invoice }
    invoicesStore[index] = updatedInvoice
    invoicesStore = [...invoicesStore] // Create a new array to trigger reactivity

    return Promise.resolve(updatedInvoice)
  },

  delete: (id: string): Promise<boolean> => {
    const initialLength = invoicesStore.length
    invoicesStore = invoicesStore.filter((invoice) => invoice.id !== id)
    return Promise.resolve(invoicesStore.length !== initialLength)
  },

  export: (format: "csv" | "json"): string => {
    if (format === "json") {
      return JSON.stringify(invoicesStore, null, 2)
    } else {
      // CSV format
      const headers = Object.keys(invoicesStore[0]).join(",")
      const rows = invoicesStore.map((invoice) =>
        Object.values(invoice)
          .map((value) => (typeof value === "string" && value.includes(",") ? `"${value}"` : value))
          .join(","),
      )
      return [headers, ...rows].join("\n")
    }
  },

  import: (data: string, format: "csv" | "json"): Promise<boolean> => {
    try {
      if (format === "json") {
        const parsedData = JSON.parse(data) as Invoice[]
        invoicesStore = parsedData
        return Promise.resolve(true)
      } else {
        // CSV format
        const lines = data.split("\n")
        const headers = lines[0].split(",")

        const parsedData = lines.slice(1).map((line) => {
          const values = line.split(",")
          return headers.reduce((obj, header, index) => {
            let value = values[index]
            // Remove quotes if present
            if (value && value.startsWith('"') && value.endsWith('"')) {
              value = value.slice(1, -1)
            }
            return { ...obj, [header]: value }
          }, {}) as Invoice
        })

        invoicesStore = parsedData
        return Promise.resolve(true)
      }
    } catch (error) {
      console.error("Import error:", error)
      return Promise.resolve(false)
    }
  },

  reset: (): Promise<boolean> => {
    invoicesStore = [...initialInvoices]
    return Promise.resolve(true)
  },
}

// Broadcast CRUD operations
export const broadcastService = {
  getAll: (): Promise<Broadcast[]> => {
    return Promise.resolve(broadcastsStore)
  },

  getById: (id: string): Promise<Broadcast | undefined> => {
    return Promise.resolve(broadcastsStore.find((broadcast) => broadcast.id === id))
  },

  create: (broadcast: Omit<Broadcast, "id">): Promise<Broadcast> => {
    const newBroadcast = {
      ...broadcast,
      id: generateId("BC"),
    } as Broadcast

    broadcastsStore = [...broadcastsStore, newBroadcast]
    return Promise.resolve(newBroadcast)
  },

  update: (id: string, broadcast: Partial<Broadcast>): Promise<Broadcast | undefined> => {
    const index = broadcastsStore.findIndex((b) => b.id === id)
    if (index === -1) return Promise.resolve(undefined)

    const updatedBroadcast = { ...broadcastsStore[index], ...broadcast }
    broadcastsStore[index] = updatedBroadcast
    broadcastsStore = [...broadcastsStore] // Create a new array to trigger reactivity

    return Promise.resolve(updatedBroadcast)
  },

  delete: (id: string): Promise<boolean> => {
    const initialLength = broadcastsStore.length
    broadcastsStore = broadcastsStore.filter((broadcast) => broadcast.id !== id)
    return Promise.resolve(broadcastsStore.length !== initialLength)
  },

  export: (format: "csv" | "json"): string => {
    if (format === "json") {
      return JSON.stringify(broadcastsStore, null, 2)
    } else {
      // CSV format
      const headers = Object.keys(broadcastsStore[0]).join(",")
      const rows = broadcastsStore.map((broadcast) =>
        Object.values(broadcast)
          .map((value) => (typeof value === "string" && value.includes(",") ? `"${value}"` : value))
          .join(","),
      )
      return [headers, ...rows].join("\n")
    }
  },

  import: (data: string, format: "csv" | "json"): Promise<boolean> => {
    try {
      if (format === "json") {
        const parsedData = JSON.parse(data) as Broadcast[]
        broadcastsStore = parsedData
        return Promise.resolve(true)
      } else {
        // CSV format
        const lines = data.split("\n")
        const headers = lines[0].split(",")

        const parsedData = lines.slice(1).map((line) => {
          const values = line.split(",")
          return headers.reduce((obj, header, index) => {
            let value = values[index]
            // Remove quotes if present
            if (value && value.startsWith('"') && value.endsWith('"')) {
              value = value.slice(1, -1)
            }
            return { ...obj, [header]: value }
          }, {}) as Broadcast
        })

        broadcastsStore = parsedData
        return Promise.resolve(true)
      }
    } catch (error) {
      console.error("Import error:", error)
      return Promise.resolve(false)
    }
  },

  reset: (): Promise<boolean> => {
    broadcastsStore = [...initialBroadcasts]
    return Promise.resolve(true)
  },
}

// Campaign CRUD operations
export const campaignService = {
  getAll: (): Promise<any[]> => {
    // Using any[] since Campaign type might not be defined yet
    return Promise.resolve([
      {
        id: "CAM-001",
        name: "Spring Sale Promotion",
        type: "Email",
        status: "Active",
        startDate: "2023-03-01",
        endDate: "2023-03-31",
        audience: "All Customers",
        reach: 5000,
        engagement: 32,
        conversion: 8,
      },
      {
        id: "CAM-002",
        name: "New Product Launch",
        type: "Multi-channel",
        status: "Scheduled",
        startDate: "2023-04-15",
        endDate: "2023-05-15",
        audience: "Existing Customers",
        reach: 0,
        engagement: 0,
        conversion: 0,
      },
      {
        id: "CAM-003",
        name: "Customer Feedback Survey",
        type: "Email",
        status: "Completed",
        startDate: "2023-02-01",
        endDate: "2023-02-28",
        audience: "Recent Purchasers",
        reach: 2500,
        engagement: 45,
        conversion: 12,
      },
      {
        id: "CAM-004",
        name: "Flash Sale Weekend",
        type: "SMS",
        status: "Draft",
        startDate: "",
        endDate: "",
        audience: "All Subscribers",
        reach: 0,
        engagement: 0,
        conversion: 0,
      },
      {
        id: "CAM-005",
        name: "Loyalty Program Announcement",
        type: "Push",
        status: "Active",
        startDate: "2023-03-15",
        endDate: "2023-04-15",
        audience: "Repeat Customers",
        reach: 3200,
        engagement: 28,
        conversion: 5,
      },
    ])
  },

  create: (campaign: any): Promise<any> => {
    return Promise.resolve({
      ...campaign,
      id: generateId("CAM"),
    })
  },

  update: (id: string, campaign: any): Promise<any> => {
    return Promise.resolve({
      ...campaign,
      id,
    })
  },

  delete: (id: string): Promise<boolean> => {
    return Promise.resolve(true)
  },

  export: (format: "csv" | "json"): string => {
    return format === "json" ? "[]" : "id,name,type,status\n"
  },

  import: (data: string, format: "csv" | "json"): Promise<boolean> => {
    return Promise.resolve(true)
  },

  reset: (): Promise<boolean> => {
    return Promise.resolve(true)
  },
}

// Event CRUD operations
export const eventService = {
  getAll: (): Promise<Event[]> => {
    return Promise.resolve(eventsStore)
  },

  getById: (id: string): Promise<Event | undefined> => {
    return Promise.resolve(eventsStore.find((event) => event.id === id))
  },

  create: (event: Omit<Event, "id">): Promise<Event> => {
    const newEvent = {
      ...event,
      id: generateId("EVT"),
    } as Event

    eventsStore = [...eventsStore, newEvent]
    return Promise.resolve(newEvent)
  },

  update: (id: string, event: Partial<Event>): Promise<Event | undefined> => {
    const index = eventsStore.findIndex((e) => e.id === id)
    if (index === -1) return Promise.resolve(undefined)

    const updatedEvent = { ...eventsStore[index], ...event }
    eventsStore[index] = updatedEvent
    eventsStore = [...eventsStore] // Create a new array to trigger reactivity

    return Promise.resolve(updatedEvent)
  },

  delete: (id: string): Promise<boolean> => {
    const initialLength = eventsStore.length
    eventsStore = eventsStore.filter((event) => event.id !== id)
    return Promise.resolve(eventsStore.length !== initialLength)
  },

  export: (format: "csv" | "json"): string => {
    if (format === "json") {
      return JSON.stringify(eventsStore, null, 2)
    } else {
      // CSV format
      const headers = Object.keys(eventsStore[0]).join(",")
      const rows = eventsStore.map((event) =>
        Object.values(event)
          .map((value) => (typeof value === "string" && value.includes(",") ? `"${value}"` : value))
          .join(","),
      )
      return [headers, ...rows].join("\n")
    }
  },

  import: (data: string, format: "csv" | "json"): Promise<boolean> => {
    try {
      if (format === "json") {
        const parsedData = JSON.parse(data) as Event[]
        eventsStore = parsedData
        return Promise.resolve(true)
      } else {
        // CSV format
        const lines = data.split("\n")
        const headers = lines[0].split(",")

        const parsedData = lines.slice(1).map((line) => {
          const values = line.split(",")
          return headers.reduce((obj, header, index) => {
            let value = values[index]
            // Remove quotes if present
            if (value && value.startsWith('"') && value.endsWith('"')) {
              value = value.slice(1, -1)
            }
            return { ...obj, [header]: value }
          }, {}) as Event
        })

        eventsStore = parsedData
        return Promise.resolve(true)
      }
    } catch (error) {
      console.error("Import error:", error)
      return Promise.resolve(false)
    }
  },

  reset: (): Promise<boolean> => {
    eventsStore = [...initialEvents]
    return Promise.resolve(true)
  },
}

// Email CRUD operations
export const emailService = {
  getAll: (folder = "inbox"): Promise<Email[]> => {
    let filteredEmails: Email[] = []

    switch (folder) {
      case "inbox":
        filteredEmails = emailsStore.filter((email) => !email.archived && !email.deleted && email.folder === "inbox")
        break
      case "sent":
        filteredEmails = emailsStore.filter((email) => !email.deleted && email.folder === "sent")
        break
      case "drafts":
        filteredEmails = emailsStore.filter((email) => !email.deleted && email.folder === "drafts")
        break
      case "starred":
        filteredEmails = emailsStore.filter((email) => !email.deleted && email.starred)
        break
      case "archived":
        filteredEmails = emailsStore.filter((email) => email.archived && !email.deleted)
        break
      case "trash":
        filteredEmails = emailsStore.filter((email) => email.deleted)
        break
      default:
        filteredEmails = emailsStore.filter((email) => !email.archived && !email.deleted)
    }

    return Promise.resolve(filteredEmails)
  },

  getById: (id: number): Promise<Email | undefined> => {
    return Promise.resolve(emailsStore.find((email) => email.id === id))
  },

  markAsRead: (id: number): Promise<boolean> => {
    const index = emailsStore.findIndex((e) => e.id === id)
    if (index === -1) return Promise.resolve(false)

    emailsStore[index] = { ...emailsStore[index], read: true }
    return Promise.resolve(true)
  },

  markMultipleAsRead: (ids: number[]): Promise<boolean> => {
    let success = true

    ids.forEach((id) => {
      const index = emailsStore.findIndex((e) => e.id === id)
      if (index === -1) {
        success = false
        return
      }

      emailsStore[index] = { ...emailsStore[index], read: true }
    })

    return Promise.resolve(success)
  },

  markMultipleAsUnread: (ids: number[]): Promise<boolean> => {
    let success = true

    ids.forEach((id) => {
      const index = emailsStore.findIndex((e) => e.id === id)
      if (index === -1) {
        success = false
        return
      }

      emailsStore[index] = { ...emailsStore[index], read: false }
    })

    return Promise.resolve(success)
  },

  toggleStar: (id: number): Promise<boolean> => {
    const index = emailsStore.findIndex((e) => e.id === id)
    if (index === -1) return Promise.resolve(false)

    const currentStarred = emailsStore[index].starred
    emailsStore[index] = { ...emailsStore[index], starred: !currentStarred }
    return Promise.resolve(true)
  },

  archiveEmails: (ids: number[]): Promise<boolean> => {
    let success = true

    ids.forEach((id) => {
      const index = emailsStore.findIndex((e) => e.id === id)
      if (index === -1) {
        success = false
        return
      }

      emailsStore[index] = { ...emailsStore[index], archived: true }
    })

    return Promise.resolve(success)
  },

  deleteEmails: (ids: number[]): Promise<boolean> => {
    let success = true

    ids.forEach((id) => {
      const index = emailsStore.findIndex((e) => e.id === id)
      if (index === -1) {
        success = false
        return
      }

      emailsStore[index] = { ...emailsStore[index], deleted: true }
    })

    return Promise.resolve(success)
  },

  sendEmail: (email: Omit<Email, "id">): Promise<Email> => {
    const newEmail = {
      ...email,
      id: Math.max(...emailsStore.map((e) => e.id)) + 1,
      date: new Date().toISOString(),
      read: true,
      starred: false,
      archived: false,
      deleted: false,
      folder: "sent",
    } as Email

    emailsStore = [...emailsStore, newEmail]
    return Promise.resolve(newEmail)
  },

  export: (format: "csv" | "json"): string => {
    if (format === "json") {
      return JSON.stringify(emailsStore, null, 2)
    } else {
      // CSV format
      const headers = Object.keys(emailsStore[0]).join(",")
      const rows = emailsStore.map((email) =>
        Object.values(email)
          .map((value) => {
            if (typeof value === "object") {
              return `"${JSON.stringify(value).replace(/"/g, '""')}"`
            }
            return typeof value === "string" && value.includes(",") ? `"${value}"` : value
          })
          .join(","),
      )
      return [headers, ...rows].join("\n")
    }
  },

  import: (data: string, format: "csv" | "json"): Promise<boolean> => {
    try {
      if (format === "json") {
        const parsedData = JSON.parse(data) as Email[]
        emailsStore = parsedData
        return Promise.resolve(true)
      } else {
        // CSV format
        const lines = data.split("\n")
        const headers = lines[0].split(",")

        const parsedData = lines.slice(1).map((line) => {
          const values = line.split(",")
          return headers.reduce((obj, header, index) => {
            let value = values[index]
            // Remove quotes if present
            if (value && value.startsWith('"') && value.endsWith('"')) {
              value = value.slice(1, -1)
            }

            // Try to parse JSON objects
            if (value && (value.startsWith("{") || value.startsWith("["))) {
              try {
                value = JSON.parse(value)
              } catch (e) {
                // Keep as string if parsing fails
              }
            }

            return { ...obj, [header]: value }
          }, {}) as Email
        })

        emailsStore = parsedData
        return Promise.resolve(true)
      }
    } catch (error) {
      console.error("Import error:", error)
      return Promise.resolve(false)
    }
  },

  reset: (): Promise<boolean> => {
    emailsStore = [...initialEmails]
    return Promise.resolve(true)
  },
}

// Chat CRUD operations
export const chatService = {
  getContacts: (): Promise<Contact[]> => {
    return Promise.resolve(contactsStore)
  },

  getMessages: (contactId: number): Promise<Message[]> => {
    return Promise.resolve(messagesStore[contactId] || [])
  },

  sendMessage: (message: Omit<Message, "id">): Promise<Message> => {
    const contactId = message.receiverId
    const newMessage = {
      ...message,
      id: Math.max(...(messagesStore[contactId]?.map((m) => m.id) || [0])) + 1,
    } as Message

    if (!messagesStore[contactId]) {
      messagesStore[contactId] = []
    }

    messagesStore[contactId] = [...messagesStore[contactId], newMessage]

    // Update last message in contact
    const contactIndex = contactsStore.findIndex((c) => c.id === contactId)
    if (contactIndex !== -1) {
      const date = new Date(message.timestamp)
      const hours = date.getHours()
      const minutes = date.getMinutes()
      const ampm = hours >= 12 ? "PM" : "AM"
      const formattedHours = hours % 12 || 12
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
      const timeString = `${formattedHours}:${formattedMinutes} ${ampm}`

      contactsStore[contactIndex] = {
        ...contactsStore[contactIndex],
        lastMessage: message.text.substring(0, 30) + (message.text.length > 30 ? "..." : ""),
        lastMessageTime: timeString,
      }
    }

    return Promise.resolve(newMessage)
  },

  markAsRead: (messageId: number): Promise<boolean> => {
    let success = false

    Object.keys(messagesStore).forEach((contactIdStr) => {
      const contactId = Number.parseInt(contactIdStr)
      const messageIndex = messagesStore[contactId].findIndex((m) => m.id === messageId)

      if (messageIndex !== -1) {
        messagesStore[contactId][messageIndex] = {
          ...messagesStore[contactId][messageIndex],
          read: true,
        }
        success = true
      }
    })

    return Promise.resolve(success)
  },

  createContact: (contact: Omit<Contact, "id">): Promise<Contact> => {
    const newContact = {
      ...contact,
      id: Math.max(...contactsStore.map((c) => c.id)) + 1,
      lastMessage: "",
      lastMessageTime: "Just now",
      unread: 0,
    } as Contact

    contactsStore.push(newContact)
    messagesStore[newContact.id] = []

    return Promise.resolve(newContact)
  },

  deleteContact: (id: number): Promise<boolean> => {
    const initialLength = contactsStore.length
    const contactIndex = contactsStore.findIndex((c) => c.id === id)

    if (contactIndex !== -1) {
      contactsStore.splice(contactIndex, 1)
      delete messagesStore[id]
      return Promise.resolve(true)
    }

    return Promise.resolve(false)
  },

  deleteConversation: (contactId: number): Promise<boolean> => {
    if (messagesStore[contactId]) {
      messagesStore[contactId] = []

      // Update last message in contact
      const contactIndex = contactsStore.findIndex((c) => c.id === contactId)
      if (contactIndex !== -1) {
        contactsStore[contactIndex] = {
          ...contactsStore[contactIndex],
          lastMessage: "No messages",
          lastMessageTime: "",
          unread: 0,
        }
      }

      return Promise.resolve(true)
    }

    return Promise.resolve(false)
  },

  reset: (): Promise<boolean> => {
    contactsStore = [...initialContacts]
    messagesStore = { ...initialMessages }
    return Promise.resolve(true)
  },
}

// Ticket CRUD operations
export const ticketService = {
  getAll: (): Promise<Ticket[]> => {
    return Promise.resolve(ticketsStore)
  },

  getById: (id: string): Promise<Ticket | undefined> => {
    return Promise.resolve(ticketsStore.find((ticket) => ticket.id === id))
  },

  create: (ticket: Omit<Ticket, "id">): Promise<Ticket> => {
    const newTicket = {
      ...ticket,
      id: generateId("TICK"), // A function to generate a unique ticket ID
    } as Ticket

    ticketsStore = [...ticketsStore, newTicket]
    return Promise.resolve(newTicket)
  },

  update: (id: string, ticket: Partial<Ticket>): Promise<Ticket | undefined> => {
    const index = ticketsStore.findIndex((t) => t.id === id)
    if (index === -1) return Promise.resolve(undefined)

    const updatedTicket = { ...ticketsStore[index], ...ticket }
    ticketsStore[index] = updatedTicket
    ticketsStore = [...ticketsStore] // Create a new array to trigger reactivity

    return Promise.resolve(updatedTicket)
  },

  delete: (id: string): Promise<boolean> => {
    const initialLength = ticketsStore.length
    ticketsStore = ticketsStore.filter((ticket) => ticket.id !== id)
    return Promise.resolve(ticketsStore.length !== initialLength)
  },

  export: (format: "csv" | "json"): string => {
    if (format === "json") {
      return JSON.stringify(ticketsStore, null, 2)
    } else {
      // CSV format
      const headers = Object.keys(ticketsStore[0]).join(",")
      const rows = ticketsStore.map((ticket) =>
        Object.values(ticket)
          .map((value) => (typeof value === "string" && value.includes(",") ? `"${value}"` : value))
          .join(","),
      )
      return [headers, ...rows].join("\n")
    }
  },

  import: (data: string, format: "csv" | "json"): Promise<boolean> => {
    try {
      if (format === "json") {
        const parsedData = JSON.parse(data) as Ticket[]
        ticketsStore = parsedData
        return Promise.resolve(true)
      } else {
        // CSV format
        const lines = data.split("\n")
        const headers = lines[0].split(",")

        const parsedData = lines.slice(1).map((line) => {
          const values = line.split(",")
          return headers.reduce((obj, header, index) => {
            let value = values[index]
            // Remove quotes if present
            if (value && value.startsWith('"') && value.endsWith('"')) {
              value = value.slice(1, -1)
            }
            return { ...obj, [header]: value }
          }, {}) as Ticket
        })

        ticketsStore = parsedData
        return Promise.resolve(true)
      }
    } catch (error) {
      console.error("Import error:", error)
      return Promise.resolve(false)
    }
  },

  reset: (): Promise<boolean> => {
    ticketsStore = [...initialTickets] // Assuming initialTickets is a backup of the original data
    return Promise.resolve(true)
  },
}


// Utility functions for file handling
export const fileUtils = {
  downloadFile: (content: string, fileName: string, contentType: string) => {
    const blob = new Blob([content], { type: contentType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  },

  readFile: (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          resolve(event.target.result as string)
        } else {
          reject(new Error("Failed to read file"))
        }
      }
      reader.onerror = () => {
        reject(new Error("File read error"))
      }
      reader.readAsText(file)
    })
  },
}

