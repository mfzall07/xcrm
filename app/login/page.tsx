"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BarChart3, Eye, EyeOff, Lock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ModeToggle } from "@/components/mode-toggle"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("login")

  // Demo credentials
  const demoCredentials = {
    email: "demo@example.com",
    password: "demo123",
  }

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setLoginForm({
      ...loginForm,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setSignupForm({
      ...signupForm,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)

      // Check if using demo credentials
      if (loginForm.email === demoCredentials.email && loginForm.password === demoCredentials.password) {
        // Redirect to dashboard
        router.push("/dashboard")
      } else {
        // For demo purposes, we'll allow any login
        router.push("/dashboard")
      }
    }, 1500)
  }

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to dashboard
      router.push("/dashboard")
    }, 1500)
  }

  const handleDemoLogin = () => {
    setLoginForm({
      email: demoCredentials.email,
      password: demoCredentials.password,
      rememberMe: false,
    })

    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Enterprise CRM</span>
          </Link>
          <ModeToggle />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Login to your account</CardTitle>
                  <CardDescription>Enter your credentials to access your account</CardDescription>
                </CardHeader>
                <form onSubmit={handleLoginSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="name@example.com"
                          className="pl-10"
                          value={loginForm.email}
                          onChange={handleLoginChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link href="#" className="text-xs text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10"
                          value={loginForm.password}
                          onChange={handleLoginChange}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="rememberMe"
                        name="rememberMe"
                        checked={loginForm.rememberMe}
                        onCheckedChange={(checked) => setLoginForm({ ...loginForm, rememberMe: checked as boolean })}
                      />
                      <Label htmlFor="rememberMe" className="text-sm">
                        Remember me
                      </Label>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-2">
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Logging in..." : "Login"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={handleDemoLogin}
                      disabled={isLoading}
                    >
                      Login with Demo Account
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>Create an account</CardTitle>
                  <CardDescription>Enter your information to create an account</CardDescription>
                </CardHeader>
                <form onSubmit={handleSignupSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Smith"
                        value={signupForm.name}
                        onChange={handleSignupChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-email"
                          name="email"
                          type="email"
                          placeholder="name@example.com"
                          className="pl-10"
                          value={signupForm.email}
                          onChange={handleSignupChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10"
                          value={signupForm.password}
                          onChange={handleSignupChange}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={signupForm.confirmPassword}
                        onChange={handleSignupChange}
                        required
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="agreeTerms"
                        name="agreeTerms"
                        checked={signupForm.agreeTerms}
                        onCheckedChange={(checked) => setSignupForm({ ...signupForm, agreeTerms: checked as boolean })}
                        required
                      />
                      <Label htmlFor="agreeTerms" className="text-sm">
                        I agree to the{" "}
                        <Link href="#" className="text-primary hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="#" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            {activeTab === "login" ? (
              <p>
                Don't have an account?{" "}
                <button type="button" className="text-primary hover:underline" onClick={() => setActiveTab("signup")}>
                  Sign up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button type="button" className="text-primary hover:underline" onClick={() => setActiveTab("login")}>
                  Login
                </button>
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

