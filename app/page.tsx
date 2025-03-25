import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { BarChart3, Users, CreditCard, MessageSquare, Bell, ArrowRight, CheckCircle2, Tag } from "lucide-react"
import { testimonials } from "@/lib/data"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Enterprise CRM</span>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden gap-6 md:flex">
              <Link href="#features" className="text-sm font-medium transition-colors hover:text-primary">
                Features
              </Link>
              <Link href="#testimonials" className="text-sm font-medium transition-colors hover:text-primary">
                Testimonials
              </Link>
              <Link href="#pricing" className="text-sm font-medium transition-colors hover:text-primary">
                Pricing
              </Link>
              <Link href="#contact" className="text-sm font-medium transition-colors hover:text-primary">
                Contact
              </Link>
            </nav>
            <div className="flex items-center gap-2">
              <ModeToggle />
              <Link href="/login">
                <Button variant="outline" className="hidden sm:inline-flex">
                  Log In
                </Button>
              </Link>
              <Link href="/login">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Streamline Your Business with Our Enterprise CRM
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  All-in-one customer relationship management solution to help you grow your business, manage leads, and
                  increase customer satisfaction.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/login">
                  <Button size="lg" className="gap-1">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#demo">
                  <Button size="lg" variant="outline">
                    View Demo
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full h-[400px] overflow-hidden rounded-xl border bg-background p-2">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Dashboard Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Powerful Features</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Everything you need to manage your customer relationships and grow your business
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            {/* Feature 1 */}
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-background shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Customer Management</h3>
              <p className="text-sm text-muted-foreground text-center">
                Manage all your customer information in one place with detailed profiles and interaction history.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-background shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Tag className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Lead Management</h3>
              <p className="text-sm text-muted-foreground text-center">
                Track and manage leads through your sales pipeline with our intuitive kanban board.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-background shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Invoicing & Billing</h3>
              <p className="text-sm text-muted-foreground text-center">
                Create and manage invoices, track payments, and generate financial reports.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-background shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Communication</h3>
              <p className="text-sm text-muted-foreground text-center">
                Integrated messaging, email, and chat to keep in touch with your customers.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-background shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Bell className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Marketing & Broadcasts</h3>
              <p className="text-sm text-muted-foreground text-center">
                Create and send targeted marketing campaigns to your customers and leads.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-background shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Analytics & Reports</h3>
              <p className="text-sm text-muted-foreground text-center">
                Gain insights into your business with comprehensive analytics and customizable reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Trusted by Businesses</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                See what our customers have to say about our CRM solution
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            {/* Map through testimonials */}
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <div key={index} className="flex flex-col space-y-4 rounded-lg border p-6 bg-background shadow-sm">
                <div className="flex items-center space-x-4">
                  <img src={testimonial.avatar || "/placeholder.svg"} alt="Avatar" className="h-10 w-10 rounded-full" />
                  <div>
                    <h3 className="text-lg font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">"{testimonial.content}"</p>
                <div className="flex text-yellow-500">
                  <CheckCircle2 className="h-5 w-5" />
                  <CheckCircle2 className="h-5 w-5" />
                  <CheckCircle2 className="h-5 w-5" />
                  <CheckCircle2 className="h-5 w-5" />
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple, Transparent Pricing</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Choose the plan that's right for your business
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-8">
            {/* Starter Plan */}
            <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Starter</h3>
                <p className="text-sm text-muted-foreground">Perfect for small businesses</p>
              </div>
              <div className="mt-4 flex items-baseline text-5xl font-bold">
                $29<span className="text-sm font-normal text-muted-foreground">/month</span>
              </div>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">Up to 500 customers</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">Basic lead management</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">Simple invoicing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">Email support</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/login">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            </div>

            {/* Professional Plan */}
            <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm relative">
              <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                Most Popular
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Professional</h3>
                <p className="text-sm text-muted-foreground">For growing businesses</p>
              </div>
              <div className="mt-4 flex items-baseline text-5xl font-bold">
                $79<span className="text-sm font-normal text-muted-foreground">/month</span>
              </div>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">Up to 2,500 customers</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">Advanced lead management</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">Full invoicing & billing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">Marketing broadcasts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">Priority support</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/login">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Enterprise</h3>
                <p className="text-sm text-muted-foreground">For large organizations</p>
              </div>
              <div className="mt-4 flex items-baseline text-5xl font-bold">
                $199<span className="text-sm font-normal text-muted-foreground">/month</span>
              </div>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">Unlimited customers</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">Custom workflows</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">Advanced analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">API access</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">Dedicated account manager</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/login">
                  <Button className="w-full">Contact Sales</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="demo" className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Transform Your Business?</h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Try our CRM free for 14 days. No credit card required.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/login">
                <Button size="lg" variant="secondary" className="gap-1">
                  Start Free Trial <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#contact">
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary">
                  Schedule a Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 md:py-12 bg-background border-t">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Enterprise CRM</span>
              </div>
              <p className="text-sm text-muted-foreground">
                All-in-one customer relationship management solution for your business.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Roadmap
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© 2023 Enterprise CRM. All rights reserved.</p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
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
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
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
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
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
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

