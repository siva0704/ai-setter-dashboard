import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Sparkles
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";

const bookingsData = [
  { name: "Mon", value: 45 },
  { name: "Tue", value: 52 },
  { name: "Wed", value: 48 },
  { name: "Thu", value: 65 },
  { name: "Fri", value: 58 },
  { name: "Sat", value: 40 },
  { name: "Sun", value: 35 },
];

const revenueData = [
  { name: "Jan", value: 42000 },
  { name: "Feb", value: 45000 },
  { name: "Mar", value: 48000 },
  { name: "Apr", value: 52000 },
  { name: "May", value: 54000 },
  { name: "Jun", value: 58000 },
];

const utilizationData = [
  { name: "Provider A", value: 92 },
  { name: "Provider B", value: 88 },
  { name: "Provider C", value: 85 },
  { name: "Provider D", value: 78 },
];

const statsCards = [
  {
    title: "Total Appointments",
    value: "1,234",
    change: "+12.5%",
    trend: "up",
    icon: Calendar,
    color: "text-primary",
  },
  {
    title: "Revenue",
    value: "$82,450",
    change: "+8.2%",
    trend: "up",
    icon: DollarSign,
    color: "text-success",
  },
  {
    title: "AI Efficiency",
    value: "98.1%",
    change: "+2.4%",
    trend: "up",
    icon: TrendingUp,
    color: "text-accent",
  },
  {
    title: "Cancellations",
    value: "24",
    change: "-5.1%",
    trend: "down",
    icon: XCircle,
    color: "text-destructive",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Executive Overview</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening with your AI assistant.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            This Month
          </Button>
          <Button className="bg-gradient-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Appointment
          </Button>
        </div>
      </div>

      {/* AI Insight Box */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 shadow-elevated">
        <CardContent className="flex items-center gap-4 p-6">
          <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">AI Insight</h3>
            <p className="text-muted-foreground">
              📈 Bookings expected to rise 18% next week based on historical patterns and current trends
            </p>
          </div>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat) => (
          <Card key={stat.title} className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 mt-1 text-sm">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="w-4 h-4 text-success" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-success" />
                )}
                <span className={stat.trend === "up" ? "text-success" : "text-success"}>
                  {stat.change}
                </span>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Bookings Over Time</CardTitle>
            <p className="text-sm text-muted-foreground">
              Daily appointment volume for the current week
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={bookingsData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <p className="text-sm text-muted-foreground">
              Monthly revenue performance
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--success))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--success))", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Provider Utilization */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Provider Utilization</CardTitle>
          <p className="text-sm text-muted-foreground">
            Current capacity usage by provider
          </p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={utilizationData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis type="number" domain={[0, 100]} className="text-xs" />
              <YAxis dataKey="name" type="category" className="text-xs" width={100} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => `${value}%`}
              />
              <Bar dataKey="value" fill="hsl(var(--accent))" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
