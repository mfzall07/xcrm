"use client"

import { useState, useEffect } from "react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isToday,
  parseISO,
} from "date-fns"
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  CalendarIcon,
  Clock,
  Users,
  MapPin,
  Trash2,
  Edit,
  RefreshCw,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NewEventDialog } from "@/components/calendar/new-event-dialog"
import type { Event } from "@/lib/data"
import { eventService } from "@/lib/data-service"
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

export function CalendarPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [view, setView] = useState("month")
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [eventToDelete, setEventToDelete] = useState<string | null>(null)
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false)
  const [eventFilter, setEventFilter] = useState("all")
  const { toast } = useToast()

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    setIsLoading(true)
    try {
      const data = await eventService.getAll()
      setEvents(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load events",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateEvent = async (event: Omit<Event, "id">) => {
    try {
      const newEvent = await eventService.create(event)
      setEvents([...events, newEvent])
      toast({
        title: "Success",
        description: "Event created successfully",
      })
      return true
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create event",
        variant: "destructive",
      })
      return false
    }
  }

  const handleUpdateEvent = async (id: string, event: Partial<Event>) => {
    try {
      const updatedEvent = await eventService.update(id, event)
      if (updatedEvent) {
        setEvents(events.map((e) => (e.id === id ? updatedEvent : e)))
        toast({
          title: "Success",
          description: "Event updated successfully",
        })
        return true
      }
      return false
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update event",
        variant: "destructive",
      })
      return false
    }
  }

  const handleDeleteEvent = async (id: string) => {
    try {
      const success = await eventService.delete(id)
      if (success) {
        setEvents(events.filter((e) => e.id !== id))
        toast({
          title: "Success",
          description: "Event deleted successfully",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive",
      })
    }
  }

  const handleReset = async () => {
    try {
      const success = await eventService.reset()
      if (success) {
        loadEvents()
        toast({
          title: "Success",
          description: "Events reset to initial data",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reset events",
        variant: "destructive",
      })
    }
  }

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    setIsDialogOpen(true)
    setCurrentEvent(null)
  }

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return events.filter((event) => {
      const eventDate = parseISO(event.start)
      const matchesDate = isSameDay(eventDate, date)
      const matchesFilter = eventFilter === "all" || event.category === eventFilter
      return matchesDate && matchesFilter
    })
  }

  // Get upcoming events (next 30 days)
  const getUpcomingEvents = () => {
    const today = new Date()
    const nextMonth = addMonths(today, 1)
    return events
      .filter((event) => {
        const eventDate = parseISO(event.start)
        const matchesDateRange = eventDate >= today && eventDate <= nextMonth
        const matchesFilter = eventFilter === "all" || event.category === eventFilter
        return matchesDateRange && matchesFilter
      })
      .sort((a, b) => parseISO(a.start).getTime() - parseISO(b.start).getTime())
  }

  // Get event badge color based on category
  const getEventBadgeColor = (category: string) => {
    switch (category) {
      case "meeting":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "call":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "task":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "personal":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
          <p className="text-muted-foreground">Schedule and manage your appointments and events.</p>
        </div>
        <div className="flex items-center gap-2">
          <Tabs defaultValue={view} onValueChange={(value) => setView(value)} className="w-[300px]">
            <TabsList>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>
          </Tabs>
          <Select defaultValue={eventFilter} onValueChange={setEventFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="meeting">Meetings</SelectItem>
              <SelectItem value="call">Calls</SelectItem>
              <SelectItem value="task">Tasks</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setIsResetDialogOpen(true)}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button
            onClick={() => {
              setSelectedDate(new Date())
              setCurrentEvent(null)
              setIsDialogOpen(true)
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Calendar */}
        <Card className="md:col-span-3">
          <CardHeader className="px-6 py-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h3 className="text-xl font-semibold">{format(currentDate, "MMMM yyyy")}</h3>
                <Button variant="outline" size="icon" onClick={handleNextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="outline" onClick={() => setCurrentDate(new Date())}>
                Today
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-7 border-b">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="p-2 text-center font-medium text-sm">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 auto-rows-fr">
              {Array.from({ length: monthStart.getDay() }).map((_, index) => (
                <div key={`empty-start-${index}`} className="p-2 border-b border-r min-h-[100px]" />
              ))}
              {daysInMonth.map((day) => {
                const dayEvents = getEventsForDate(day)
                return (
                  <div
                    key={day.toISOString()}
                    className={`p-2 border-b border-r min-h-[100px] ${
                      isToday(day) ? "bg-primary/5" : ""
                    } hover:bg-muted/50 cursor-pointer transition-colors`}
                    onClick={() => handleDateClick(day)}
                  >
                    <div
                      className={`flex items-center justify-center h-8 w-8 rounded-full mb-1 ${
                        isToday(day) ? "bg-primary text-primary-foreground" : ""
                      }`}
                    >
                      {format(day, "d")}
                    </div>
                    <div className="space-y-1">
                      {isLoading ? (
                        <div className="text-xs text-center text-muted-foreground">Loading...</div>
                      ) : (
                        <>
                          {dayEvents.slice(0, 3).map((event) => (
                            <div
                              key={event.id}
                              className={`text-xs p-1 rounded truncate ${getEventBadgeColor(event.category)}`}
                              onClick={(e) => {
                                e.stopPropagation()
                                setCurrentEvent(event)
                                setIsDialogOpen(true)
                              }}
                            >
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 3 && (
                            <div className="text-xs text-muted-foreground text-center">
                              +{dayEvents.length - 3} more
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )
              })}
              {Array.from({ length: 6 - monthEnd.getDay() }).map((_, index) => (
                <div key={`empty-end-${index}`} className="p-2 border-b border-r min-h-[100px]" />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Your schedule for the next few days</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              </div>
            ) : getUpcomingEvents().length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">No upcoming events</div>
            ) : (
              getUpcomingEvents().map((event) => (
                <div key={event.id} className="flex flex-col space-y-2 p-3 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{event.title}</h4>
                    <div className="flex gap-1">
                      <Badge className={getEventBadgeColor(event.category)}>
                        {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => {
                          setCurrentEvent(event)
                          setIsDialogOpen(true)
                        }}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-destructive"
                        onClick={() => {
                          setEventToDelete(event.id)
                          setIsDeleteDialogOpen(true)
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(parseISO(event.start), "EEEE, MMMM d, yyyy")}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="mr-2 h-4 w-4" />
                    {event.attendees.length} attendees
                  </div>
                </div>
              ))
            )}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setSelectedDate(new Date())
                setCurrentEvent(null)
                setIsDialogOpen(true)
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </CardContent>
        </Card>
      </div>

      <NewEventDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedDate={selectedDate}
        event={currentEvent}
        onSave={(eventData) => {
          if (currentEvent) {
            return handleUpdateEvent(currentEvent.id, eventData)
          } else {
            return handleCreateEvent(eventData as Omit<Event, "id">)
          }
        }}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the event.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (eventToDelete) {
                  handleDeleteEvent(eventToDelete)
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
            <AlertDialogTitle>Reset Calendar Data?</AlertDialogTitle>
            <AlertDialogDescription>
              This will reset all event data to the initial demo data. Any changes you've made will be lost.
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

