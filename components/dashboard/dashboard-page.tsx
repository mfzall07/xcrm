"use client"

import { useState } from "react"
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  DollarSign,
  Users,
  MessageSquare,
  Calendar,
  Clock,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Filter,
  Download,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { SalesChart } from "@/components/dashboard/sales-chart"
import { LeadsTable } from "@/components/dashboard/leads-table"
import { RecentActivities } from "@/components/dashboard/recent-activities"
import { UpcomingTasks } from "@/components/dashboard/upcoming-tasks"
import { CustomerGrowthChart } from "@/components/dashboard/customer-growth-chart"

export function DashboardPage() {
  const [timeRange, setTimeRange] = useState("month")
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    revenue: true,
    customers: true,
    leads: true,
    tasks: true,
  })

  const toggleSection = (section: string) => {
    setExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back, John! Here's an overview of your business.</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <div className="flex items-center space-x-2">
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 inline-flex items-center">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  +20.1%
                </span>{" "}
                from last {timeRange}
              </p>
              <p className="text-xs text-muted-foreground">Target: $50,000</p>
            </div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-muted">
              <div className="h-1.5 rounded-full bg-primary" style={{ width: "90.5%" }}></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2,350</div>
            <div className="flex items-center space-x-2">
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 inline-flex items-center">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  +18.2%
                </span>{" "}
                from last {timeRange}
              </p>
              <p className="text-xs text-muted-foreground">Target: 2,500</p>
            </div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-muted">
              <div className="h-1.5 rounded-full bg-primary" style={{ width: "94%" }}></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Leads</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <div className="flex items-center space-x-2">
              <p className="text-xs text-muted-foreground">
                <span className="text-red-500 inline-flex items-center">
                  <ArrowDown className="mr-1 h-3 w-3" />
                  -4.5%
                </span>{" "}
                from last {timeRange}
              </p>
              <p className="text-xs text-muted-foreground">Conversion rate: 8.5%</p>
            </div>
            <div className="mt-2 flex items-center text-xs">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                <span className="text-muted-foreground">New: 5,234</span>
              </div>
              <div className="flex items-center ml-3">
                <div className="h-2 w-2 rounded-full bg-blue-500 mr-1"></div>
                <span className="text-muted-foreground">Qualified: 4,128</span>
              </div>
              <div className="flex items-center ml-3">
                <div className="h-2 w-2 rounded-full bg-yellow-500 mr-1"></div>
                <span className="text-muted-foreground">Negotiation: 2,872</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="flex items-center space-x-2">
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 inline-flex items-center">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  +5.2%
                </span>{" "}
                from last {timeRange}
              </p>
              <p className="text-xs text-muted-foreground">Avg. response time: 2.5h</p>
            </div>
            <div className="mt-2 flex items-center text-xs">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-red-500 mr-1"></div>
                <span className="text-muted-foreground">High: 8</span>
              </div>
              <div className="flex items-center ml-3">
                <div className="h-2 w-2 rounded-full bg-yellow-500 mr-1"></div>
                <span className="text-muted-foreground">Medium: 10</span>
              </div>
              <div className="flex items-center ml-3">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                <span className="text-muted-foreground">Low: 6</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Revenue breakdown by month with comparison to previous period</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={() => toggleSection("revenue")}>
              {expanded.revenue ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CardHeader>
          {expanded.revenue && (
            <CardContent className="pl-2">
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-1">
                  <div className="text-2xl font-bold">$245,890.65</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500 inline-flex items-center">
                      <ArrowUp className="mr-1 h-3 w-3" />
                      +12.5%
                    </span>{" "}
                    from previous period
                  </p>
                </div>
                <Tabs defaultValue="revenue" className="w-[400px]">
                  <TabsList>
                    <TabsTrigger value="revenue">Revenue</TabsTrigger>
                    <TabsTrigger value="profit">Profit</TabsTrigger>
                    <TabsTrigger value="expenses">Expenses</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <RevenueChart />
            </CardContent>
          )}
        </Card>
        <Card className="col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>Sales breakdown by channel</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={() => toggleSection("customers")}>
              {expanded.customers ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CardHeader>
          {expanded.customers && (
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-1">
                  <div className="text-2xl font-bold">1,248 sales</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500 inline-flex items-center">
                      <ArrowUp className="mr-1 h-3 w-3" />
                      +8.2%
                    </span>{" "}
                    from previous period
                  </p>
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Channels</SelectItem>
                    <SelectItem value="direct">Direct</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <SalesChart />
            </CardContent>
          )}
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Leads</CardTitle>
              <CardDescription>You have 12 new leads this month</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={() => toggleSection("leads")}>
              {expanded.leads ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CardHeader>
          {expanded.leads && (
            <CardContent>
              <LeadsTable />
            </CardContent>
          )}
        </Card>
        <Card className="col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest activities from your team</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={() => toggleSection("tasks")}>
              {expanded.tasks ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CardHeader>
          {expanded.tasks && (
            <CardContent>
              <RecentActivities />
            </CardContent>
          )}
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>Your scheduled tasks for today</CardDescription>
          </CardHeader>
          <CardContent>
            <UpcomingTasks />
          </CardContent>
        </Card>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Customer Growth</CardTitle>
            <CardDescription>New customer acquisition over time</CardDescription>
          </CardHeader>
          <CardContent>
            <CustomerGrowthChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Meetings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Product Demo with Acme Inc</p>
                  <p className="text-xs text-muted-foreground">Today, 2:00 PM - 3:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Team Weekly Sync</p>
                  <p className="text-xs text-muted-foreground">Tomorrow, 10:00 AM - 11:00 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Sales Strategy Meeting</p>
                  <p className="text-xs text-muted-foreground">Tomorrow, 3:30 PM - 4:30 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overdue Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Follow up with Globex Corp</p>
                  <p className="text-xs text-muted-foreground">Due 2 days ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Update sales forecast</p>
                  <p className="text-xs text-muted-foreground">Due 1 day ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Send proposal to Stark Industries</p>
                  <p className="text-xs text-muted-foreground">Due 3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Recent Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Closed deal with Wayne Enterprises</p>
                  <p className="text-xs text-muted-foreground">$45,000 - Today</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Reached 1,000 customers milestone</p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Exceeded monthly sales target</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

