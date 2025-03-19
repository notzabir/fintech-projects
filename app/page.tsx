import Link from "next/link"
import { ArrowRight, Building2, Globe2, LineChart, MapPin, Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen min-w-screen flex-col bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-black/80 backdrop-blur-sm">
        <div className="container max-w-screen-xl mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <Globe2 className="h-6 w-6 text-blue-500" />
            <span className="text-xl">TerraNova</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/property-prediction" className="text-sm font-medium text-zinc-400 hover:text-white">
              Properties
            </Link>
            <Link href="#" className="text-sm font-medium text-zinc-400 hover:text-white">
              Investments
            </Link>
            <Link href="/fraud-analysis" className="text-sm font-medium text-zinc-400 hover:text-white">
              Analytics
            </Link>
            <Link href="#" className="text-sm font-medium text-zinc-400 hover:text-white">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-zinc-400 hover:text-white">
              Login
            </Link>
            <Button asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-700 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[url('/map-background.svg')] bg-center opacity-30"></div>
        </div>
        <div className="container max-w-screen-xl mx-auto relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Discover Smarter Real Estate
              <span className="text-blue-500"> Investments</span>
            </h1>
            <p className="mb-10 text-xl text-zinc-400">
              Data-driven insights to help you find, analyze, and invest in the most profitable properties across the
              globe.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-black">
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Map Tab Section */}
      <section className="relative -mt-20 pb-20">
        <div className="container max-w-screen-xl mx-auto">
          <div className="relative mx-auto rounded-t-xl border border-zinc-800 bg-zinc-900 shadow-xl overflow-hidden">
            <div className="flex items-center border-b border-zinc-800 bg-zinc-950 px-4 py-2">
              <div className="flex space-x-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              </div>
              <div className="ml-4 text-sm font-medium">Investment Map - Downtown District</div>
            </div>
            <div className="relative h-[600px] w-full bg-[#f0f4f8]">
              <div className="absolute inset-0">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/shutterstock_1604386048.jpg-xazy4GeIi3meFRCWl8FgWQ1V1e0l2u.jpeg"
                  alt="City Map"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Property Markers */}
              <div className="absolute left-[15%] top-[20%] group">
                <div className="relative">
                  <div className="flex flex-col items-center">
                    <div className="animate-bounce">
                      <div className="h-12 w-12 rounded-full bg-blue-500 p-3 shadow-lg">
                        <Building2 className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="h-4 w-1 bg-blue-500"></div>
                  </div>
                  <div className="absolute left-16 top-0 hidden w-64 rounded-lg border border-zinc-800 bg-zinc-950/90 p-4 shadow-xl backdrop-blur-sm group-hover:block">
                    <h3 className="mb-2 font-bold text-white">Medical Center Complex</h3>
                    <div className="mb-2 text-2xl font-bold text-blue-400">$8.2M</div>
                    <div className="mb-1 text-sm text-zinc-400">Healthcare Investment Opportunity</div>
                    <div className="mb-3 text-sm text-zinc-500">15,000 sq ft | Class A</div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-blue-400">ROI: 12.5%</span>
                      <span className="rounded-full bg-blue-500/10 px-2 py-1 text-blue-400">Medical District</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute left-[45%] top-[40%] group">
                <div className="relative">
                  <div className="flex flex-col items-center">
                    <div className="animate-bounce">
                      <div className="h-12 w-12 rounded-full bg-purple-500 p-3 shadow-lg">
                        <Building2 className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="h-4 w-1 bg-purple-500"></div>
                  </div>
                  <div className="absolute left-16 top-0 hidden w-64 rounded-lg border border-zinc-800 bg-zinc-950/90 p-4 shadow-xl backdrop-blur-sm group-hover:block">
                    <h3 className="mb-2 font-bold text-white">Central Business Tower</h3>
                    <div className="mb-2 text-2xl font-bold text-purple-400">$12.5M</div>
                    <div className="mb-1 text-sm text-zinc-400">Prime Office Space</div>
                    <div className="mb-3 text-sm text-zinc-500">25,000 sq ft | Class A+</div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-purple-400">ROI: 9.8%</span>
                      <span className="rounded-full bg-purple-500/10 px-2 py-1 text-purple-400">
                        Financial District
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute right-[25%] top-[30%] group">
                <div className="relative">
                  <div className="flex flex-col items-center">
                    <div className="animate-bounce">
                      <div className="h-12 w-12 rounded-full bg-teal-500 p-3 shadow-lg">
                        <Building2 className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="h-4 w-1 bg-teal-500"></div>
                  </div>
                  <div className="absolute right-16 top-0 hidden w-64 rounded-lg border border-zinc-800 bg-zinc-950/90 p-4 shadow-xl backdrop-blur-sm group-hover:block">
                    <h3 className="mb-2 font-bold text-white">Tech Innovation Hub</h3>
                    <div className="mb-2 text-2xl font-bold text-teal-400">$15.8M</div>
                    <div className="mb-1 text-sm text-zinc-400">Mixed-Use Development</div>
                    <div className="mb-3 text-sm text-zinc-500">30,000 sq ft | Modern</div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-teal-400">ROI: 14.2%</span>
                      <span className="rounded-full bg-teal-500/10 px-2 py-1 text-teal-400">Innovation District</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Controls */}
              <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-white/90 border-zinc-200 hover:bg-white"
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-white/90 border-zinc-200 hover:bg-white"
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 rounded-lg border border-zinc-800 bg-zinc-950/80 p-3 backdrop-blur-sm">
                <div className="mb-2 text-xs font-medium text-white">Investment Opportunities</div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-zinc-300">
                    <div className="h-2.5 w-2.5 rounded-full bg-blue-500"></div>
                    <span>Healthcare ($5M - $10M)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-300">
                    <div className="h-2.5 w-2.5 rounded-full bg-purple-500"></div>
                    <span>Office Space ($10M - $15M)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-300">
                    <div className="h-2.5 w-2.5 rounded-full bg-teal-500"></div>
                    <span>Mixed-Use ($15M+)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-zinc-900">
        <div className="container max-w-screen-xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Why Choose TerraNova</h2>
            <p className="mx-auto max-w-2xl text-zinc-400">
              Our platform combines advanced analytics with real estate expertise to help you make informed investment
              decisions.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
              <div className="mb-4 inline-flex rounded-lg bg-blue-500/10 p-3">
                <MapPin className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Location Intelligence</h3>
              <p className="text-zinc-400">
                Analyze neighborhoods, property values, and growth trends with our interactive maps.
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
              <div className="mb-4 inline-flex rounded-lg bg-blue-500/10 p-3">
                <LineChart className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Market Analytics</h3>
              <p className="text-zinc-400">
                Access real-time data on market trends, rental yields, and property appreciation rates.
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
              <div className="mb-4 inline-flex rounded-lg bg-blue-500/10 p-3">
                <Building2 className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Portfolio Management</h3>
              <p className="text-zinc-400">
                Track and optimize your real estate investments with our comprehensive dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container max-w-screen-xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 to-zinc-900 p-8 md:p-12">
            <div className="absolute inset-0 bg-[url('/map-pattern.svg')] bg-center opacity-10"></div>
            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold">Ready to Transform Your Investment Strategy?</h2>
              <p className="mb-8 text-lg text-zinc-300">
                Join thousands of investors who are already using TerraNova to discover high-performing properties and
                maximize their returns.
              </p>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Your Free Trial
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-zinc-900">
        <div className="container max-w-screen-xl mx-auto">
          <h2 className="mb-12 text-center text-3xl font-bold">What Our Investors Say</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
              <div className="mb-4 flex items-center">
                <div className="mr-4 h-12 w-12 overflow-hidden rounded-full bg-zinc-800">
                  <img src="/placeholder.svg" height={48} width={48} alt="User" className="h-full w-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold">Sarah Johnson</h4>
                  <p className="text-sm text-zinc-400">Real Estate Investor</p>
                </div>
              </div>
              <p className="text-zinc-300">
                &quot;TerraNova&apos;s analytics helped me identify an emerging neighborhood that has since appreciated 28% in
                just 18 months.&quot;
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
              <div className="mb-4 flex items-center">
                <div className="mr-4 h-12 w-12 overflow-hidden rounded-full bg-zinc-800">
                  <img src="/placeholder.svg?height=48&width=48" alt="User" className="h-full w-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold">Michael Chen</h4>
                  <p className="text-sm text-zinc-400">Property Developer</p>
                </div>
              </div>
              <p className="text-zinc-300">
                &quot;The market insights provided by TerraNova have been invaluable for our development planning and
                investment strategy.&quot;
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
              <div className="mb-4 flex items-center">
                <div className="mr-4 h-12 w-12 overflow-hidden rounded-full bg-zinc-800">
                  <img src="/placeholder.svg?height=48&width=48" alt="User" className="h-full w-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold">Alex Rodriguez</h4>
                  <p className="text-sm text-zinc-400">Investment Advisor</p>
                </div>
              </div>
              <p className="text-zinc-300">
                &quot;I recommend TerraNova to all my clients. The data visualization and predictive analytics are
                game-changers.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-black py-12">
        <div className="container max-w-screen-xl mx-auto">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2 font-bold">
              <Globe2 className="h-6 w-6 text-blue-500" />
              <span className="text-xl">TerraNova</span>
            </div>
            <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              <Link href="#" className="text-sm text-zinc-400 hover:text-white">
                About
              </Link>
              <Link href="#" className="text-sm text-zinc-400 hover:text-white">
                Features
              </Link>
              <Link href="#" className="text-sm text-zinc-400 hover:text-white">
                Pricing
              </Link>
              <Link href="#" className="text-sm text-zinc-400 hover:text-white">
                Blog
              </Link>
              <Link href="#" className="text-sm text-zinc-400 hover:text-white">
                Contact
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-zinc-400 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </Link>
            </div>
          </div>
          <div className="mt-8 border-t border-zinc-800 pt-8 text-center text-sm text-zinc-500">
            <p>© {new Date().getFullYear()} TerraNova Investments. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

