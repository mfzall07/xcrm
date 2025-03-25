"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Phone, Mail, Calendar, CreditCard, User } from "lucide-react"
import { activities } from "@/lib/data"

export function RecentActivities() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">{activity.user.name}</span>
              {activity.type === "message" && <MessageSquare className="h-4 w-4 text-blue-500" />}
              {activity.type === "call" && <Phone className="h-4 w-4 text-green-500" />}
              {activity.type === "email" && <Mail className="h-4 w-4 text-purple-500" />}
              {activity.type === "meeting" && <Calendar className="h-4 w-4 text-orange-500" />}
              {activity.type === "payment" && <CreditCard className="h-4 w-4 text-emerald-500" />}
              {activity.type === "customer" && <User className="h-4 w-4 text-indigo-500" />}
            </div>
            <p className="text-sm text-muted-foreground">{activity.content}</p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

