"use client"

import { useState } from "react"
import axios from "axios"
import Link from "next/link"
import { AlertCircle, Building2, CheckCircle2, DollarSign, Globe2, Home, Ruler, Scale } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FormData {
  sqft: number
  lot_size: number
  property_tax: number
  insurance: number
  beds: number
  baths: number
  tx_year: number
}

export default function PropertyPredictionPage() {
  const [formData, setFormData] = useState<FormData>({
    sqft: 0,
    lot_size: 0,
    property_tax: 0,
    insurance: 0,
    beds: 0,
    baths: 0,
    tx_year: 0
  })

  const [prediction, setPrediction] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Submit form and call FastAPI
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setPrediction(null)
    setError(null)

    try {
      const response = await axios.post("http://localhost:8000/predict_price", {
        ...formData,
        sqft: formData.sqft,
        lot_size: formData.lot_size,
        property_tax: formData.property_tax,
        insurance: formData.insurance,
        beds: formData.beds,
        baths: formData.baths,
        tx_year: formData.tx_year
      },{
        headers: { 'Content-Type': 'application/json' }
      });
      console.log("Prediction response:", response.data); // Add this line
      setPrediction(response.data.price_prediction)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.error("Error making prediction. Please check your inputs.", error)
      setError("Error making prediction. Please check your inputs")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-black/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <Globe2 className="h-6 w-6 text-blue-500" />
            <span className="text-xl">
                <Link href="/">TerraNova</Link></span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-zinc-400 hover:text-white">
              Home
            </Link>
            <Link href="/property-prediction" className="text-sm font-medium text-blue-500 hover:text-blue-400">
              Properties
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

      {/* Main Content */}
      <main className="flex-1">
        <div className="container py-12 md:py-20">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">Real Estate Price Prediction</h1>
            <p className="text-zinc-400">
              Use our advanced AI model to predict property values based on key metrics.
              Enter property details below to get an instant price estimate.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 z-0 opacity-20">
              <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-700 via-transparent to-transparent"></div>
            </div>
            <div className="relative z-10 py-8">
              <div className="w-full max-w-md mx-auto">
                <Card className="bg-zinc-900 border-zinc-800 text-white shadow-xl">
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">REIT Price Prediction</CardTitle>
                    <CardDescription className="text-zinc-400 text-center">
                      Enter property details to estimate market value
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="sqft" className="text-zinc-300">
                          Square Footage
                        </Label>
                        <div className="relative">
                          <Ruler className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                          <Input
                            id="sqft"
                            name="sqft"
                            type="number"
                            step="0.01"
                            placeholder="Square Footage"
                            value={formData.sqft}
                            onChange={handleChange}
                            className="pl-10 bg-zinc-950 border-zinc-800 text-white focus-visible:ring-blue-500"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lot_size" className="text-zinc-300">
                          Lot Size
                        </Label>
                        <div className="relative">
                          <Ruler className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                          <Input
                            id="lot_size"
                            name="lot_size"
                            type="number"
                            step="0.01"
                            placeholder="Lot Size"
                            value={formData.lot_size}
                            onChange={handleChange}
                            className="pl-10 bg-zinc-950 border-zinc-800 text-white focus-visible:ring-blue-500"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="property_tax" className="text-zinc-300">
                          Property Tax
                        </Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                          <Input
                            id="property_tax"
                            name="property_tax"
                            type="number"
                            step="0.01"
                            placeholder="Annual Property Tax"
                            value={formData.property_tax}
                            onChange={handleChange}
                            className="pl-10 bg-zinc-950 border-zinc-800 text-white focus-visible:ring-blue-500"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="insurance" className="text-zinc-300">
                          Insurance
                        </Label>
                        <div className="relative">
                          <Scale className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                          <Input
                            id="insurance"
                            name="insurance"
                            type="number"
                            step="0.01"
                            placeholder="Annual Insurance"
                            value={formData.insurance}
                            onChange={handleChange}
                            className="pl-10 bg-zinc-950 border-zinc-800 text-white focus-visible:ring-blue-500"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="beds" className="text-zinc-300">
                            Bedrooms
                          </Label>
                          <div className="relative">
                            <Home className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                            <Input
                              id="beds"
                              name="beds"
                              type="number"
                              placeholder="Bedrooms"
                              value={formData.beds}
                              onChange={handleChange}
                              className="pl-10 bg-zinc-950 border-zinc-800 text-white focus-visible:ring-blue-500"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="baths" className="text-zinc-300">
                            Bathrooms
                          </Label>
                          <div className="relative">
                            <Home className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                            <Input
                              id="baths"
                              name="baths"
                              type="number"
                              placeholder="Bathrooms"
                              value={formData.baths}
                              onChange={handleChange}
                              className="pl-10 bg-zinc-950 border-zinc-800 text-white focus-visible:ring-blue-500"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tx_year" className="text-zinc-300">
                          Transaction Year
                        </Label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                          <Input
                            id="tx_year"
                            name="tx_year"
                            type="number"
                            placeholder="Transaction Year (e.g., 2023)"
                            value={formData.tx_year}
                            onChange={handleChange}
                            className="pl-10 bg-zinc-950 border-zinc-800 text-white focus-visible:ring-blue-500"
                            required
                          />
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700" 
                        disabled={loading}
                      >
                        {loading ? "Calculating..." : "Predict Property Value"}
                      </Button>
                    </form>
                  </CardContent>

                  {error && (
                    <CardFooter>
                      <Alert variant="destructive" className="bg-red-900/20 border-red-800 text-red-400">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    </CardFooter>
                  )}

                  {prediction !== null && !error && (
                    console.log("Prediction value:", prediction), // Add this line
                    <CardFooter>
                      <Alert className="bg-emerald-900/20 border-emerald-800 text-emerald-400">
                        <CheckCircle2 className="h-4 w-4" />
                        <AlertTitle>Predicted Property Value</AlertTitle>
                        <AlertDescription className="flex items-center">
                          <span className="text-2xl font-bold">${typeof prediction === "number" ? prediction.toLocaleString() : ""}</span>
                          <span className="ml-2 text-sm">Estimated market value</span>
                        </AlertDescription>
                      </Alert>
                    </CardFooter>
                  )}
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-black py-8">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2 font-bold">
              <Globe2 className="h-5 w-5 text-blue-500" />
              <span>TerraNova</span>
            </div>
            <p className="text-sm text-zinc-500">
              © {new Date().getFullYear()} TerraNova Investments. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
