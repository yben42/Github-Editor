"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Star, Users, Zap, Sparkles, ArrowRight } from 'lucide-react'

interface WelcomeScreenProps {
  onGetStarted: () => void
}

export function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-4 bg-white rounded-full shadow-lg">
              <Github className="w-10 h-10 text-gray-800" />
            </div>
            <Sparkles className="w-8 h-8 text-yellow-500" />
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-4">GitHub Profile Builder</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create an amazing GitHub profile that showcases who you are! Choose from beautiful templates and customize
            with AI help.
          </p>

          <Button
            onClick={onGetStarted}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all group"
          >
            Create My Profile
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center p-6 hover:shadow-lg transition-all hover:-translate-y-1">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Beautiful Templates</h3>
              <p className="text-gray-600">Choose from professionally designed templates for developers, students, and creators</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-all hover:-translate-y-1">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered Help</h3>
              <p className="text-gray-600">Get personalized suggestions and help writing content that represents you perfectly</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-all hover:-translate-y-1">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Stand Out</h3>
              <p className="text-gray-600">Make a great first impression with a profile that showcases your skills and personality</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-gray-500 mb-4">Join thousands of developers who've created amazing profiles</p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>No coding required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Ready in minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>AI assistance included</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
