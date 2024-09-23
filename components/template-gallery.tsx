'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown, Search, ExternalLink } from 'lucide-react'

const templates = [
  {
    id: 1,
    title: "Next.js Boilerplate",
    description: "Get started with Next.js and React in seconds.",
    image: "/placeholder.svg?height=200&width=400",
    creator: "Vercel",
  },
  {
    id: 2,
    title: "Image Gallery Starter",
    description: "An image gallery built on Next.js and Cloudinary.",
    image: "/placeholder.svg?height=200&width=400",
    creator: "Vercel",
  },
  {
    id: 3,
    title: "Next.js AI Chatbot",
    description: "A full-featured, hackable Next.js AI chatbot built by Vercel",
    image: "/placeholder.svg?height=200&width=400",
    creator: "Vercel",
  },
  // Add more templates as needed
]

const filterOptions = [
  "AI", "Starter", "Ecommerce", "Blog", "Edge Functions", "Edge Middleware",
  "Edge Config", "Portfolio", "SaaS", "CMS", "Cron", "Multi-tenant apps", "Realtime Apps"
]

export function TemplateGallery() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 p-4 border-r border-gray-800">
        <h2 className="text-xl font-bold mb-4">Filter Templates</h2>
        <Button variant="outline" className="w-full justify-between mb-4">
          Clear
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
        <div className="relative mb-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-8 border-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2">Use Case</h3>
          {filterOptions.map((option) => (
            <div key={option} className="flex items-center mb-2">
              <Checkbox id={option} className="border-gray-700" />
              <label htmlFor={option} className="ml-2 text-sm">{option}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="border-gray-800">
              <CardContent className="p-0">
                <img src={template.image} alt={template.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{template.title}</h3>
                  <p className="text-sm text-gray-400 mb-4">{template.description}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t border-gray-800 p-4">
                <div className="flex items-center">
                  <span className="text-xs text-gray-500">by</span>
                  <img src="/placeholder.svg?height=20&width=20" alt="Creator logo" className="w-5 h-5 mx-1" />
                  <span className="text-sm">{template.creator}</span>
                </div>
                <Button variant="ghost" size="icon">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}