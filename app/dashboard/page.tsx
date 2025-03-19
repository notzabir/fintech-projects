"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowUpRight,
  BarChart3,
  Building,
  ChevronDown,
  CircleDollarSign,
  Globe2,
  Home,
  LineChart,
  LogOut,
  Menu,
  Search,
  Settings,
  TrendingUp,
  User,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

// Sample data for charts
const propertyData = [
  { month: "Jan", value: 1200000, growth: 2.4 },
  { month: "Feb", value: 1250000, growth: 4.1 },
  { month: "Mar", value: 1300000, growth: 4.0 },
  { month: "Apr", value: 1280000, growth: -1.5 },
  { month: "May", value: 1320000, growth: 3.1 },
  { month: "Jun", value: 1380000, growth: 4.5 },
  { month: "Jul", value: 1410000, growth: 2.2 },
  { month: "Aug", value: 1460000, growth: 3.5 },
  { month: "Sep", value: 1490000, growth: 2.1 },
  { month: "Oct", value: 1520000, growth: 2.0 },
  { month: "Nov", value: 1570000, growth: 3.3 },
  { month: "Dec", value: 1620000, growth: 3.2 },
]

const rentalYieldData = [
  { name: "Residential", value: 5.2 },
  { name: "Commercial", value: 7.8 },
  { name: "Industrial", value: 6.5 },
  { name: "Retail", value: 4.9 },
]

const marketTrendsData = [
  { month: "Jan", residential: 3.2, commercial: 2.1, industrial: 1.8 },
  { month: "Feb", residential: 3.5, commercial: 2.3, industrial: 1.9 },
  { month: "Mar", residential: 3.6, commercial: 2.4, industrial: 2.1 },
  { month: "Apr", residential: 3.8, commercial: 2.6, industrial: 2.3 },
  { month: "May", residential: 4.0, commercial: 2.7, industrial: 2.4 },
  { month: "Jun", residential: 4.2, commercial: 2.9, industrial: 2.6 },
  { month: "Jul", residential: 4.5, commercial: 3.1, industrial: 2.8 },
  { month: "Aug", residential: 4.7, commercial: 3.3, industrial: 3.0 },
  { month: "Sep", residential: 4.9, commercial: 3.5, industrial: 3.2 },
  { month: "Oct", residential: 5.1, commercial: 3.7, industrial: 3.4 },
  { month: "Nov", residential: 5.3, commercial: 3.9, industrial: 3.6 },
  { month: "Dec", residential: 5.5, commercial: 4.1, industrial: 3.8 },
]

const regionData = [
  { name: "North", value: 32 },
  { name: "South", value: 28 },
  { name: "East", value: 22 },
  { name: "West", value: 18 },
]

const COLORS = ["#0ea5e9", "#8b5cf6", "#f59e0b", "#ec4899"]

const properties = [
  {
    id: 1,
    name: "Skyline Towers",
    type: "Residential",
    location: "New York, NY",
    value: "$2,450,000",
    roi: "+12.5%",
    status: "Active",
  },
  {
    id: 2,
    name: "Riverside Complex",
    type: "Commercial",
    location: "Chicago, IL",
    value: "$4,800,000",
    roi: "+8.7%",
    status: "Active",
  },
  {
    id: 3,
    name: "Harbor View Apartments",
    type: "Residential",
    location: "Miami, FL",
    value: "$1,950,000",
    roi: "+15.2%",
    status: "Active",
  },
  {
    id: 4,
    name: "Tech Park Offices",
    type: "Commercial",
    location: "San Francisco, CA",
    value: "$7,200,000",
    roi: "+6.8%",
    status: "Pending",
  },
  {
    id: 5,
    name: "Mountain View Residences",
    type: "Residential",
    location: "Denver, CO",
    value: "$3,100,000",
    roi: "+10.3%",
    status: "Active",
  },
]

export default function Dashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-zinc-950 text-white">
        {/* Sidebar */}
        <Sidebar className="border-r border-zinc-800 bg-black">
          <SidebarHeader className="border-b border-zinc-800 px-6 py-3">
            <div className="flex items-center gap-2 font-bold">
              <Globe2 className="h-6 w-6 text-blue-500" />
              <span className="text-xl">
                <Link href="/">TerraNova</Link></span>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-4 py-6">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full bg-zinc-900 pl-8 text-sm text-zinc-400 border-zinc-800 focus-visible:ring-blue-500"
                />
              </div>
            </div>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full justify-start gap-3 bg-blue-500/10 text-blue-500">
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full justify-start gap-3 text-zinc-400 hover:text-white">
                  <Building className="h-4 w-4" />
                  <span>Properties</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full justify-start gap-3 text-zinc-400 hover:text-white">
                  <LineChart className="h-4 w-4" />
                  <span>Analytics</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full justify-start gap-3 text-zinc-400 hover:text-white">
                  <CircleDollarSign className="h-4 w-4" />
                  <span>Investments</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full justify-start gap-3 text-zinc-400 hover:text-white">
                  <BarChart3 className="h-4 w-4" />
                  <span>Reports</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full justify-start gap-3 text-zinc-400 hover:text-white">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t border-zinc-800 p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-zinc-800">
                <img
                  src="/placeholder.svg?height=40&width=40"
                  alt="User"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium">Alex Morgan</p>
                <p className="text-xs text-zinc-500">Premium Investor</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-auto h-8 w-8">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-zinc-900 border-zinc-800 text-white">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-zinc-800" />
                  <DropdownMenuItem className="focus:bg-zinc-800 focus:text-white">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-zinc-800 focus:text-white">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-zinc-800" />
                  <DropdownMenuItem className="focus:bg-zinc-800 focus:text-white">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1">
          {/* Mobile Header */}
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-800 bg-black px-4 md:hidden">
            <div className="flex items-center gap-2 font-bold">
              <Globe2 className="h-6 w-6 text-blue-500" />
              <span className="text-xl">TerraNova</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </header>

          {/* Dashboard Content */}
          <main className="p-4 md:p-6 lg:p-8">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold md:text-3xl">Investment Dashboard</h1>
                <p className="text-zinc-400">Welcome back, Alex. Here&apos;s your investment overview.</p>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" className="border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
                <Button>
                  <CircleDollarSign className="mr-2 h-4 w-4" />
                  New Investment
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-zinc-900 border-zinc-800 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-zinc-400 text-sm font-normal">Portfolio Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$12.8M</div>
                  <div className="flex items-center text-blue-500 text-sm">
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                    <span>+8.2%</span>
                    <span className="text-zinc-500 ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-zinc-900 border-zinc-800 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-zinc-400 text-sm font-normal">Annual ROI</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12.4%</div>
                  <div className="flex items-center text-blue-500 text-sm">
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                    <span>+1.8%</span>
                    <span className="text-zinc-500 ml-1">from last year</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-zinc-900 border-zinc-800 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-zinc-400 text-sm font-normal">Properties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <div className="flex items-center text-blue-500 text-sm">
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                    <span>+3</span>
                    <span className="text-zinc-500 ml-1">new this quarter</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-zinc-900 border-zinc-800 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-zinc-400 text-sm font-normal">Occupancy Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">96.8%</div>
                  <div className="flex items-center text-blue-500 text-sm">
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                    <span>+2.3%</span>
                    <span className="text-zinc-500 ml-1">from last quarter</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map and Charts */}
            <div className="mb-8">
              <Card className="bg-zinc-900 border-zinc-800 text-white overflow-hidden">
                <CardHeader>
                  <CardTitle>Property Value Trends</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Average property values over the last 12 months
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={propertyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="month" stroke="#525252" />
                        <YAxis stroke="#525252" tickFormatter={(value) => `$${value / 1000}k`} />
                        <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#18181b", borderColor: "#3f3f46", color: "white" }}
                          formatter={(value) => [`$${value.toLocaleString()}`, "Value"]}
                        />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="#0ea5e9"
                          fillOpacity={1}
                          fill="url(#colorValue)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Grid */}
            <div className="mb-8 grid gap-4 md:grid-cols-2">
              <Card className="bg-zinc-900 border-zinc-800 text-white">
                <CardHeader>
                  <CardTitle>Rental Yield by Property Type</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Current yield percentages across property types
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={rentalYieldData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {rentalYieldData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{ backgroundColor: "#18181b", borderColor: "#3f3f46", color: "white" }}
                          formatter={(value) => [`${value}%`, "Yield"]}
                        />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-zinc-900 border-zinc-800 text-white">
                <CardHeader>
                  <CardTitle>Market Growth Trends</CardTitle>
                  <CardDescription className="text-zinc-400">Year-to-date growth by property sector</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={marketTrendsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                        <XAxis dataKey="month" stroke="#525252" />
                        <YAxis stroke="#525252" tickFormatter={(value) => `${value}%`} />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#18181b", borderColor: "#3f3f46", color: "white" }}
                          formatter={(value) => [`${value}%`, "Growth"]}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="residential" stroke="#0ea5e9" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="commercial" stroke="#8b5cf6" />
                        <Line type="monotone" dataKey="industrial" stroke="#f59e0b" />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Properties Table */}
            <div className="mb-8">
              <Card className="bg-zinc-900 border-zinc-800 text-white">
                <CardHeader>
                  <CardTitle>Your Properties</CardTitle>
                  <CardDescription className="text-zinc-400">Manage your real estate portfolio</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-zinc-800">
                          <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Property</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Type</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Location</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Value</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">ROI</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {properties.map((property) => (
                          <tr key={property.id} className="border-b border-zinc-800">
                            <td className="px-4 py-3 text-sm font-medium">{property.name}</td>
                            <td className="px-4 py-3 text-sm text-zinc-400">{property.type}</td>
                            <td className="px-4 py-3 text-sm text-zinc-400">{property.location}</td>
                            <td className="px-4 py-3 text-sm">{property.value}</td>
                            <td className="px-4 py-3 text-sm text-blue-500">{property.roi}</td>
                            <td className="px-4 py-3 text-sm">
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                  property.status === "Active"
                                    ? "bg-blue-500/10 text-blue-500"
                                    : "bg-amber-500/10 text-amber-500"
                                }`}
                              >
                                {property.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Regional Distribution */}
            <div className="mb-8">
              <Card className="bg-zinc-900 border-zinc-800 text-white">
                <CardHeader>
                  <CardTitle>Regional Investment Distribution</CardTitle>
                  <CardDescription className="text-zinc-400">Portfolio allocation by geographic region</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={regionData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                        <XAxis dataKey="name" stroke="#525252" />
                        <YAxis stroke="#525252" tickFormatter={(value) => `${value}%`} />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#18181b", borderColor: "#3f3f46", color: "white" }}
                          formatter={(value) => [`${value}%`, "Allocation"]}
                        />
                        <Bar dataKey="value" fill="#0ea5e9">
                          {regionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

