import Link from "next/link"
import { ArrowLeft, Globe2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-700 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[url('/map-background.svg')] bg-center opacity-30"></div>
      </div>
      <div className="container relative z-10 flex flex-1 items-center justify-center py-12">
        <Card className="mx-auto w-full max-w-md border-zinc-800 bg-zinc-900/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="flex items-center gap-2 font-bold">
                <Globe2 className="h-6 w-6 text-blue-500" />
                <span className="text-xl">
                    <Link href="/">TerraNova</Link></span>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Sign in to your account</CardTitle>
            <CardDescription className="text-zinc-400">
              Enter your email and password to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="name@example.com"
                required
                type="email"
                className="border-zinc-800 bg-zinc-950 text-white"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-sm text-blue-500 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" required type="password" className="border-zinc-800 bg-zinc-950 text-white" />
            </div>
            <Button className="w-full" type="submit">
              Sign In
            </Button>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-800" />
              </div>
              <span className="relative bg-zinc-900 px-2 text-xs text-zinc-500">Or continue with</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="border-zinc-800 bg-zinc-950 text-white hover:bg-zinc-900">
                Google
              </Button>
              <Button variant="outline" className="border-zinc-800 bg-zinc-950 text-white hover:bg-zinc-900">
                Apple
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-zinc-500">
              Don&apos;t have an account?{" "}
              <Link href="#" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </div>
            <Button variant="ghost" size="sm" className="mx-auto" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to home
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

