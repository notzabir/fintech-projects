"use client"

import type React from "react"

import { useState } from "react"
import axios from "axios"
import Link from "next/link"
import { AlertCircle, Calendar, CheckCircle2, Clock, DollarSign, Globe2, FileText, Paperclip, X } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function FraudAnalysisPage() {
  const [TX_AMOUNT, setTX_AMOUNT] = useState("")
  const [TX_TIME_SECONDS, setTX_TIME_SECONDS] = useState("")
  const [TX_TIME_DAYS, setTX_TIME_DAYS] = useState("")
  const [prediction, setPrediction] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [files, setFiles] = useState<File[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Create FormData to handle file uploads
      const formData = new FormData()
      formData.append("TX_AMOUNT", TX_AMOUNT)
      formData.append("TX_TIME_SECONDS", TX_TIME_SECONDS)
      formData.append("TX_TIME_DAYS", TX_TIME_DAYS)

      // Append each file to the form data
      files.forEach((file) => {
        formData.append("files", file)
      })

      // For now, we'll still use the original endpoint for prediction
      // In a real implementation, you'd update the endpoint to handle files
      const response = await axios.post("http://localhost:8000/predict", {
        TX_AMOUNT: Number.parseFloat(TX_AMOUNT),
        TX_TIME_SECONDS: Number.parseInt(TX_TIME_SECONDS),
        TX_TIME_DAYS: Number.parseInt(TX_TIME_DAYS),
      })
      setPrediction(response.data.fraud_prediction)
    } catch (error) {
      console.error("Error making prediction:", error)
      setError("Failed to get prediction. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
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
            <Link href="/property-prediction" className="text-sm font-medium text-zinc-400 hover:text-white">
              Properties
            </Link>
            <Link href="/fraud-analysis" className="text-sm font-medium text-blue-500 hover:text-blue-400">
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
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">Transaction Fraud Analysis</h1>
            <p className="text-zinc-400">
              Use our advanced AI model to detect potential fraud in financial transactions. Enter transaction details
              below to get an instant risk assessment.
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
                    <CardTitle className="text-2xl font-bold text-center">Transaction Fraud Analysis</CardTitle>
                    <CardDescription className="text-zinc-400 text-center">
                      Enter transaction details to check for potential fraud
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="tx-amount" className="text-zinc-300">
                          Transaction Amount
                        </Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                          <Input
                            id="tx-amount"
                            type="number"
                            step="0.01"
                            placeholder="Enter amount"
                            value={TX_AMOUNT}
                            onChange={(e) => setTX_AMOUNT(e.target.value)}
                            className="pl-10 bg-zinc-950 border-zinc-800 text-white focus-visible:ring-blue-500"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tx-time-seconds" className="text-zinc-300">
                          Transaction Time (Seconds)
                        </Label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                          <Input
                            id="tx-time-seconds"
                            type="number"
                            placeholder="Seconds of day"
                            value={TX_TIME_SECONDS}
                            onChange={(e) => setTX_TIME_SECONDS(e.target.value)}
                            className="pl-10 bg-zinc-950 border-zinc-800 text-white focus-visible:ring-blue-500"
                            required
                          />
                        </div>
                        <p className="text-xs text-zinc-500">Time of day in seconds (0-86400)</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tx-time-days" className="text-zinc-300">
                          Transaction Day
                        </Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500" />
                          <Input
                            id="tx-time-days"
                            type="number"
                            placeholder="Day of week"
                            value={TX_TIME_DAYS}
                            onChange={(e) => setTX_TIME_DAYS(e.target.value)}
                            className="pl-10 bg-zinc-950 border-zinc-800 text-white focus-visible:ring-blue-500"
                            required
                          />
                        </div>
                        <p className="text-xs text-zinc-500">Day of the week (0-6, where 0 is Monday)</p>
                      </div>

                      {/* File Upload Section */}
                      <div className="space-y-2">
                        <Label htmlFor="file-upload" className="text-zinc-300">
                          Supporting Documents (Optional)
                        </Label>
                        <div className="relative">
                          <div className="flex items-center justify-center w-full">
                            <label
                              htmlFor="file-upload"
                              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-zinc-700 bg-zinc-950 hover:bg-zinc-900"
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Paperclip className="w-8 h-8 mb-2 text-zinc-500" />
                                <p className="mb-2 text-sm text-zinc-400">
                                  <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-zinc-500">CSV, PDF, or transaction files (max 10MB)</p>
                              </div>
                              <Input
                                id="file-upload"
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                                multiple
                              />
                            </label>
                          </div>
                        </div>

                        {/* Display attached files */}
                        {files.length > 0 && (
                          <div className="mt-4 space-y-2">
                            <Label className="text-zinc-300">Attached Files</Label>
                            <div className="space-y-2">
                              {files.map((file, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-2 rounded-md bg-zinc-800"
                                >
                                  <div className="flex items-center">
                                    <FileText className="h-4 w-4 mr-2 text-blue-400" />
                                    <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 text-zinc-400 hover:text-white"
                                    onClick={() => removeFile(index)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                        {loading ? "Analyzing..." : "Analyze Transaction"}
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
                    <CardFooter>
                      {prediction === 1 ? (
                        <Alert className="bg-red-900/20 border-red-800 text-red-400">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Potential Fraud Detected</AlertTitle>
                          <AlertDescription>
                            This transaction has been flagged as potentially fraudulent. We recommend additional
                            verification.
                          </AlertDescription>
                        </Alert>
                      ) : (
                        <Alert className="bg-emerald-900/20 border-emerald-800 text-emerald-400">
                          <CheckCircle2 className="h-4 w-4" />
                          <AlertTitle>Transaction Appears Safe</AlertTitle>
                          <AlertDescription>
                            Our analysis indicates this transaction has a low risk of fraud.
                          </AlertDescription>
                        </Alert>
                      )}
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

