"use client"

import { useState, useEffect } from "react"
import { Save, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { testimonials } from "@/lib/data"

// Define types for landing page content
interface HeroSection {
  title: string
  description: string
  primaryButtonText: string
  secondaryButtonText: string
  imageUrl: string
}

interface Feature {
  id: string
  title: string
  description: string
  icon: string
}

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  avatar: string
}

interface PricingPlan {
  id: string
  name: string
  description: string
  price: string
  features: string[]
  buttonText: string
  popular: boolean
}

interface CTASection {
  title: string
  description: string
  primaryButtonText: string
  secondaryButtonText: string
}

interface LandingPageContent {
  hero: HeroSection
  features: Feature[]
  testimonials: Testimonial[]
  pricingPlans: PricingPlan[]
  cta: CTASection
}

// Initial data based on the current landing page
const initialLandingPageContent: LandingPageContent = {
  hero: {
    title: "Streamline Your Business with Our Enterprise CRM",
    description:
      "All-in-one customer relationship management solution to help you grow your business, manage leads, and increase customer satisfaction.",
    primaryButtonText: "Get Started",
    secondaryButtonText: "View Demo",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  features: [
    {
      id: "feature-1",
      title: "Customer Management",
      description: "Manage all your customer information in one place with detailed profiles and interaction history.",
      icon: "Users",
    },
    {
      id: "feature-2",
      title: "Lead Management",
      description: "Track and manage leads through your sales pipeline with our intuitive kanban board.",
      icon: "Tag",
    },
    {
      id: "feature-3",
      title: "Invoicing & Billing",
      description: "Create and manage invoices, track payments, and generate financial reports.",
      icon: "CreditCard",
    },
    {
      id: "feature-4",
      title: "Communication",
      description: "Integrated messaging, email, and chat to keep in touch with your customers.",
      icon: "MessageSquare",
    },
    {
      id: "feature-5",
      title: "Marketing & Broadcasts",
      description: "Create and send targeted marketing campaigns to your customers and leads.",
      icon: "Bell",
    },
    {
      id: "feature-6",
      title: "Analytics & Reports",
      description: "Gain insights into your business with comprehensive analytics and customizable reports.",
      icon: "BarChart3",
    },
  ],
  testimonials: testimonials.map((t, index) => ({
    id: `testimonial-${index + 1}`,
    name: t.name,
    role: t.role,
    company: t.company,
    content: t.content,
    avatar: t.avatar,
  })),
  pricingPlans: [
    {
      id: "plan-1",
      name: "Starter",
      description: "Perfect for small businesses",
      price: "$29/month",
      features: ["Up to 500 customers", "Basic lead management", "Simple invoicing", "Email support"],
      buttonText: "Get Started",
      popular: false,
    },
    {
      id: "plan-2",
      name: "Professional",
      description: "For growing businesses",
      price: "$79/month",
      features: [
        "Up to 2,500 customers",
        "Advanced lead management",
        "Full invoicing & billing",
        "Marketing broadcasts",
        "Priority support",
      ],
      buttonText: "Get Started",
      popular: true,
    },
    {
      id: "plan-3",
      name: "Enterprise",
      description: "For large organizations",
      price: "$199/month",
      features: [
        "Unlimited customers",
        "Custom workflows",
        "Advanced analytics",
        "API access",
        "Dedicated account manager",
      ],
      buttonText: "Contact Sales",
      popular: false,
    },
  ],
  cta: {
    title: "Ready to Transform Your Business?",
    description: "Try our CRM free for 14 days. No credit card required.",
    primaryButtonText: "Start Free Trial",
    secondaryButtonText: "Schedule a Demo",
  },
}

export function LandingPageSettings() {
  const [content, setContent] = useState<LandingPageContent>(initialLandingPageContent)
  const [activeTab, setActiveTab] = useState("hero")
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  // Load content from localStorage on component mount
  useEffect(() => {
    const savedContent = localStorage.getItem("landingPageContent")
    if (savedContent) {
      try {
        setContent(JSON.parse(savedContent))
      } catch (error) {
        console.error("Failed to parse saved content:", error)
      }
    }
  }, [])

  const handleSave = () => {
    setIsSaving(true)

    // Simulate API call with timeout
    setTimeout(() => {
      // Save to localStorage for demo purposes
      localStorage.setItem("landingPageContent", JSON.stringify(content))

      setIsSaving(false)
      toast({
        title: "Success",
        description: "Landing page content saved successfully",
      })
    }, 1000)
  }

  const updateHero = (field: keyof HeroSection, value: string) => {
    setContent({
      ...content,
      hero: {
        ...content.hero,
        [field]: value,
      },
    })
  }

  const updateFeature = (id: string, field: keyof Feature, value: string) => {
    setContent({
      ...content,
      features: content.features.map((feature) => (feature.id === id ? { ...feature, [field]: value } : feature)),
    })
  }

  const addFeature = () => {
    const newId = `feature-${content.features.length + 1}`
    setContent({
      ...content,
      features: [
        ...content.features,
        {
          id: newId,
          title: "New Feature",
          description: "Description of the new feature",
          icon: "Star",
        },
      ],
    })
  }

  const removeFeature = (id: string) => {
    setContent({
      ...content,
      features: content.features.filter((feature) => feature.id !== id),
    })
  }

  const updateTestimonial = (id: string, field: keyof Testimonial, value: string) => {
    setContent({
      ...content,
      testimonials: content.testimonials.map((testimonial) =>
        testimonial.id === id ? { ...testimonial, [field]: value } : testimonial,
      ),
    })
  }

  const addTestimonial = () => {
    const newId = `testimonial-${content.testimonials.length + 1}`
    setContent({
      ...content,
      testimonials: [
        ...content.testimonials,
        {
          id: newId,
          name: "New Customer",
          role: "Position",
          company: "Company Name",
          content: "This is a testimonial from a satisfied customer.",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      ],
    })
  }

  const removeTestimonial = (id: string) => {
    setContent({
      ...content,
      testimonials: content.testimonials.filter((testimonial) => testimonial.id !== id),
    })
  }

  const updatePricingPlan = (id: string, field: keyof PricingPlan, value: any) => {
    setContent({
      ...content,
      pricingPlans: content.pricingPlans.map((plan) => (plan.id === id ? { ...plan, [field]: value } : plan)),
    })
  }

  const updatePlanFeature = (planId: string, index: number, value: string) => {
    setContent({
      ...content,
      pricingPlans: content.pricingPlans.map((plan) => {
        if (plan.id === planId) {
          const features = [...plan.features]
          features[index] = value
          return { ...plan, features }
        }
        return plan
      }),
    })
  }

  const addPlanFeature = (planId: string) => {
    setContent({
      ...content,
      pricingPlans: content.pricingPlans.map((plan) => {
        if (plan.id === planId) {
          return { ...plan, features: [...plan.features, "New feature"] }
        }
        return plan
      }),
    })
  }

  const removePlanFeature = (planId: string, index: number) => {
    setContent({
      ...content,
      pricingPlans: content.pricingPlans.map((plan) => {
        if (plan.id === planId) {
          const features = [...plan.features]
          features.splice(index, 1)
          return { ...plan, features }
        }
        return plan
      }),
    })
  }

  const updateCTA = (field: keyof CTASection, value: string) => {
    setContent({
      ...content,
      cta: {
        ...content.cta,
        [field]: value,
      },
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Landing Page Content</CardTitle>
        <CardDescription>Customize the content displayed on your landing page.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="hero" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="hero">Hero Section</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="cta">CTA Section</TabsTrigger>
          </TabsList>

          {/* Hero Section */}
          <TabsContent value="hero" className="space-y-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                <Label htmlFor="hero-title" className="md:text-right">
                  Title
                </Label>
                <Input
                  id="hero-title"
                  value={content.hero.title}
                  onChange={(e) => updateHero("title", e.target.value)}
                  className="md:col-span-3"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 items-start gap-4">
                <Label htmlFor="hero-description" className="md:text-right pt-2">
                  Description
                </Label>
                <Textarea
                  id="hero-description"
                  value={content.hero.description}
                  onChange={(e) => updateHero("description", e.target.value)}
                  className="md:col-span-3"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                <Label htmlFor="hero-primary-button" className="md:text-right">
                  Primary Button Text
                </Label>
                <Input
                  id="hero-primary-button"
                  value={content.hero.primaryButtonText}
                  onChange={(e) => updateHero("primaryButtonText", e.target.value)}
                  className="md:col-span-3"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                <Label htmlFor="hero-secondary-button" className="md:text-right">
                  Secondary Button Text
                </Label>
                <Input
                  id="hero-secondary-button"
                  value={content.hero.secondaryButtonText}
                  onChange={(e) => updateHero("secondaryButtonText", e.target.value)}
                  className="md:col-span-3"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                <Label htmlFor="hero-image" className="md:text-right">
                  Image URL
                </Label>
                <Input
                  id="hero-image"
                  value={content.hero.imageUrl}
                  onChange={(e) => updateHero("imageUrl", e.target.value)}
                  className="md:col-span-3"
                />
              </div>
            </div>
          </TabsContent>

          {/* Features Section */}
          <TabsContent value="features" className="space-y-4">
            {content.features.map((feature, index) => (
              <div key={feature.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Feature {index + 1}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFeature(feature.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                    <Label htmlFor={`feature-title-${feature.id}`} className="md:text-right">
                      Title
                    </Label>
                    <Input
                      id={`feature-title-${feature.id}`}
                      value={feature.title}
                      onChange={(e) => updateFeature(feature.id, "title", e.target.value)}
                      className="md:col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 items-start gap-4">
                    <Label htmlFor={`feature-description-${feature.id}`} className="md:text-right pt-2">
                      Description
                    </Label>
                    <Textarea
                      id={`feature-description-${feature.id}`}
                      value={feature.description}
                      onChange={(e) => updateFeature(feature.id, "description", e.target.value)}
                      className="md:col-span-3"
                      rows={2}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                    <Label htmlFor={`feature-icon-${feature.id}`} className="md:text-right">
                      Icon
                    </Label>
                    <Input
                      id={`feature-icon-${feature.id}`}
                      value={feature.icon}
                      onChange={(e) => updateFeature(feature.id, "icon", e.target.value)}
                      className="md:col-span-3"
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button onClick={addFeature} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Feature
            </Button>
          </TabsContent>

          {/* Testimonials Section */}
          <TabsContent value="testimonials" className="space-y-4">
            {content.testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Testimonial {index + 1}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTestimonial(testimonial.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                    <Label htmlFor={`testimonial-name-${testimonial.id}`} className="md:text-right">
                      Name
                    </Label>
                    <Input
                      id={`testimonial-name-${testimonial.id}`}
                      value={testimonial.name}
                      onChange={(e) => updateTestimonial(testimonial.id, "name", e.target.value)}
                      className="md:col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                    <Label htmlFor={`testimonial-role-${testimonial.id}`} className="md:text-right">
                      Role
                    </Label>
                    <Input
                      id={`testimonial-role-${testimonial.id}`}
                      value={testimonial.role}
                      onChange={(e) => updateTestimonial(testimonial.id, "role", e.target.value)}
                      className="md:col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                    <Label htmlFor={`testimonial-company-${testimonial.id}`} className="md:text-right">
                      Company
                    </Label>
                    <Input
                      id={`testimonial-company-${testimonial.id}`}
                      value={testimonial.company}
                      onChange={(e) => updateTestimonial(testimonial.id, "company", e.target.value)}
                      className="md:col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 items-start gap-4">
                    <Label htmlFor={`testimonial-content-${testimonial.id}`} className="md:text-right pt-2">
                      Content
                    </Label>
                    <Textarea
                      id={`testimonial-content-${testimonial.id}`}
                      value={testimonial.content}
                      onChange={(e) => updateTestimonial(testimonial.id, "content", e.target.value)}
                      className="md:col-span-3"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                    <Label htmlFor={`testimonial-avatar-${testimonial.id}`} className="md:text-right">
                      Avatar URL
                    </Label>
                    <Input
                      id={`testimonial-avatar-${testimonial.id}`}
                      value={testimonial.avatar}
                      onChange={(e) => updateTestimonial(testimonial.id, "avatar", e.target.value)}
                      className="md:col-span-3"
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button onClick={addTestimonial} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Testimonial
            </Button>
          </TabsContent>

          {/* Pricing Section */}
          <TabsContent value="pricing" className="space-y-4">
            {content.pricingPlans.map((plan, index) => (
              <div key={plan.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Plan {index + 1}</h3>
                </div>
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                    <Label htmlFor={`plan-name-${plan.id}`} className="md:text-right">
                      Name
                    </Label>
                    <Input
                      id={`plan-name-${plan.id}`}
                      value={plan.name}
                      onChange={(e) => updatePricingPlan(plan.id, "name", e.target.value)}
                      className="md:col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                    <Label htmlFor={`plan-description-${plan.id}`} className="md:text-right">
                      Description
                    </Label>
                    <Input
                      id={`plan-description-${plan.id}`}
                      value={plan.description}
                      onChange={(e) => updatePricingPlan(plan.id, "description", e.target.value)}
                      className="md:col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                    <Label htmlFor={`plan-price-${plan.id}`} className="md:text-right">
                      Price
                    </Label>
                    <Input
                      id={`plan-price-${plan.id}`}
                      value={plan.price}
                      onChange={(e) => updatePricingPlan(plan.id, "price", e.target.value)}
                      className="md:col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                    <Label htmlFor={`plan-button-${plan.id}`} className="md:text-right">
                      Button Text
                    </Label>
                    <Input
                      id={`plan-button-${plan.id}`}
                      value={plan.buttonText}
                      onChange={(e) => updatePricingPlan(plan.id, "buttonText", e.target.value)}
                      className="md:col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                    <Label className="md:text-right">Popular</Label>
                    <div className="md:col-span-3">
                      <input
                        type="checkbox"
                        checked={plan.popular}
                        onChange={(e) => updatePricingPlan(plan.id, "popular", e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm">Mark as popular plan</span>
                    </div>
                  </div>

                  <Separator className="my-2" />

                  <div className="grid grid-cols-1 md:grid-cols-4 items-start gap-4">
                    <Label className="md:text-right pt-2">Features</Label>
                    <div className="md:col-span-3 space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <Input
                            value={feature}
                            onChange={(e) => updatePlanFeature(plan.id, featureIndex, e.target.value)}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removePlanFeature(plan.id, featureIndex)}
                            className="text-destructive h-8 w-8"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button variant="outline" size="sm" onClick={() => addPlanFeature(plan.id)} className="mt-2">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Feature
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          {/* CTA Section */}
          <TabsContent value="cta" className="space-y-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                <Label htmlFor="cta-title" className="md:text-right">
                  Title
                </Label>
                <Input
                  id="cta-title"
                  value={content.cta.title}
                  onChange={(e) => updateCTA("title", e.target.value)}
                  className="md:col-span-3"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 items-start gap-4">
                <Label htmlFor="cta-description" className="md:text-right pt-2">
                  Description
                </Label>
                <Textarea
                  id="cta-description"
                  value={content.cta.description}
                  onChange={(e) => updateCTA("description", e.target.value)}
                  className="md:col-span-3"
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                <Label htmlFor="cta-primary-button" className="md:text-right">
                  Primary Button Text
                </Label>
                <Input
                  id="cta-primary-button"
                  value={content.cta.primaryButtonText}
                  onChange={(e) => updateCTA("primaryButtonText", e.target.value)}
                  className="md:col-span-3"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                <Label htmlFor="cta-secondary-button" className="md:text-right">
                  Secondary Button Text
                </Label>
                <Input
                  id="cta-secondary-button"
                  value={content.cta.secondaryButtonText}
                  onChange={(e) => updateCTA("secondaryButtonText", e.target.value)}
                  className="md:col-span-3"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </CardFooter>
    </Card>
  )
}

