"use client"

import { useState } from "react"
import { User, Lock, Bell, Globe, Palette, Users, CreditCard, Building, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { LandingPageSettings } from "./landing-page-settings"

// Define types for settings
interface ProfileSettings {
  name: string
  email: string
  title: string
  phone: string
  bio: string
  avatar: string
}

interface AccountSettings {
  currentPassword: string
  newPassword: string
  confirmPassword: string
  twoFactorEnabled: boolean
  sessions: {
    id: string
    device: string
    lastActive: string
    ip: string
    current: boolean
  }[]
}

interface NotificationSettings {
  email: {
    newLeads: boolean
    customerMessages: boolean
    taskReminders: boolean
    marketingCampaigns: boolean
    systemUpdates: boolean
  }
  inApp: {
    newLeads: boolean
    customerMessages: boolean
    taskReminders: boolean
    teamMentions: boolean
  }
  quietHours: {
    start: string
    end: string
    days: string[]
  }
}

interface AppearanceSettings {
  theme: string
  density: string
  sidebarCollapsed: boolean
  animations: boolean
}

interface LanguageSettings {
  language: string
  timezone: string
  dateFormat: string
  currency: string
}

interface BillingSettings {
  plan: {
    name: string
    price: string
    billingDate: string
  }
  paymentMethods: {
    id: string
    type: string
    last4: string
    expiry: string
    default: boolean
  }[]
  invoices: {
    id: string
    date: string
    amount: string
    status: string
  }[]
}

interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  status: string
  avatar: string
}

interface TeamSettings {
  members: TeamMember[]
}

interface CompanySettings {
  name: string
  industry: string
  size: string
  website: string
  email: string
  phone: string
  address: string
  logo: string
  branding: {
    primaryColor: string
    secondaryColor: string
    emailSignature: string
  }
}

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const { toast } = useToast()

  // Profile state
  const [profile, setProfile] = useState<ProfileSettings>({
    name: "John Smith",
    email: "john.smith@example.com",
    title: "Product Manager",
    phone: "+1 (555) 123-4567",
    bio: "Product Manager with 5+ years of experience in SaaS products.",
    avatar: "/placeholder.svg?height=80&width=80",
  })

  // Account state
  const [account, setAccount] = useState<AccountSettings>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
    sessions: [
      {
        id: "session-1",
        device: "Chrome on Windows",
        lastActive: "2 minutes ago",
        ip: "192.168.1.1",
        current: true,
      },
      {
        id: "session-2",
        device: "Safari on macOS",
        lastActive: "2 days ago",
        ip: "192.168.1.2",
        current: false,
      },
      {
        id: "session-3",
        device: "Mobile App on iPhone",
        lastActive: "5 days ago",
        ip: "192.168.1.3",
        current: false,
      },
    ],
  })

  // Notifications state
  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: {
      newLeads: true,
      customerMessages: true,
      taskReminders: true,
      marketingCampaigns: false,
      systemUpdates: false,
    },
    inApp: {
      newLeads: true,
      customerMessages: true,
      taskReminders: true,
      teamMentions: true,
    },
    quietHours: {
      start: "22:00",
      end: "08:00",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
  })

  // Appearance state
  const [appearance, setAppearance] = useState<AppearanceSettings>({
    theme: "light",
    density: "comfortable",
    sidebarCollapsed: true,
    animations: true,
  })

  // Language state
  const [language, setLanguage] = useState<LanguageSettings>({
    language: "en",
    timezone: "utc-7",
    dateFormat: "mm-dd-yyyy",
    currency: "usd",
  })

  // Billing state
  const [billing, setBilling] = useState<BillingSettings>({
    plan: {
      name: "Professional Plan",
      price: "$79/month",
      billingDate: "May 15, 2023",
    },
    paymentMethods: [
      {
        id: "pm-1",
        type: "Visa",
        last4: "4242",
        expiry: "04/2025",
        default: true,
      },
      {
        id: "pm-2",
        type: "Mastercard",
        last4: "5555",
        expiry: "08/2024",
        default: false,
      },
    ],
    invoices: [
      {
        id: "INV-001",
        date: "April 15, 2023",
        amount: "$79.00",
        status: "Paid",
      },
      {
        id: "INV-002",
        date: "March 15, 2023",
        amount: "$79.00",
        status: "Paid",
      },
      {
        id: "INV-003",
        date: "February 15, 2023",
        amount: "$79.00",
        status: "Paid",
      },
    ],
  })

  // Team state
  const [team, setTeam] = useState<TeamSettings>({
    members: [
      {
        id: "member-1",
        name: "John Smith",
        email: "john.smith@example.com",
        role: "Admin",
        status: "Active",
        avatar: "",
      },
      {
        id: "member-2",
        name: "Sarah Johnson",
        email: "sarah.j@example.com",
        role: "Sales Manager",
        status: "Active",
        avatar: "",
      },
      {
        id: "member-3",
        name: "Michael Brown",
        email: "m.brown@example.com",
        role: "Support Agent",
        status: "Active",
        avatar: "",
      },
      {
        id: "member-4",
        name: "Emily Davis",
        email: "emily.d@example.com",
        role: "Marketing Specialist",
        status: "Active",
        avatar: "",
      },
      {
        id: "member-5",
        name: "Robert Wilson",
        email: "r.wilson@example.com",
        role: "Developer",
        status: "Invited",
        avatar: "",
      },
    ],
  })

  // Company state
  const [company, setCompany] = useState<CompanySettings>({
    name: "Acme Corporation",
    industry: "technology",
    size: "medium",
    website: "https://acme.com",
    email: "info@acme.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Suite 100\nSan Francisco, CA 94105\nUnited States",
    logo: "",
    branding: {
      primaryColor: "#3B82F6",
      secondaryColor: "#10B981",
      emailSignature:
        "Best regards,\nThe Acme Team\nAcme Corporation\n123 Main St, San Francisco, CA 94105\n+1 (555) 123-4567 | info@acme.com",
    },
  })

  // Handle profile update
  const handleProfileUpdate = (field: keyof ProfileSettings, value: string) => {
    setProfile({
      ...profile,
      [field]: value,
    })
  }

  // Handle account update
  const handleAccountUpdate = (field: keyof AccountSettings, value: any) => {
    setAccount({
      ...account,
      [field]: value,
    })
  }

  // Handle notification update
  const handleEmailNotificationUpdate = (field: keyof NotificationSettings["email"], value: boolean) => {
    setNotifications({
      ...notifications,
      email: {
        ...notifications.email,
        [field]: value,
      },
    })
  }

  const handleInAppNotificationUpdate = (field: keyof NotificationSettings["inApp"], value: boolean) => {
    setNotifications({
      ...notifications,
      inApp: {
        ...notifications.inApp,
        [field]: value,
      },
    })
  }

  const handleQuietHoursUpdate = (field: keyof NotificationSettings["quietHours"], value: any) => {
    setNotifications({
      ...notifications,
      quietHours: {
        ...notifications.quietHours,
        [field]: value,
      },
    })
  }

  // Handle appearance update
  const handleAppearanceUpdate = (field: keyof AppearanceSettings, value: any) => {
    setAppearance({
      ...appearance,
      [field]: value,
    })
  }

  // Handle language update
  const handleLanguageUpdate = (field: keyof LanguageSettings, value: string) => {
    setLanguage({
      ...language,
      [field]: value,
    })
  }

  // Handle billing update
  const handlePlanUpdate = (field: keyof BillingSettings["plan"], value: string) => {
    setBilling({
      ...billing,
      plan: {
        ...billing.plan,
        [field]: value,
      },
    })
  }

  const makePaymentMethodDefault = (id: string) => {
    setBilling({
      ...billing,
      paymentMethods: billing.paymentMethods.map((method) => ({
        ...method,
        default: method.id === id,
      })),
    })
  }

  // Handle team update
  const handleTeamMemberUpdate = (id: string, field: keyof TeamMember, value: string) => {
    setTeam({
      ...team,
      members: team.members.map((member) => (member.id === id ? { ...member, [field]: value } : member)),
    })
  }

  const addTeamMember = () => {
    const newId = `member-${team.members.length + 1}`
    setTeam({
      ...team,
      members: [
        ...team.members,
        {
          id: newId,
          name: "",
          email: "",
          role: "Member",
          status: "Invited",
          avatar: "",
        },
      ],
    })
  }

  const removeTeamMember = (id: string) => {
    setTeam({
      ...team,
      members: team.members.filter((member) => member.id !== id),
    })
  }

  // Handle company update
  const handleCompanyUpdate = (field: keyof CompanySettings, value: string) => {
    setCompany({
      ...company,
      [field]: value,
    })
  }

  const handleBrandingUpdate = (field: keyof CompanySettings["branding"], value: string) => {
    setCompany({
      ...company,
      branding: {
        ...company.branding,
        [field]: value,
      },
    })
  }

  // Handle save for each section
  const handleSave = () => {
    // Simulate API call
    setTimeout(() => {
      // Save to localStorage for demo purposes
      const settingsData = {
        profile,
        account,
        notifications,
        appearance,
        language,
        billing,
        team,
        company,
      }

      localStorage.setItem("crmSettings", JSON.stringify(settingsData))

      toast({
        title: "Success",
        description: "Settings saved successfully",
      })
    }, 800)
  }

  // Handle session revocation
  const revokeSession = (id: string) => {
    setAccount({
      ...account,
      sessions: account.sessions.filter((session) => session.id !== id),
    })

    toast({
      title: "Session Revoked",
      description: "The session has been successfully revoked",
    })
  }

  // Handle password change
  const changePassword = () => {
    if (account.newPassword !== account.confirmPassword) {
      toast({
        title: "Error",
        description: "New password and confirmation do not match",
        variant: "destructive",
      })
      return
    }

    if (!account.currentPassword) {
      toast({
        title: "Error",
        description: "Current password is required",
        variant: "destructive",
      })
      return
    }

    if (account.newPassword.length < 8) {
      toast({
        title: "Error",
        description: "New password must be at least 8 characters",
        variant: "destructive",
      })
      return
    }

    // Simulate password change
    setAccount({
      ...account,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })

    toast({
      title: "Success",
      description: "Password changed successfully",
    })
  }

  // Handle 2FA toggle
  const toggleTwoFactor = () => {
    setAccount({
      ...account,
      twoFactorEnabled: !account.twoFactorEnabled,
    })

    toast({
      title: account.twoFactorEnabled ? "2FA Disabled" : "2FA Enabled",
      description: account.twoFactorEnabled
        ? "Two-factor authentication has been disabled"
        : "Two-factor authentication has been enabled",
    })
  }

  // Handle adding payment method
  const addPaymentMethod = () => {
    toast({
      title: "Add Payment Method",
      description: "Payment method form would open here",
    })
  }

  // Handle plan change
  const changePlan = () => {
    toast({
      title: "Change Plan",
      description: "Plan selection form would open here",
    })
  }

  // Handle plan cancellation
  const cancelPlan = () => {
    toast({
      title: "Cancel Plan",
      description: "Are you sure you want to cancel your plan?",
    })
  }

  // Handle avatar change
  const changeAvatar = () => {
    toast({
      title: "Change Avatar",
      description: "Avatar upload form would open here",
    })
  }

  // Handle logo upload
  const uploadLogo = () => {
    toast({
      title: "Upload Logo",
      description: "Logo upload form would open here",
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>

      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4">
            <TabsList className="flex flex-col h-auto p-0 bg-transparent">
              <TabsTrigger value="profile" className="justify-start w-full px-3 py-2 mb-1 data-[state=active]:bg-muted">
                <User className="mr-2 h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="account" className="justify-start w-full px-3 py-2 mb-1 data-[state=active]:bg-muted">
                <Lock className="mr-2 h-4 w-4" />
                Account
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="justify-start w-full px-3 py-2 mb-1 data-[state=active]:bg-muted"
              >
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger
                value="appearance"
                className="justify-start w-full px-3 py-2 mb-1 data-[state=active]:bg-muted"
              >
                <Palette className="mr-2 h-4 w-4" />
                Appearance
              </TabsTrigger>
              <TabsTrigger
                value="language"
                className="justify-start w-full px-3 py-2 mb-1 data-[state=active]:bg-muted"
              >
                <Globe className="mr-2 h-4 w-4" />
                Language
              </TabsTrigger>
              <TabsTrigger value="billing" className="justify-start w-full px-3 py-2 mb-1 data-[state=active]:bg-muted">
                <CreditCard className="mr-2 h-4 w-4" />
                Billing
              </TabsTrigger>
              <TabsTrigger value="team" className="justify-start w-full px-3 py-2 mb-1 data-[state=active]:bg-muted">
                <Users className="mr-2 h-4 w-4" />
                Team
              </TabsTrigger>
              <TabsTrigger value="company" className="justify-start w-full px-3 py-2 mb-1 data-[state=active]:bg-muted">
                <Building className="mr-2 h-4 w-4" />
                Company
              </TabsTrigger>
              <TabsTrigger value="landing" className="justify-start w-full px-3 py-2 mb-1 data-[state=active]:bg-muted">
                <Globe className="mr-2 h-4 w-4" />
                Landing Page
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1">
            <TabsContent value="profile" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>Manage your personal information and profile settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={profile.avatar} alt="Profile" />
                      <AvatarFallback>
                        <User className="h-10 w-10" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm" onClick={changeAvatar}>
                        Change Avatar
                      </Button>
                      <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size 2MB.</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="md:text-right">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => handleProfileUpdate("name", e.target.value)}
                        className="md:col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="md:text-right">
                        Email
                      </Label>
                      <Input
                        id="email"
                        value={profile.email}
                        onChange={(e) => handleProfileUpdate("email", e.target.value)}
                        className="md:col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="md:text-right">
                        Job Title
                      </Label>
                      <Input
                        id="title"
                        value={profile.title}
                        onChange={(e) => handleProfileUpdate("title", e.target.value)}
                        className="md:col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                      <Label htmlFor="phone" className="md:text-right">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => handleProfileUpdate("phone", e.target.value)}
                        className="md:col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                      <Label htmlFor="bio" className="md:text-right">
                        Bio
                      </Label>
                      <Textarea
                        id="bio"
                        value={profile.bio}
                        onChange={(e) => handleProfileUpdate("bio", e.target.value)}
                        className="md:col-span-3"
                        rows={4}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="account" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Account Security</CardTitle>
                  <CardDescription>Manage your account security settings and authentication options.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                      <Label htmlFor="current-password" className="md:text-right">
                        Current Password
                      </Label>
                      <Input
                        id="current-password"
                        type="password"
                        value={account.currentPassword}
                        onChange={(e) => handleAccountUpdate("currentPassword", e.target.value)}
                        className="md:col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                      <Label htmlFor="new-password" className="md:text-right">
                        New Password
                      </Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={account.newPassword}
                        onChange={(e) => handleAccountUpdate("newPassword", e.target.value)}
                        className="md:col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                      <Label htmlFor="confirm-password" className="md:text-right">
                        Confirm Password
                      </Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={account.confirmPassword}
                        onChange={(e) => handleAccountUpdate("confirmPassword", e.target.value)}
                        className="md:col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                      <div className="md:col-span-3 md:col-start-2">
                        <Button onClick={changePassword}>Change Password</Button>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                      <div className="md:text-right">
                        <Label>Status</Label>
                      </div>
                      <div className="md:col-span-3">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={
                              account.twoFactorEnabled
                                ? "text-green-500 border-green-500"
                                : "text-yellow-500 border-yellow-500"
                            }
                          >
                            {account.twoFactorEnabled ? "Enabled" : "Not Enabled"}
                          </Badge>
                          <Button size="sm" onClick={toggleTwoFactor}>
                            {account.twoFactorEnabled ? "Disable" : "Enable"}
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Add an extra layer of security to your account by requiring both your password and a
                          verification code.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Login Sessions</h3>
                    <div className="space-y-4">
                      {account.sessions.map((session) => (
                        <div key={session.id} className="flex items-start justify-between border rounded-lg p-3">
                          <div>
                            <div className="font-medium">{session.device}</div>
                            <div className="text-sm text-muted-foreground">Last active: {session.lastActive}</div>
                            <div className="text-xs text-muted-foreground">IP: {session.ip}</div>
                          </div>
                          {session.current ? (
                            <Badge>Current</Badge>
                          ) : (
                            <Button variant="outline" size="sm" onClick={() => revokeSession(session.id)}>
                              Revoke
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how and when you receive notifications.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">New leads</div>
                          <div className="text-sm text-muted-foreground">
                            Get notified when a new lead is assigned to you
                          </div>
                        </div>
                        <Switch
                          checked={notifications.email.newLeads}
                          onCheckedChange={(checked) => handleEmailNotificationUpdate("newLeads", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Customer messages</div>
                          <div className="text-sm text-muted-foreground">
                            Get notified when a customer sends you a message
                          </div>
                        </div>
                        <Switch
                          checked={notifications.email.customerMessages}
                          onCheckedChange={(checked) => handleEmailNotificationUpdate("customerMessages", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Task reminders</div>
                          <div className="text-sm text-muted-foreground">
                            Get reminders about upcoming tasks and deadlines
                          </div>
                        </div>
                        <Switch
                          checked={notifications.email.taskReminders}
                          onCheckedChange={(checked) => handleEmailNotificationUpdate("taskReminders", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Marketing campaigns</div>
                          <div className="text-sm text-muted-foreground">
                            Get updates about marketing campaign performance
                          </div>
                        </div>
                        <Switch
                          checked={notifications.email.marketingCampaigns}
                          onCheckedChange={(checked) => handleEmailNotificationUpdate("marketingCampaigns", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">System updates</div>
                          <div className="text-sm text-muted-foreground">
                            Get notified about system updates and maintenance
                          </div>
                        </div>
                        <Switch
                          checked={notifications.email.systemUpdates}
                          onCheckedChange={(checked) => handleEmailNotificationUpdate("systemUpdates", checked)}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">In-App Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">New leads</div>
                          <div className="text-sm text-muted-foreground">
                            Show notifications when a new lead is assigned to you
                          </div>
                        </div>
                        <Switch
                          checked={notifications.inApp.newLeads}
                          onCheckedChange={(checked) => handleInAppNotificationUpdate("newLeads", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Customer messages</div>
                          <div className="text-sm text-muted-foreground">
                            Show notifications when a customer sends you a message
                          </div>
                        </div>
                        <Switch
                          checked={notifications.inApp.customerMessages}
                          onCheckedChange={(checked) => handleInAppNotificationUpdate("customerMessages", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Task reminders</div>
                          <div className="text-sm text-muted-foreground">
                            Show reminders about upcoming tasks and deadlines
                          </div>
                        </div>
                        <Switch
                          checked={notifications.inApp.taskReminders}
                          onCheckedChange={(checked) => handleInAppNotificationUpdate("taskReminders", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Team mentions</div>
                          <div className="text-sm text-muted-foreground">
                            Show notifications when you are mentioned by a team member
                          </div>
                        </div>
                        <Switch
                          checked={notifications.inApp.teamMentions}
                          onCheckedChange={(checked) => handleInAppNotificationUpdate("teamMentions", checked)}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Notification Schedule</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                      <Label htmlFor="quiet-hours-start" className="md:text-right">
                        Quiet Hours Start
                      </Label>
                      <Input
                        id="quiet-hours-start"
                        type="time"
                        value={notifications.quietHours.start}
                        onChange={(e) => handleQuietHoursUpdate("start", e.target.value)}
                        className="md:col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 mt-4">
                      <Label htmlFor="quiet-hours-end" className="md:text-right">
                        Quiet Hours End
                      </Label>
                      <Input
                        id="quiet-hours-end"
                        type="time"
                        value={notifications.quietHours.end}
                        onChange={(e) => handleQuietHoursUpdate("end", e.target.value)}
                        className="md:col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 mt-4">
                      <div className="md:text-right">
                        <Label>Days</Label>
                      </div>
                      <div className="md:col-span-3 flex flex-wrap gap-2">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                          <Badge
                            key={day}
                            variant={notifications.quietHours.days.includes(day) ? "secondary" : "outline"}
                            className="cursor-pointer"
                            onClick={() => {
                              const days = notifications.quietHours.days.includes(day)
                                ? notifications.quietHours.days.filter((d) => d !== day)
                                : [...notifications.quietHours.days, day]
                              handleQuietHoursUpdate("days", days)
                            }}
                          >
                            {day}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="language" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Language</CardTitle>
                  <CardDescription>Set your preferred language and regional settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                      <Label htmlFor="language" className="md:text-right">
                        Language
                      </Label>
                      <Select
                        value={language.language}
                        onValueChange={(value) => handleLanguageUpdate("language", value)}
                      >
                        <SelectTrigger className="md:col-span-3">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="de">Deutsch</SelectItem>
                          <SelectItem value="pt">Português</SelectItem>
                          <SelectItem value="id">Bahasa Indonesia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                      <Label htmlFor="timezone" className="md:text-right">
                        Timezone
                      </Label>
                      <Select
                        value={language.timezone}
                        onValueChange={(value) => handleLanguageUpdate("timezone", value)}
                      >
                        <SelectTrigger className="md:col-span-3">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="utc-12">UTC-12:00</SelectItem>
                          <SelectItem value="utc-11">UTC-11:00</SelectItem>
                          <SelectItem value="utc-10">UTC-10:00</SelectItem>
                          <SelectItem value="utc-9">UTC-09:00</SelectItem>
                          <SelectItem value="utc-8">UTC-08:00</SelectItem>
                          <SelectItem value="utc-7">UTC-07:00 (PDT)</SelectItem>
                          <SelectItem value="utc-6">UTC-06:00</SelectItem>
                          <SelectItem value="utc-5">UTC-05:00 (EST)</SelectItem>
                          <SelectItem value="utc-4">UTC-04:00</SelectItem>
                          <SelectItem value="utc-3">UTC-03:00</SelectItem>
                          <SelectItem value="utc-2">UTC-02:00</SelectItem>
                          <SelectItem value="utc-1">UTC-01:00</SelectItem>
                          <SelectItem value="utc">UTC±00:00</SelectItem>
                          <SelectItem value="utc+1">UTC+01:00</SelectItem>
                          <SelectItem value="utc+2">UTC+02:00</SelectItem>
                          <SelectItem value="utc+3">UTC+03:00</SelectItem>
                          <SelectItem value="utc+4">UTC+04:00</SelectItem>
                          <SelectItem value="utc+5">UTC+05:00</SelectItem>
                          <SelectItem value="utc+6">UTC+06:00</SelectItem>
                          <SelectItem value="utc+7">UTC+07:00</SelectItem>
                          <SelectItem value="utc+8">UTC+08:00</SelectItem>
                          <SelectItem value="utc+9">UTC+09:00</SelectItem>
                          <SelectItem value="utc+10">UTC+10:00</SelectItem>
                          <SelectItem value="utc+11">UTC+11:00</SelectItem>
                          <SelectItem value="utc+12">UTC+12:00</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                      <Label htmlFor="dateFormat" className="md:text-right">
                        Date Format
                      </Label>
                      <Select
                        value={language.dateFormat}
                        onValueChange={(value) => handleLanguageUpdate("dateFormat", value)}
                      >
                        <SelectTrigger className="md:col-span-3">
                          <SelectValue placeholder="Select date format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                          <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                          <SelectItem value="yyyy-mm-dd">YYYY/MM/DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                      <Label htmlFor="currency" className="md:text-right">
                        Currency
                      </Label>
                      <Select
                        value={language.currency}
                        onValueChange={(value) => handleLanguageUpdate("currency", value)}
                      >
                        <SelectTrigger className="md:col-span-3">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usd">USD ($)</SelectItem>
                          <SelectItem value="eur">EUR (€)</SelectItem>
                          <SelectItem value="gbp">GBP (£)</SelectItem>
                          <SelectItem value="jpy">JPY (¥)</SelectItem>
                          <SelectItem value="cad">CAD ($)</SelectItem>
                          <SelectItem value="aud">AUD ($)</SelectItem>
                          <SelectItem value="idr">IDR (Rp)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize the look and feel of your CRM interface.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                      <Label htmlFor="theme" className="md:text-right">
                        Theme
                      </Label>
                      <Select
                        value={appearance.theme}
                        onValueChange={(value) => handleAppearanceUpdate("theme", value)}
                      >
                        <SelectTrigger className="md:col-span-3">
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                      <Label htmlFor="density" className="md:text-right">
                        Density
                      </Label>
                      <Select
                        value={appearance.density}
                        onValueChange={(value) => handleAppearanceUpdate("density", value)}
                      >
                        <SelectTrigger className="md:col-span-3">
                          <SelectValue placeholder="Select density" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="compact">Compact</SelectItem>
                          <SelectItem value="comfortable">Comfortable</SelectItem>
                          <SelectItem value="spacious">Spacious</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                      <Label className="md:text-right">Sidebar</Label>
                      <div className="flex items-center space-x-2 md:col-span-3">
                        <Switch
                          id="sidebar-collapsed"
                          checked={appearance.sidebarCollapsed}
                          onCheckedChange={(checked) => handleAppearanceUpdate("sidebarCollapsed", checked)}
                        />
                        <Label htmlFor="sidebar-collapsed">Remember sidebar state</Label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                      <Label className="md:text-right">Animations</Label>
                      <div className="flex items-center space-x-2 md:col-span-3">
                        <Switch
                          id="animations"
                          checked={appearance.animations}
                          onCheckedChange={(checked) => handleAppearanceUpdate("animations", checked)}
                        />
                        <Label htmlFor="animations">Enable animations</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Billing & Subscription</CardTitle>
                  <CardDescription>Manage your subscription plan and payment methods.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Current Plan</h3>
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-xl font-bold">{billing.plan.name}</div>
                          <div className="text-sm text-muted-foreground">{billing.plan.price}, billed monthly</div>
                          <div className="mt-2 text-sm">
                            <span className="font-medium">Features:</span> Up to 2,500 customers, Advanced lead
                            management, Full invoicing & billing, Marketing broadcasts, Priority support
                          </div>
                        </div>
                        <Badge>Active</Badge>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          Next billing date: {billing.plan.billingDate}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={changePlan}>
                            Change Plan
                          </Button>
                          <Button variant="outline" size="sm" className="text-destructive" onClick={cancelPlan}>
                            Cancel Plan
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Payment Methods</h3>
                    <div className="space-y-4">
                      {billing.paymentMethods.map((method) => (
                        <div key={method.id} className="flex items-center justify-between border rounded-lg p-3">
                          <div className="flex items-center gap-3">
                            <CreditCard className="h-8 w-8 text-primary" />
                            <div>
                              <div className="font-medium">
                                {method.type} ending in {method.last4}
                              </div>
                              <div className="text-sm text-muted-foreground">Expires {method.expiry}</div>
                            </div>
                          </div>
                          {method.default ? (
                            <Badge>Default</Badge>
                          ) : (
                            <Button variant="outline" size="sm" onClick={() => makePaymentMethodDefault(method.id)}>
                              Make Default
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button variant="outline" className="mt-2" onClick={addPaymentMethod}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Payment Method
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Billing History</h3>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Invoice</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {billing.invoices.map((invoice) => (
                            <TableRow key={invoice.id}>
                              <TableCell className="font-medium">{invoice.id}</TableCell>
                              <TableCell>{invoice.date}</TableCell>
                              <TableCell>{invoice.amount}</TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                >
                                  {invoice.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm">
                                  Download
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Team Management</CardTitle>
                  <CardDescription>Manage your team members and their access permissions.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-lg font-medium">Team Members</h3>
                      <p className="text-sm text-muted-foreground">
                        You have {team.members.length} team members in your organization.
                      </p>
                    </div>
                    <Button onClick={addTeamMember}>
                      <Users className="mr-2 h-4 w-4" />
                      Invite Member
                    </Button>
                  </div>

                  <div className="rounded-md border">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-medium">Name</th>
                          <th className="text-left p-3 font-medium">Email</th>
                          <th className="text-left p-3 font-medium">Role</th>
                          <th className="text-left p-3 font-medium">Status</th>
                          <th className="text-right p-3 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {team.members.map((member) => (
                          <tr key={member.id} className="border-b">
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>
                                    {member.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <Input
                                  value={member.name}
                                  onChange={(e) => handleTeamMemberUpdate(member.id, "name", e.target.value)}
                                  className="h-8 py-1"
                                />
                              </div>
                            </td>
                            <td className="p-3">
                              <Input
                                value={member.email}
                                onChange={(e) => handleTeamMemberUpdate(member.id, "email", e.target.value)}
                                className="h-8 py-1"
                              />
                            </td>
                            <td className="p-3">
                              <Select
                                value={member.role}
                                onValueChange={(value) => handleTeamMemberUpdate(member.id, "role", value)}
                              >
                                <SelectTrigger className="h-8">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Admin">Admin</SelectItem>
                                  <SelectItem value="Sales Manager">Sales Manager</SelectItem>
                                  <SelectItem value="Support Agent">Support Agent</SelectItem>
                                  <SelectItem value="Marketing Specialist">Marketing Specialist</SelectItem>
                                  <SelectItem value="Developer">Developer</SelectItem>
                                  <SelectItem value="Member">Member</SelectItem>
                                </SelectContent>
                              </Select>
                            </td>
                            <td className="p-3">
                              <Select
                                value={member.status}
                                onValueChange={(value) => handleTeamMemberUpdate(member.id, "status", value)}
                              >
                                <SelectTrigger className="h-8">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Active">Active</SelectItem>
                                  <SelectItem value="Invited">Invited</SelectItem>
                                  <SelectItem value="Inactive">Inactive</SelectItem>
                                </SelectContent>
                              </Select>
                            </td>
                            <td className="p-3 text-right">
                              {member.id !== "member-1" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeTeamMember(member.id)}
                                  className="text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="company" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Company Profile</CardTitle>
                  <CardDescription>Manage your company information and branding settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                    <div className="flex items-center justify-center w-24 h-24 rounded-lg border bg-muted">
                      <Building className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm" onClick={uploadLogo}>
                        Upload Logo
                      </Button>
                      <p className="text-xs text-muted-foreground">SVG, PNG or JPG. Max size 2MB.</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                      <Label htmlFor="company-name" className="md:text-right">
                        Company Name
                      </Label>
                      <Input
                        id="company-name"
                        value={company.name}
                        onChange={(e) => handleCompanyUpdate("name", e.target.value)}
                        className="md:col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                      <Label htmlFor="industry" className="md:text-right">
                        Industry
                      </Label>
                      <Select
                        value={company.industry}
                        onValueChange={(value) => handleCompanyUpdate("industry", value)}
                      >
                        <SelectTrigger className="md:col-span-3">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                      <Label htmlFor="company-size" className="md:text-right">
                        Company Size
                      </Label>
                      <Select value={company.size} onValueChange={(value) => handleCompanyUpdate("size", value)}>
                        <SelectTrigger className="md:col-span-3">
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">1-10 employees</SelectItem>
                          <SelectItem value="medium">11-50 employees</SelectItem>
                          <SelectItem value="large">51-200 employees</SelectItem>
                          <SelectItem value="enterprise">201+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                      <Label htmlFor="website" className="md:text-right">
                        Website
                      </Label>
                      <Input
                        id="website"
                        value={company.website}
                        onChange={(e) => handleCompanyUpdate("website", e.target.value)}
                        className="md:col-span-3"
                      />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                        <Label htmlFor="company-email" className="md:text-right">
                          Email
                        </Label>
                        <Input
                          id="company-email"
                          value={company.email}
                          onChange={(e) => handleCompanyUpdate("email", e.target.value)}
                          className="md:col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                        <Label htmlFor="company-phone" className="md:text-right">
                          Phone
                        </Label>
                        <Input
                          id="company-phone"
                          value={company.phone}
                          onChange={(e) => handleCompanyUpdate("phone", e.target.value)}
                          className="md:col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 items-start gap-4">
                        <Label htmlFor="address" className="md:text-right">
                          Address
                        </Label>
                        <Textarea
                          id="address"
                          value={company.address}
                          onChange={(e) => handleCompanyUpdate("address", e.target.value)}
                          className="md:col-span-3"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Branding</h3>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                        <Label htmlFor="primary-color" className="md:text-right">
                          Primary Color
                        </Label>
                        <div className="md:col-span-3 flex items-center gap-2">
                          <div
                            className="w-10 h-10 rounded-md"
                            style={{ backgroundColor: company.branding.primaryColor }}
                          ></div>
                          <Input
                            id="primary-color"
                            value={company.branding.primaryColor}
                            onChange={(e) => handleBrandingUpdate("primaryColor", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                        <Label htmlFor="secondary-color" className="md:text-right">
                          Secondary Color
                        </Label>
                        <div className="md:col-span-3 flex items-center gap-2">
                          <div
                            className="w-10 h-10 rounded-md"
                            style={{ backgroundColor: company.branding.secondaryColor }}
                          ></div>
                          <Input
                            id="secondary-color"
                            value={company.branding.secondaryColor}
                            onChange={(e) => handleBrandingUpdate("secondaryColor", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                        <Label htmlFor="email-signature" className="md:text-right">
                          Email Signature
                        </Label>
                        <Textarea
                          id="email-signature"
                          value={company.branding.emailSignature}
                          onChange={(e) => handleBrandingUpdate("emailSignature", e.target.value)}
                          className="md:col-span-3"
                          rows={4}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="landing" className="mt-0">
              <LandingPageSettings />
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  )
}

