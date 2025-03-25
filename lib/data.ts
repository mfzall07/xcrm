// Consolidated dummy data for the CRM application
// This file serves as a centralized data store for all components

// Types
export type Customer = {
  id: string
  name: string
  email: string
  company: string
  status: "Active" | "Inactive"
  lastOrder: string
  totalSpent: string
  phone: string
}

export type Lead = {
  id: string
  name: string
  email: string
  company: string
  status: string
  value: string
  date: string
}

export type Invoice = {
  id: string
  customer: string
  amount: string
  status: "Paid" | "Pending" | "Overdue"
  date: string
  dueDate: string
}

export type Activity = {
  id: number
  type: "message" | "call" | "email" | "meeting" | "payment" | "customer"
  user: {
    name: string
    avatar: string
  }
  content: string
  time: string
}

export type Task = {
  id: number
  title: string
  completed: boolean
  dueTime: string
  priority: "high" | "medium" | "low"
}

export type RevenueData = {
  name: string
  total: number
}

export type SalesData = {
  name: string
  value: number
}

export type CustomerGrowthData = {
  name: string
  customers: number
}

export type KanbanLead = {
  id: string
  title: string
  company: string
  contact: string
  value: string
  dueDate: string
  tags: string[]
  priority: string
}

export type Broadcast = {
  id: string
  title: string
  type: "Email" | "WhatsApp" | "SMS" | "Push"
  status: "Sent" | "Scheduled" | "Draft"
  date: string
  recipients: number
  openRate: number
  clickRate: number
}

export type Notification = {
  id: number
  type: "message" | "task" | "system"
  title: string
  description: string
  time: string
  read: boolean
  avatar: string | null
  initials: string | null
}

export type Testimonial = {
  name: string
  role: string
  company: string
  content: string
  avatar: string
}

export type Event = {
  id: string
  title: string
  start: string
  end: string
  allDay?: boolean
  description?: string
  location?: string
  attendees?: string[]
  category?: "meeting" | "call" | "task" | "personal" | "other"
  color?: string
}

export type Email = {
  id: number
  subject: string
  from: {
    name: string
    email: string
    avatar?: string
  }
  to: {
    name: string
    email: string
  }[]
  cc?: {
    name: string
    email: string
  }[]
  bcc?: {
    name: string
    email: string
  }[]
  body: string
  date: string
  read: boolean
  starred: boolean
  archived: boolean
  deleted: boolean
  folder: "inbox" | "sent" | "drafts"
  labels?: string[]
  attachments?: {
    name: string
    size: string
    type: string
    url: string
  }[]
}

export type Contact = {
  id: number
  name: string
  email: string
  avatar: string
  status: "online" | "away" | "offline"
  lastMessage: string
  lastMessageTime: string
  unread: number
  isGroup: boolean
}

export type Message = {
  id: number
  senderId: number // 0 is current user
  receiverId: number
  text: string
  timestamp: string
  read: boolean
  attachment?: {
    name: string
    size: string
    type: "image" | "document" | "video"
    url: string
  }
}

export type Ticket = {
  id: string;
  subject: string;
  description: string;
  customer: {
    name: string;
    email: string;
    avatar: string;
  };
  status: "Open" | "In Progress" | "Pending" | "Resolved";
  priority: "Critical" | "High" | "Medium" | "Low";
  assignedTo: {
    name: string;
    avatar: string;
  };
  lastUpdated: string;
  responseTime: string; // e.g., "2 hours ago"
}

// Data
export const customers: Customer[] = [
  {
    id: "CUST-1001",
    name: "John Smith",
    email: "john.smith@example.com",
    company: "Acme Inc",
    status: "Active",
    lastOrder: "2023-03-15",
    totalSpent: "$12,500",
    phone: "+1 (555) 123-4567",
  },
  {
    id: "CUST-1002",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    company: "Globex Corp",
    status: "Active",
    lastOrder: "2023-03-12",
    totalSpent: "$8,200",
    phone: "+1 (555) 234-5678",
  },
  {
    id: "CUST-1003",
    name: "Michael Brown",
    email: "m.brown@example.com",
    company: "Initech",
    status: "Inactive",
    lastOrder: "2023-02-28",
    totalSpent: "$5,750",
    phone: "+1 (555) 345-6789",
  },
  {
    id: "CUST-1004",
    name: "Emily Davis",
    email: "emily.d@example.com",
    company: "Umbrella Corp",
    status: "Active",
    lastOrder: "2023-03-10",
    totalSpent: "$15,300",
    phone: "+1 (555) 456-7890",
  },
  {
    id: "CUST-1005",
    name: "Robert Wilson",
    email: "r.wilson@example.com",
    company: "Stark Industries",
    status: "Active",
    lastOrder: "2023-03-05",
    totalSpent: "$9,800",
    phone: "+1 (555) 567-8901",
  },
  {
    id: "CUST-1006",
    name: "Jennifer Lee",
    email: "j.lee@example.com",
    company: "Wayne Enterprises",
    status: "Inactive",
    lastOrder: "2023-02-15",
    totalSpent: "$3,200",
    phone: "+1 (555) 678-9012",
  },
  {
    id: "CUST-1007",
    name: "David Miller",
    email: "d.miller@example.com",
    company: "Cyberdyne Systems",
    status: "Active",
    lastOrder: "2023-03-08",
    totalSpent: "$7,500",
    phone: "+1 (555) 789-0123",
  },
  {
    id: "CUST-1008",
    name: "Lisa Anderson",
    email: "l.anderson@example.com",
    company: "Oscorp",
    status: "Active",
    lastOrder: "2023-03-01",
    totalSpent: "$11,200",
    phone: "+1 (555) 890-1234",
  },
]

export const leads: Lead[] = [
  {
    id: "LEAD-1234",
    name: "John Smith",
    email: "john.smith@example.com",
    company: "Acme Inc",
    status: "New",
    value: "$5,000",
    date: "2023-03-22",
  },
  {
    id: "LEAD-1235",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    company: "Globex Corp",
    status: "Contacted",
    value: "$12,000",
    date: "2023-03-21",
  },
  {
    id: "LEAD-1236",
    name: "Michael Brown",
    email: "m.brown@example.com",
    company: "Initech",
    status: "Qualified",
    value: "$8,500",
    date: "2023-03-20",
  },
  {
    id: "LEAD-1237",
    name: "Emily Davis",
    email: "emily.d@example.com",
    company: "Umbrella Corp",
    status: "Negotiation",
    value: "$15,000",
    date: "2023-03-19",
  },
  {
    id: "LEAD-1238",
    name: "Robert Wilson",
    email: "r.wilson@example.com",
    company: "Stark Industries",
    status: "New",
    value: "$7,200",
    date: "2023-03-18",
  },
]

export const invoices: Invoice[] = [
  {
    id: "INV-001",
    customer: "Acme Inc",
    amount: "$1,250.00",
    status: "Paid",
    date: "2023-03-15",
    dueDate: "2023-04-15",
  },
  {
    id: "INV-002",
    customer: "Globex Corp",
    amount: "$3,200.00",
    status: "Pending",
    date: "2023-03-18",
    dueDate: "2023-04-18",
  },
  {
    id: "INV-003",
    customer: "Stark Industries",
    amount: "$4,500.00",
    status: "Overdue",
    date: "2023-02-28",
    dueDate: "2023-03-28",
  },
  {
    id: "INV-004",
    customer: "Wayne Enterprises",
    amount: "$2,800.00",
    status: "Paid",
    date: "2023-03-10",
    dueDate: "2023-04-10",
  },
  {
    id: "INV-005",
    customer: "Umbrella Corp",
    amount: "$1,800.00",
    status: "Pending",
    date: "2023-03-20",
    dueDate: "2023-04-20",
  },
  {
    id: "INV-006",
    customer: "Cyberdyne Systems",
    amount: "$5,200.00",
    status: "Paid",
    date: "2023-03-05",
    dueDate: "2023-04-05",
  },
  {
    id: "INV-007",
    customer: "Initech",
    amount: "$950.00",
    status: "Overdue",
    date: "2023-02-15",
    dueDate: "2023-03-15",
  },
  {
    id: "INV-008",
    customer: "Massive Dynamic",
    amount: "$3,750.00",
    status: "Pending",
    date: "2023-03-22",
    dueDate: "2023-04-22",
  },
]

export const activities: Activity[] = [
  {
    id: 1,
    type: "message",
    user: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    content: "Sent a message to Sarah Johnson",
    time: "5 minutes ago",
  },
  {
    id: 2,
    type: "call",
    user: {
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    content: "Made a call to Michael Brown",
    time: "1 hour ago",
  },
  {
    id: 3,
    type: "email",
    user: {
      name: "Robert Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    content: "Sent an email to Acme Inc",
    time: "3 hours ago",
  },
  {
    id: 4,
    type: "meeting",
    user: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    content: "Scheduled a meeting with Globex Corp",
    time: "Yesterday",
  },
  {
    id: 5,
    type: "payment",
    user: {
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    content: "Received payment from Initech",
    time: "Yesterday",
  },
  {
    id: 6,
    type: "customer",
    user: {
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    content: "Added a new customer: Umbrella Corp",
    time: "2 days ago",
  },
]

export const tasks: Task[] = [
  {
    id: 1,
    title: "Follow up with Acme Inc about proposal",
    completed: false,
    dueTime: "11:00 AM",
    priority: "high",
  },
  {
    id: 2,
    title: "Prepare presentation for team meeting",
    completed: false,
    dueTime: "2:30 PM",
    priority: "medium",
  },
  {
    id: 3,
    title: "Review Q2 sales forecast",
    completed: false,
    dueTime: "4:00 PM",
    priority: "medium",
  },
  {
    id: 4,
    title: "Call with marketing team",
    completed: true,
    dueTime: "10:00 AM",
    priority: "low",
  },
  {
    id: 5,
    title: "Send invoice to Globex Corp",
    completed: false,
    dueTime: "5:00 PM",
    priority: "high",
  },
]

export const revenueData: RevenueData[] = [
  { name: "Jan", total: 2400 },
  { name: "Feb", total: 1398 },
  { name: "Mar", total: 9800 },
  { name: "Apr", total: 3908 },
  { name: "May", total: 4800 },
  { name: "Jun", total: 3800 },
  { name: "Jul", total: 4300 },
  { name: "Aug", total: 5300 },
  { name: "Sep", total: 4900 },
  { name: "Oct", total: 6300 },
  { name: "Nov", total: 5400 },
  { name: "Dec", total: 6200 },
]

export const salesData: SalesData[] = [
  { name: "Direct", value: 400 },
  { name: "Social", value: 300 },
  { name: "Email", value: 200 },
  { name: "Other", value: 100 },
]

export const customerGrowthData: CustomerGrowthData[] = [
  { name: "Jan", customers: 1200 },
  { name: "Feb", customers: 1350 },
  { name: "Mar", customers: 1500 },
  { name: "Apr", customers: 1650 },
  { name: "May", customers: 1800 },
  { name: "Jun", customers: 1950 },
  { name: "Jul", customers: 2100 },
  { name: "Aug", customers: 2250 },
  { name: "Sep", customers: 2400 },
  { name: "Oct", customers: 2550 },
  { name: "Nov", customers: 2700 },
  { name: "Dec", customers: 2850 },
]

export const kanbanLeads: Record<string, KanbanLead[]> = {
  new: [
    {
      id: "lead-1",
      title: "Website redesign project",
      company: "Acme Inc",
      contact: "John Smith",
      value: "$8,500",
      dueDate: "2023-04-15",
      tags: ["Design", "Web"],
      priority: "High",
    },
    {
      id: "lead-2",
      title: "Marketing automation setup",
      company: "Globex Corp",
      contact: "Sarah Johnson",
      value: "$12,000",
      dueDate: "2023-04-20",
      tags: ["Marketing", "Automation"],
      priority: "Medium",
    },
    {
      id: "lead-3",
      title: "CRM implementation",
      company: "Stark Industries",
      contact: "Tony Stark",
      value: "$25,000",
      dueDate: "2023-05-01",
      tags: ["CRM", "Integration"],
      priority: "High",
    },
  ],
  contacted: [
    {
      id: "lead-4",
      title: "E-commerce platform migration",
      company: "Wayne Enterprises",
      contact: "Bruce Wayne",
      value: "$15,000",
      dueDate: "2023-04-25",
      tags: ["E-commerce", "Migration"],
      priority: "Medium",
    },
    {
      id: "lead-5",
      title: "Social media campaign",
      company: "Daily Planet",
      contact: "Clark Kent",
      value: "$5,000",
      dueDate: "2023-04-10",
      tags: ["Social", "Marketing"],
      priority: "Low",
    },
  ],
  qualified: [
    {
      id: "lead-6",
      title: "Mobile app development",
      company: "Oscorp",
      contact: "Norman Osborn",
      value: "$35,000",
      dueDate: "2023-05-15",
      tags: ["Mobile", "Development"],
      priority: "High",
    },
    {
      id: "lead-7",
      title: "Data analytics dashboard",
      company: "Umbrella Corp",
      contact: "Albert Wesker",
      value: "$18,000",
      dueDate: "2023-04-30",
      tags: ["Analytics", "Dashboard"],
      priority: "Medium",
    },
  ],
  proposal: [
    {
      id: "lead-8",
      title: "Cloud migration project",
      company: "Cyberdyne Systems",
      contact: "Miles Dyson",
      value: "$45,000",
      dueDate: "2023-05-10",
      tags: ["Cloud", "Migration"],
      priority: "High",
    },
  ],
  negotiation: [
    {
      id: "lead-9",
      title: "Enterprise security audit",
      company: "Massive Dynamic",
      contact: "Walter Bishop",
      value: "$22,000",
      dueDate: "2023-04-28",
      tags: ["Security", "Audit"],
      priority: "High",
    },
  ],
}

export const broadcasts: Broadcast[] = [
  {
    id: "BC-001",
    title: "Monthly Newsletter",
    type: "Email",
    status: "Sent",
    date: "2023-03-15",
    recipients: 1250,
    openRate: 32,
    clickRate: 8,
  },
  {
    id: "BC-002",
    title: "Product Launch Announcement",
    type: "WhatsApp",
    status: "Sent",
    date: "2023-03-10",
    recipients: 850,
    openRate: 78,
    clickRate: 15,
  },
  {
    id: "BC-003",
    title: "Customer Satisfaction Survey",
    type: "SMS",
    status: "Scheduled",
    date: "2023-04-05",
    recipients: 1500,
    openRate: 0,
    clickRate: 0,
  },
  {
    id: "BC-004",
    title: "Holiday Promotion",
    type: "Email",
    status: "Draft",
    date: "",
    recipients: 2000,
    openRate: 0,
    clickRate: 0,
  },
  {
    id: "BC-005",
    title: "Webinar Invitation",
    type: "Email",
    status: "Sent",
    date: "2023-03-01",
    recipients: 500,
    openRate: 45,
    clickRate: 22,
  },
  {
    id: "BC-006",
    title: "Service Outage Notification",
    type: "SMS",
    status: "Sent",
    date: "2023-03-18",
    recipients: 1800,
    openRate: 92,
    clickRate: 0,
  },
  {
    id: "BC-007",
    title: "New Feature Announcement",
    type: "Push",
    status: "Scheduled",
    date: "2023-04-10",
    recipients: 3500,
    openRate: 0,
    clickRate: 0,
  },
]

export const notifications: Notification[] = [
  {
    id: 1,
    type: "message",
    title: "New message from Sarah Johnson",
    description: "Hi there! Just following up on our meeting yesterday...",
    time: "5 minutes ago",
    read: false,
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "SJ",
  },
  {
    id: 2,
    type: "task",
    title: "Task reminder: Call with Acme Inc",
    description: "Your scheduled call starts in 30 minutes",
    time: "25 minutes ago",
    read: false,
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "AI",
  },
  {
    id: 3,
    type: "system",
    title: "System update completed",
    description: "The system has been updated to version 2.3.0",
    time: "1 hour ago",
    read: true,
    avatar: null,
    initials: null,
  },
  {
    id: 4,
    type: "message",
    title: "New message from Michael Brown",
    description: "Can we discuss the project timeline?",
    time: "3 hours ago",
    read: true,
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "MB",
  },
  {
    id: 5,
    type: "task",
    title: "New lead assigned to you",
    description: "Globex Corp has been assigned to you",
    time: "5 hours ago",
    read: true,
    avatar: null,
    initials: null,
  },
]

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "CEO",
    company: "Acme Inc",
    content:
      "This CRM has transformed how we manage our customer relationships. The lead management system has increased our conversion rates by 35%.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Michael Brown",
    role: "Sales Director",
    company: "Globex Corp",
    content:
      "The invoicing system is seamless and has saved our accounting team countless hours. The dashboard gives me all the insights I need at a glance.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Emily Davis",
    role: "Marketing Manager",
    company: "Stark Industries",
    content:
      "The broadcasting feature has revolutionized our marketing efforts. We can now reach our customers through multiple channels with just a few clicks.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Robert Chen",
    role: "CTO",
    company: "Future Tech",
    content:
      "The API integrations and customization options are exactly what we needed. Our development team was able to extend the CRM to fit our specific workflows.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Sophia Rodriguez",
    role: "Customer Success Manager",
    company: "Innovate Solutions",
    content:
      "The customer support is exceptional. Any issues we've had were resolved quickly, and the team is always open to feature suggestions.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "James Wilson",
    role: "Operations Director",
    company: "Global Dynamics",
    content:
      "This platform has streamlined our entire customer lifecycle, from lead generation to support. It's been a game-changer for our business.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

// Calendar events data
export const events: Event[] = [
  {
    id: "EVT-001",
    title: "Team Meeting",
    start: "2023-03-15T10:00:00",
    end: "2023-03-15T11:30:00",
    description: "Weekly team sync to discuss project progress",
    location: "Conference Room A",
    attendees: ["John Smith", "Sarah Johnson", "Michael Brown"],
    category: "meeting",
    color: "#4f46e5", // indigo
  },
  {
    id: "EVT-002",
    title: "Client Call - Acme Inc",
    start: "2023-03-16T14:00:00",
    end: "2023-03-16T15:00:00",
    description: "Discuss new project requirements",
    location: "Zoom",
    attendees: ["John Smith", "Robert Wilson"],
    category: "call",
    color: "#0ea5e9", // sky
  },
  {
    id: "EVT-003",
    title: "Product Demo",
    start: "2023-03-17T11:00:00",
    end: "2023-03-17T12:30:00",
    description: "Showcase new features to Globex Corp",
    location: "Demo Room",
    attendees: ["Emily Davis", "Sarah Johnson"],
    category: "meeting",
    color: "#4f46e5", // indigo
  },
  {
    id: "EVT-004",
    title: "Quarterly Planning",
    start: "2023-03-20T09:00:00",
    end: "2023-03-20T17:00:00",
    description: "Full day planning session for Q2",
    location: "Offsite",
    attendees: ["John Smith", "Sarah Johnson", "Michael Brown", "Emily Davis", "Robert Wilson"],
    category: "meeting",
    color: "#4f46e5", // indigo
  },
  {
    id: "EVT-005",
    title: "Lunch with Sarah",
    start: "2023-03-18T12:00:00",
    end: "2023-03-18T13:30:00",
    description: "Discuss career development",
    location: "Cafe Bistro",
    category: "personal",
    color: "#10b981", // emerald
  },
  {
    id: "EVT-006",
    title: "Project Deadline",
    start: "2023-03-24T00:00:00",
    end: "2023-03-24T23:59:59",
    allDay: true,
    description: "Website redesign project due",
    category: "task",
    color: "#ef4444", // red
  },
  {
    id: "EVT-007",
    title: "Marketing Campaign Review",
    start: "2023-03-22T15:00:00",
    end: "2023-03-22T16:30:00",
    description: "Review Q1 campaign results",
    location: "Marketing Department",
    attendees: ["Emily Davis", "Robert Wilson"],
    category: "meeting",
    color: "#4f46e5", // indigo
  },
  {
    id: "EVT-008",
    title: "Sales Training",
    start: "2023-03-23T09:00:00",
    end: "2023-03-23T12:00:00",
    description: "New product training for sales team",
    location: "Training Room B",
    category: "task",
    color: "#f59e0b", // amber
  },
]

// Email data
export const emails: Email[] = [
  {
    id: 1,
    subject: "Project Proposal: Website Redesign",
    from: {
      name: "John Smith",
      email: "john.smith@acmeinc.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    to: [
      {
        name: "You",
        email: "you@company.com",
      },
    ],
    body: `<p>Hi there,</p>
<p>I'm reaching out to discuss the website redesign project we talked about last week. I've attached our proposal with the scope, timeline, and cost estimates.</p>
<p>Key points:</p>
<ul>
  <li>Complete redesign of the homepage and product pages</li>
  <li>New responsive framework for better mobile experience</li>
  <li>Integration with your existing CRM</li>
  <li>SEO optimization throughout</li>
</ul>
<p>Let me know if you have any questions or would like to schedule a call to discuss further.</p>
<p>Best regards,<br>John Smith<br>Acme Inc</p>`,
    date: "2023-03-22T09:30:00",
    read: false,
    starred: false,
    archived: false,
    deleted: false,
    folder: "inbox",
    labels: ["work", "important"],
    attachments: [
      {
        name: "Website_Redesign_Proposal.pdf",
        size: "2.4 MB",
        type: "application/pdf",
        url: "#",
      },
    ],
  },
  {
    id: 2,
    subject: "Team Meeting - Agenda for Tomorrow",
    from: {
      name: "Sarah Johnson",
      email: "sarah.j@company.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    to: [
      {
        name: "You",
        email: "you@company.com",
      },
      {
        name: "Team",
        email: "team@company.com",
      },
    ],
    body: `<p>Hello everyone,</p>
<p>Here's the agenda for our team meeting tomorrow at 10:00 AM:</p>
<ol>
  <li>Project status updates (15 min)</li>
  <li>Q2 goals discussion (20 min)</li>
  <li>New client onboarding process (15 min)</li>
  <li>Open floor for questions (10 min)</li>
</ol>
<p>Please come prepared with your project updates and any questions you might have.</p>
<p>Best,<br>Sarah</p>`,
    date: "2023-03-21T16:45:00",
    read: true,
    starred: true,
    archived: false,
    deleted: false,
    folder: "inbox",
    labels: ["work", "team"],
  },
  {
    id: 3,
    subject: "Invoice #INV-2023-0042",
    from: {
      name: "Billing Department",
      email: "billing@globexcorp.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    to: [
      {
        name: "You",
        email: "you@company.com",
      },
    ],
    body: `<p>Dear Valued Customer,</p>
<p>Please find attached your invoice #INV-2023-0042 for services rendered in February 2023.</p>
<p>Amount due: $3,450.00<br>Due date: April 1, 2023</p>
<p>Payment methods:</p>
<ul>
  <li>Credit Card</li>
  <li>Bank Transfer</li>
  <li>Check</li>
</ul>
<p>If you have any questions about this invoice, please contact our billing department.</p>
<p>Thank you for your business!</p>
<p>Regards,<br>Billing Department<br>Globex Corporation</p>`,
    date: "2023-03-20T10:15:00",
    read: true,
    starred: false,
    archived: false,
    deleted: false,
    folder: "inbox",
    labels: ["finance"],
    attachments: [
      {
        name: "Invoice_2023_0042.pdf",
        size: "1.2 MB",
        type: "application/pdf",
        url: "#",
      },
    ],
  },
  {
    id: 4,
    subject: "Product Update: New Features Released",
    from: {
      name: "Product Team",
      email: "product@saasplatform.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    to: [
      {
        name: "You",
        email: "you@company.com",
      },
    ],
    body: `<p>Hello,</p>
<p>We're excited to announce the release of several new features to our platform:</p>
<ul>
  <li><strong>Advanced Analytics Dashboard</strong> - Get deeper insights into your data</li>
  <li><strong>Team Collaboration Tools</strong> - Work better together with improved sharing and commenting</li>
  <li><strong>Mobile App Enhancements</strong> - Enjoy a smoother experience on all your devices</li>
</ul>
<p>Check out our <a href="#">blog post</a> for more details about these updates.</p>
<p>The Product Team</p>`,
    date: "2023-03-19T14:20:00",
    read: true,
    starred: false,
    archived: false,
    deleted: false,
    folder: "inbox",
    labels: ["updates"],
  },
  {
    id: 5,
    subject: "Follow-up: Marketing Strategy Meeting",
    from: {
      name: "Emily Davis",
      email: "emily.d@company.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    to: [
      {
        name: "You",
        email: "you@company.com",
      },
    ],
    cc: [
      {
        name: "Marketing Team",
        email: "marketing@company.com",
      },
    ],
    body: `<p>Hi there,</p>
<p>Thank you for your input during our marketing strategy meeting yesterday. I've compiled the key action items we discussed:</p>
<ol>
  <li>Revise the social media calendar for Q2 (Owner: Alex)</li>
  <li>Finalize the email campaign for the product launch (Owner: You)</li>
  <li>Research new content marketing opportunities (Owner: Me)</li>
  <li>Schedule a follow-up meeting for next week (Owner: Jordan)</li>
</ol>
<p>I've attached the presentation slides for your reference.</p>
<p>Best,<br>Emily</p>`,
    date: "2023-03-18T11:05:00",
    read: true,
    starred: true,
    archived: false,
    deleted: false,
    folder: "inbox",
    labels: ["work", "marketing"],
    attachments: [
      {
        name: "Marketing_Strategy_Slides.pptx",
        size: "5.8 MB",
        type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        url: "#",
      },
    ],
  },
  {
    id: 6,
    subject: "Your Monthly Subscription",
    from: {
      name: "Subscription Services",
      email: "no-reply@subscriptionservice.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    to: [
      {
        name: "You",
        email: "you@company.com",
      },
    ],
    body: `<p>Dear Subscriber,</p>
<p>This is a confirmation that your monthly subscription has been renewed. Your account has been charged $49.99 for the Premium Plan.</p>
<p>Subscription period: March 15, 2023 - April 14, 2023</p>
<p>You can view your billing history and manage your subscription in your <a href="#">account settings</a>.</p>
<p>Thank you for your continued support!</p>
<p>The Subscription Team</p>`,
    date: "2023-03-15T08:30:00",
    read: true,
    starred: false,
    archived: false,
    deleted: false,
    folder: "inbox",
    labels: ["finance"],
  },
  {
    id: 7,
    subject: "Quarterly Business Review",
    from: {
      name: "Robert Wilson",
      email: "r.wilson@company.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    to: [
      {
        name: "You",
        email: "you@company.com",
      },
    ],
    cc: [
      {
        name: "Executive Team",
        email: "exec@company.com",
      },
    ],
    body: `<p>Hello,</p>
<p>I'd like to schedule our Quarterly Business Review for the first week of April. Please let me know your availability.</p>
<p>During this meeting, we'll cover:</p>
<ul>
  <li>Q1 performance review</li>
  <li>Budget allocation for Q2</li>
  <li>Strategic initiatives update</li>
  <li>Team performance and resource planning</li>
</ul>
<p>Please come prepared with your department's key metrics and achievements.</p>
<p>Regards,<br>Robert</p>`,
    date: "2023-03-14T15:45:00",
    read: true,
    starred: true,
    archived: false,
    deleted: false,
    folder: "inbox",
    labels: ["work", "important"],
  },
  {
    id: 8,
    subject: "Project Status Update: CRM Implementation",
    from: {
      name: "Michael Brown",
      email: "m.brown@techpartners.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    to: [
      {
        name: "You",
        email: "you@company.com",
      },
    ],
    body: `<p>Hi,</p>
<p>I wanted to provide you with an update on the CRM implementation project:</p>
<ul>
  <li><strong>Data Migration:</strong> 75% complete</li>
  <li><strong>User Training:</strong> Scheduled for next week</li>
  <li><strong>Custom Integrations:</strong> 90% complete</li>
  <li><strong>Testing:</strong> In progress</li>
</ul>
<p>We're still on track for the April 15th go-live date. I've attached the detailed project report for your review.</p>
<p>Let me know if you have any questions or concerns.</p>
<p>Best regards,<br>Michael</p>`,
    date: "2023-03-13T13:20:00",
    read: true,
    starred: false,
    archived: false,
    deleted: false,
    folder: "inbox",
    labels: ["work", "projects"],
    attachments: [
      {
        name: "CRM_Project_Report.pdf",
        size: "3.7 MB",
        type: "application/pdf",
        url: "#",
      },
    ],
  },
  {
    id: 9,
    subject: "Re: Client Feedback on Proposal",
    from: {
      name: "Lisa Anderson",
      email: "l.anderson@company.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    to: [
      {
        name: "You",
        email: "you@company.com",
      },
    ],
    body: `<p>Hi there,</p>
<p>I just got off the phone with the client regarding our proposal. They're generally positive about it but have a few requests for modifications:</p>
<ol>
  <li>They'd like more detail on the implementation timeline</li>
  <li>They've asked for additional case studies in their industry</li>
  <li>They want to discuss the pricing structure for ongoing support</li>
</ol>
<p>Can we meet tomorrow to discuss these points before I respond to them?</p>
<p>Thanks,<br>Lisa</p>`,
    date: "2023-03-10T16:30:00",
    read: true,
    starred: false,
    archived: false,
    deleted: false,
    folder: "inbox",
    labels: ["work", "clients"],
  },
  {
    id: 10,
    subject: "Your Flight Confirmation",
    from: {
      name: "Travel Bookings",
      email: "bookings@travelservice.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    to: [
      {
        name: "You",
        email: "you@company.com",
      },
    ],
    body: `<p>Dear Traveler,</p>
<p>Your flight has been confirmed. Here are your trip details:</p>
<p><strong>Outbound Flight:</strong> AA1234<br>
<strong>Date:</strong> April 10, 2023<br>
<strong>Departure:</strong> New York (JFK) at 10:30 AM<br>
<strong>Arrival:</strong> San Francisco (SFO) at 1:45 PM</p>
<p><strong>Return Flight:</strong> AA5678<br>
<strong>Date:</strong> April 15, 2023<br>
<strong>Departure:</strong> San Francisco (SFO) at 2:30 PM<br>
<strong>Arrival:</strong> New York (JFK) at 11:00 PM</p>
<p>Your e-ticket is attached to this email. Please check in online 24 hours before your flight.</p>
<p>Have a great trip!</p>
<p>Travel Bookings Team</p>`,
    date: "2023-03-05T09:15:00",
    read: true,
    starred: true,
    archived: false,
    deleted: false,
    folder: "inbox",
    labels: ["travel"],
    attachments: [
      {
        name: "E-Ticket.pdf",
        size: "1.1 MB",
        type: "application/pdf",
        url: "#",
      },
    ],
  },
  {
    id: 11,
    subject: "Weekly Team Update",
    from: {
      name: "You",
      email: "you@company.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    to: [
      {
        name: "Team",
        email: "team@company.com",
      },
    ],
    body: `<p>Hi Team,</p>
<p>Here's a summary of our progress this week:</p>
<ul>
  <li>Completed the client presentation for Acme Inc</li>
  <li>Launched the new marketing campaign</li>
  <li>Fixed the critical bug in the reporting module</li>
  <li>Started planning for the Q2 product roadmap</li>
</ul>
<p>Next week's priorities:</p>
<ul>
  <li>Finalize the Q1 performance reports</li>
  <li>Begin user testing for the new feature</li>
  <li>Schedule client meetings for the upcoming project</li>
</ul>
<p>Great work everyone!</p>
<p>Best regards,<br>Your Name</p>`,
    date: "2023-03-17T17:00:00",
    read: true,
    starred: false,
    archived: false,
    deleted: false,
    folder: "sent",
    labels: ["work", "team"],
  },
  {
    id: 12,
    subject: "Draft: Proposal for New Project",
    from: {
      name: "You",
      email: "you@company.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    to: [
      {
        name: "",
        email: "",
      },
    ],
    body: `<p>Project Proposal: [Client Name]</p>
<p>Introduction:</p>
<ul>
  <li>Background information</li>
  <li>Project objectives</li>
  <li>Expected outcomes</li>
</ul>
<p>Scope of Work:</p>
<ul>
  <li>Phase 1: Research and Discovery</li>
  <li>Phase 2: Design and Development</li>
  <li>Phase 3: Testing and Implementation</li>
  <li>Phase 4: Evaluation and Refinement</li>
</ul>
<p>Timeline and Milestones:</p>
<p>Budget:</p>
<p>Team and Resources:</p>
<p>[Need to complete the rest of the proposal]</p>`,
    date: "2023-03-16T11:30:00",
    read: true,
    starred: false,
    archived: false,
    deleted: false,
    folder: "drafts",
    labels: ["work"],
  },
]

export const contacts: Contact[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastMessage: "Can we discuss the project timeline?",
    lastMessageTime: "10:30 AM",
    unread: 2,
    isGroup: false,
  },
  {
    id: 2,
    name: "Michael Brown",
    email: "m.brown@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "away",
    lastMessage: "I've sent you the report",
    lastMessageTime: "Yesterday",
    unread: 0,
    isGroup: false,
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "emily.d@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    lastMessage: "Let's schedule a meeting",
    lastMessageTime: "Mar 20",
    unread: 0,
    isGroup: false,
  },
  {
    id: 4,
    name: "Marketing Team",
    email: "marketing@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastMessage: "Emily: We need to finalize the campaign",
    lastMessageTime: "12:45 PM",
    unread: 5,
    isGroup: true,
  },
  {
    id: 5,
    name: "Robert Wilson",
    email: "r.wilson@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastMessage: "How's the presentation coming along?",
    lastMessageTime: "2:15 PM",
    unread: 0,
    isGroup: false,
  },
]

export const messages: Record<number, Message[]> = {
  1: [
    {
      id: 1,
      senderId: 1,
      receiverId: 0,
      text: "Hi there! How's the project coming along?",
      timestamp: "2023-03-22T10:15:00",
      read: true,
    },
    {
      id: 2,
      senderId: 0,
      receiverId: 1,
      text: "It's going well! We're on track to finish by the end of the week.",
      timestamp: "2023-03-22T10:18:00",
      read: true,
    },
    {
      id: 3,
      senderId: 1,
      receiverId: 0,
      text: "That's great to hear! Do you need any additional resources?",
      timestamp: "2023-03-22T10:22:00",
      read: true,
    },
    {
      id: 4,
      senderId: 0,
      receiverId: 1,
      text: "I think we're good for now. I'll let you know if anything changes.",
      timestamp: "2023-03-22T10:25:00",
      read: true,
    },
    {
      id: 5,
      senderId: 1,
      receiverId: 0,
      text: "Perfect. Can we schedule a quick review meeting tomorrow?",
      timestamp: "2023-03-22T10:28:00",
      read: false,
    },
    {
      id: 6,
      senderId: 1,
      receiverId: 0,
      text: "I've also attached the latest requirements document for your reference.",
      timestamp: "2023-03-22T10:30:00",
      read: false,
      attachment: {
        name: "Requirements_v2.pdf",
        size: "2.4 MB",
        type: "document",
        url: "#",
      },
    },
  ],
  2: [
    {
      id: 7,
      senderId: 2,
      receiverId: 0,
      text: "I've sent you the quarterly report. Let me know if you have any questions.",
      timestamp: "2023-03-21T14:10:00",
      read: true,
      attachment: {
        name: "Q1_Report.pdf",
        size: "3.8 MB",
        type: "document",
        url: "#",
      },
    },
    {
      id: 8,
      senderId: 0,
      receiverId: 2,
      text: "Thanks, Michael! I'll review it today.",
      timestamp: "2023-03-21T14:15:00",
      read: true,
    },
    {
      id: 9,
      senderId: 2,
      receiverId: 0,
      text: "Great. We should discuss the findings in our next meeting.",
      timestamp: "2023-03-21T14:20:00",
      read: true,
    },
  ],
  3: [
    {
      id: 10,
      senderId: 3,
      receiverId: 0,
      text: "Hi! Are you available for a meeting next Tuesday to discuss the marketing strategy?",
      timestamp: "2023-03-20T09:30:00",
      read: true,
    },
    {
      id: 11,
      senderId: 0,
      receiverId: 3,
      text: "Tuesday works for me. How about 2 PM?",
      timestamp: "2023-03-20T09:45:00",
      read: true,
    },
    {
      id: 12,
      senderId: 3,
      receiverId: 0,
      text: "Perfect! I'll send a calendar invite.",
      timestamp: "2023-03-20T09:50:00",
      read: true,
    },
  ],
  4: [
    {
      id: 13,
      senderId: 4,
      receiverId: 0,
      text: "Team, we need to finalize the social media campaign for the product launch.",
      timestamp: "2023-03-22T12:30:00",
      read: true,
    },
    {
      id: 14,
      senderId: 0,
      receiverId: 4,
      text: "I've prepared a draft of the posts. I'll share them this afternoon.",
      timestamp: "2023-03-22T12:35:00",
      read: true,
    },
    {
      id: 15,
      senderId: 3,
      receiverId: 4,
      text: "We need to finalize the campaign by Friday. Can everyone review the materials by tomorrow?",
      timestamp: "2023-03-22T12:40:00",
      read: true,
    },
    {
      id: 16,
      senderId: 2,
      receiverId: 4,
      text: "I'll have my feedback ready by tomorrow morning.",
      timestamp: "2023-03-22T12:42:00",
      read: true,
    },
    {
      id: 17,
      senderId: 1,
      receiverId: 4,
      text: "I've also prepared some graphics for the campaign. Attaching them here.",
      timestamp: "2023-03-22T12:45:00",
      read: false,
      attachment: {
        name: "Campaign_Graphics.zip",
        size: "15.2 MB",
        type: "document",
        url: "#",
      },
    },
  ],
  5: [
    {
      id: 18,
      senderId: 5,
      receiverId: 0,
      text: "How's the presentation coming along for the client meeting?",
      timestamp: "2023-03-22T14:15:00",
      read: true,
    },
    {
      id: 19,
      senderId: 0,
      receiverId: 5,
      text: "I'm working on it now. Should be done by EOD.",
      timestamp: "2023-03-22T14:20:00",
      read: true,
    },
    {
      id: 20,
      senderId: 5,
      receiverId: 0,
      text: "Great! Let me know if you need any input from my side.",
      timestamp: "2023-03-22T14:25:00",
      read: true,
    },
  ],
}


export const tickets: Ticket[] = [
  {
    id: "TICKET-1001",
    subject: "Login issues",
    description: "User is unable to log in to the system after password reset.",
    customer: {
      name: "John Smith",
      email: "john.smith@example.com",
      avatar: "https://example.com/avatars/john_smith.jpg"
    },
    status: "Open",
    priority: "High",
    assignedTo: {
      name: "Alice Johnson",
      avatar: "https://example.com/avatars/alice_johnson.jpg"
    },
    lastUpdated: "2023-03-25",
    responseTime: "30 minutes ago"
  },
  {
    id: "TICKET-1002",
    subject: "Payment gateway failure",
    description: "Payment gateway API is returning errors when processing payments.",
    customer: {
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      avatar: "https://example.com/avatars/sarah_johnson.jpg"
    },
    status: "In Progress",
    priority: "Critical",
    assignedTo: {
      name: "Bob Lee",
      avatar: "https://example.com/avatars/bob_lee.jpg"
    },
    lastUpdated: "2023-03-24",
    responseTime: "1 hour ago"
  },
  {
    id: "TICKET-1003",
    subject: "Unable to reset password",
    description: "Customer is facing issues while trying to reset their password using the reset link.",
    customer: {
      name: "Michael Brown",
      email: "m.brown@example.com",
      avatar: "https://example.com/avatars/michael_brown.jpg"
    },
    status: "Pending",
    priority: "Medium",
    assignedTo: {
      name: "Charlie Nguyen",
      avatar: "https://example.com/avatars/charlie_nguyen.jpg"
    },
    lastUpdated: "2023-03-23",
    responseTime: "1 day ago"
  },
  {
    id: "TICKET-1004",
    subject: "Account verification issues",
    description: "User is unable to verify their email for account registration.",
    customer: {
      name: "Emily Davis",
      email: "emily.d@example.com",
      avatar: "https://example.com/avatars/emily_davis.jpg"
    },
    status: "Resolved",
    priority: "Low",
    assignedTo: {
      name: "David Zhang",
      avatar: "https://example.com/avatars/david_zhang.jpg"
    },
    lastUpdated: "2023-03-22",
    responseTime: "2 days ago"
  },
  {
    id: "TICKET-1005",
    subject: "Bug in dashboard view",
    description: "Graph on the dashboard is not loading data correctly in the UI.",
    customer: {
      name: "Robert Wilson",
      email: "r.wilson@example.com",
      avatar: "https://example.com/avatars/robert_wilson.jpg"
    },
    status: "Resolved",
    priority: "High",
    assignedTo: {
      name: "Eva Kim",
      avatar: "https://example.com/avatars/eva_kim.jpg"
    },
    lastUpdated: "2023-03-20",
    responseTime: "3 days ago"
  },
  {
    id: "TICKET-1006",
    subject: "Missing product from order",
    description: "A product was missing from the customer's order, need to investigate the shipping process.",
    customer: {
      name: "Jennifer Lee",
      email: "j.lee@example.com",
      avatar: "https://example.com/avatars/jennifer_lee.jpg"
    },
    status: "Open",
    priority: "Medium",
    assignedTo: {
      name: "Grace Parker",
      avatar: "https://example.com/avatars/grace_parker.jpg"
    },
    lastUpdated: "2023-03-25",
    responseTime: "20 minutes ago"
  },
  {
    id: "TICKET-1007",
    subject: "Feature request: Dark mode",
    description: "Customer is requesting a dark mode feature for the application.",
    customer: {
      name: "David Miller",
      email: "d.miller@example.com",
      avatar: "https://example.com/avatars/david_miller.jpg"
    },
    status: "Pending",
    priority: "Low",
    assignedTo: {
      name: "Jasmine Lee",
      avatar: "https://example.com/avatars/jasmine_lee.jpg"
    },
    lastUpdated: "2023-03-19",
    responseTime: "4 days ago"
  },
  {
    id: "TICKET-1008",
    subject: "Issue with subscription renewal",
    description: "Subscription failed to renew and customer was charged incorrectly.",
    customer: {
      name: "Lisa Anderson",
      email: "l.anderson@example.com",
      avatar: "https://example.com/avatars/lisa_anderson.jpg"
    },
    status: "Resolved",
    priority: "High",
    assignedTo: {
      name: "Tommy Zhao",
      avatar: "https://example.com/avatars/tommy_zhao.jpg"
    },
    lastUpdated: "2023-03-18",
    responseTime: "5 days ago"
  },
];

// Update the api object to include chat-related methods
export const api = {
    // Customer-related methods
    getCustomers: () => Promise.resolve(customers),
    getCustomer: (id: string) => Promise.resolve(customers.find((c) => c.id === id)),
    
    // Ticket-related methods
    getTickets: () => Promise.resolve(tickets),
    getTicket: (id: string) => Promise.resolve(tickets.find((t) => t.id === id)),
    getTicketsByStatus: (status: "Open" | "In Progress" | "Pending" | "Resolved") => 
      Promise.resolve(tickets.filter((t) => t.status === status)),
    getTicketsByPriority: (priority: "Critical" | "High" | "Medium" | "Low") => 
      Promise.resolve(tickets.filter((t) => t.priority === priority)),
    getTicketsByCustomer: (customerId: string) => 
      Promise.resolve(tickets.filter((t) => t.customer.email === customerId)),
    getTicketsByAssignedTo: (assignedToId: string) => 
      Promise.resolve(tickets.filter((t) => t.assignedTo.name === assignedToId)),
    getTicketsByDate: (date: string) => 
      Promise.resolve(tickets.filter((t) => t.lastUpdated === date)),
    getTicketResponseTime: (ticketId: string) => 
      Promise.resolve(tickets.find((t) => t.id === ticketId)?.responseTime),

    // Leads-related methods
    getLeads: () => Promise.resolve(leads),

    // Invoice-related methods
    getInvoices: () => Promise.resolve(invoices),

    // Activities-related methods
    getActivities: () => Promise.resolve(activities),

    // Task-related methods
    getTasks: () => Promise.resolve(tasks),

    // Revenue data-related methods
    getRevenueData: () => Promise.resolve(revenueData),

    // Sales data-related methods
    getSalesData: () => Promise.resolve(salesData),

    // Customer Growth data-related methods
    getCustomerGrowthData: () => Promise.resolve(customerGrowthData),

    // Kanban Leads-related methods
    getKanbanLeads: () => Promise.resolve(kanbanLeads),

    // Broadcasts-related methods
    getBroadcasts: () => Promise.resolve(broadcasts),

    // Notifications-related methods
    getNotifications: () => Promise.resolve(notifications),

    // Testimonials-related methods
    getTestimonials: () => Promise.resolve(testimonials),

    // Events-related methods
    getEvents: () => Promise.resolve(events),

    // Emails-related methods
    getEmails: (folder?: string) => {
      if (folder) {
        return Promise.resolve(
          emails.filter((email) => {
            if (folder === "starred") return email.starred && !email.deleted
            if (folder === "archived") return email.archived && !email.deleted
            if (folder === "trash") return email.deleted
            return email.folder === folder && !email.archived && !email.deleted
          }),
        )
      }
      return Promise.resolve(emails.filter((email) => !email.archived && !email.deleted && email.folder === "inbox"))
    },
    getEmail: (id: number) => Promise.resolve(emails.find((email) => email.id === id)),
    
    // Contact-related methods
    getContacts: () => Promise.resolve(contacts),

    // Messages-related methods
  getMessages: (contactId: number) => Promise.resolve(messages[contactId] || []),
}


