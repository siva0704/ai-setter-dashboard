import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Bot, User, Clock } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const conversations = [
  {
    id: 1,
    client: "Sarah Johnson",
    lastMessage: "Thanks! I'll see you tomorrow at 9 AM.",
    time: "2 min ago",
    unread: 2,
    status: "active",
  },
  {
    id: 2,
    client: "Michael Chen",
    lastMessage: "Can I reschedule my appointment?",
    time: "15 min ago",
    unread: 1,
    status: "pending",
  },
  {
    id: 3,
    client: "Emily Brown",
    lastMessage: "Perfect, thank you for confirming!",
    time: "1 hour ago",
    unread: 0,
    status: "resolved",
  },
  {
    id: 4,
    client: "David Wilson",
    lastMessage: "What time slots are available?",
    time: "2 hours ago",
    unread: 3,
    status: "active",
  },
];

const aiMetrics = [
  { label: "Total Conversations", value: "1,234" },
  { label: "AI Resolution Rate", value: "94.2%" },
  { label: "Avg Response Time", value: "< 1 min" },
  { label: "Satisfaction", value: "4.8/5.0" },
];

export default function Conversations() {
  return (
    <div className="space-y-6 animate-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Conversation Center</h1>
          <p className="text-muted-foreground mt-1">
            AI-powered client communications
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {aiMetrics.map((metric) => (
          <Card key={metric.label} className="shadow-card">
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="text-sm text-muted-foreground mt-1">
                {metric.label}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Conversations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left"
              >
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {conv.client.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm">{conv.client}</span>
                    <span className="text-xs text-muted-foreground">{conv.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate mt-1">
                    {conv.lastMessage}
                  </p>
                </div>
                {conv.unread > 0 && (
                  <Badge className="bg-primary">{conv.unread}</Badge>
                )}
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-card">
          <CardHeader className="border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    SJ
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">Sarah Johnson</h3>
                  <p className="text-sm text-muted-foreground">Active now</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                AI Assisted
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[400px] p-6 space-y-4 overflow-y-auto">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="bg-muted rounded-2xl rounded-tl-sm p-4 max-w-[80%]">
                    <p className="text-sm">
                      Hello! I'm here to help schedule your appointment. What service are you interested in?
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 block">10:30 AM</span>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <div className="flex-1 flex flex-col items-end">
                  <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm p-4 max-w-[80%]">
                    <p className="text-sm">
                      I need a consultation appointment, preferably tomorrow morning.
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">10:31 AM</span>
                </div>
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-accent/10 text-accent">SJ</AvatarFallback>
                </Avatar>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="bg-muted rounded-2xl rounded-tl-sm p-4 max-w-[80%]">
                    <p className="text-sm">
                      Great! I have availability tomorrow at 9:00 AM and 11:00 AM with Dr. Smith. Which time works better for you?
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 block">10:32 AM</span>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <div className="flex-1 flex flex-col items-end">
                  <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm p-4 max-w-[80%]">
                    <p className="text-sm">
                      9:00 AM would be perfect!
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">10:33 AM</span>
                </div>
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-accent/10 text-accent">SJ</AvatarFallback>
                </Avatar>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="bg-muted rounded-2xl rounded-tl-sm p-4 max-w-[80%]">
                    <p className="text-sm">
                      Excellent! I've booked you for tomorrow at 9:00 AM with Dr. Smith. You'll receive a confirmation email shortly. Is there anything else I can help you with?
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 block">10:34 AM</span>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <div className="flex-1 flex flex-col items-end">
                  <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm p-4 max-w-[80%]">
                    <p className="text-sm">
                      Thanks! I'll see you tomorrow at 9 AM.
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">10:35 AM</span>
                </div>
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-accent/10 text-accent">SJ</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
