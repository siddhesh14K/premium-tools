"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Calculator, PieChart, TrendingUp, DollarSign, Calendar, Percent, Download } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Cell,
  Pie,
  BarChart,
  Bar,
} from "recharts"
import { Button } from "@/components/ui/button"

interface LoanDetails {
  principal: number
  rate: number
  tenure: number
  emi: number
  totalInterest: number
  totalAmount: number
}

interface AmortizationEntry {
  month: number
  year: number
  emi: number
  principal: number
  interest: number
  balance: number
  cumulativeInterest: number
  cumulativePrincipal: number
}

export function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(500000)
  const [interestRate, setInterestRate] = useState(8.5)
  const [tenure, setTenure] = useState(20)
  const [loanDetails, setLoanDetails] = useState<LoanDetails | null>(null)
  const [amortization, setAmortization] = useState<AmortizationEntry[]>([])

  const calculateLoan = useMemo(() => {
    const P = loanAmount
    const r = interestRate / 100 / 12
    const n = tenure * 12

    if (P <= 0 || r <= 0 || n <= 0) return null

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    const totalAmount = emi * n
    const totalInterest = totalAmount - P

    const details: LoanDetails = {
      principal: P,
      rate: interestRate,
      tenure,
      emi,
      totalInterest,
      totalAmount,
    }

    // Generate amortization schedule
    const schedule: AmortizationEntry[] = []
    let balance = P
    let cumulativeInterest = 0
    let cumulativePrincipal = 0

    for (let month = 1; month <= n; month++) {
      const interestPayment = balance * r
      const principalPayment = emi - interestPayment
      balance -= principalPayment
      cumulativeInterest += interestPayment
      cumulativePrincipal += principalPayment

      schedule.push({
        month,
        year: Math.ceil(month / 12),
        emi,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance),
        cumulativeInterest,
        cumulativePrincipal,
      })
    }

    return { details, schedule }
  }, [loanAmount, interestRate, tenure])

  useEffect(() => {
    if (calculateLoan) {
      setLoanDetails(calculateLoan.details)
      setAmortization(calculateLoan.schedule)
    }
  }, [calculateLoan])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-IN").format(Math.round(num))
  }

  const pieData = loanDetails
    ? [
        { name: "Principal", value: loanDetails.principal, color: "#3b82f6" },
        { name: "Interest", value: loanDetails.totalInterest, color: "#ef4444" },
      ]
    : []

  const yearlyData = useMemo(() => {
    if (!amortization.length) return []

    const yearlyBreakdown: { [key: number]: { principal: number; interest: number; balance: number } } = {}

    amortization.forEach((entry) => {
      if (!yearlyBreakdown[entry.year]) {
        yearlyBreakdown[entry.year] = { principal: 0, interest: 0, balance: 0 }
      }
      yearlyBreakdown[entry.year].principal += entry.principal
      yearlyBreakdown[entry.year].interest += entry.interest
      yearlyBreakdown[entry.year].balance = entry.balance
    })

    return Object.entries(yearlyBreakdown).map(([year, data]) => ({
      year: `Year ${year}`,
      principal: Math.round(data.principal),
      interest: Math.round(data.interest),
      balance: Math.round(data.balance),
    }))
  }, [amortization])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tools
          </Link>
          <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Loan EMI Calculator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Calculate your loan EMI, total interest, and view detailed amortization schedule with interactive charts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card className="shadow-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg">
                    <Calculator className="w-6 h-6" />
                  </div>
                  Loan Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <Label htmlFor="loanAmount" className="text-lg font-semibold mb-3 block">
                    Loan Amount: {formatCurrency(loanAmount)}
                  </Label>
                  <Slider
                    value={[loanAmount]}
                    onValueChange={(value) => setLoanAmount(value[0])}
                    max={10000000}
                    min={100000}
                    step={50000}
                    className="w-full mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>₹1L</span>
                    <span>₹1Cr</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="interestRate" className="text-lg font-semibold mb-3 block">
                    Interest Rate: {interestRate}% per annum
                  </Label>
                  <Slider
                    value={[interestRate]}
                    onValueChange={(value) => setInterestRate(value[0])}
                    max={20}
                    min={1}
                    step={0.1}
                    className="w-full mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>1%</span>
                    <span>20%</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="tenure" className="text-lg font-semibold mb-3 block">
                    Loan Tenure: {tenure} years
                  </Label>
                  <Slider
                    value={[tenure]}
                    onValueChange={(value) => setTenure(value[0])}
                    max={30}
                    min={1}
                    step={1}
                    className="w-full mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>1 year</span>
                    <span>30 years</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {loanDetails && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2"
            >
              <Card className="shadow-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    Calculation Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <DollarSign className="w-6 h-6" />
                        <p className="text-blue-100">Monthly EMI</p>
                      </div>
                      <p className="text-3xl font-black">{formatCurrency(loanDetails.emi)}</p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="w-6 h-6" />
                        <p className="text-green-100">Principal Amount</p>
                      </div>
                      <p className="text-2xl font-bold">{formatCurrency(loanDetails.principal)}</p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-2xl shadow-lg"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Percent className="w-6 h-6" />
                        <p className="text-red-100">Total Interest</p>
                      </div>
                      <p className="text-2xl font-bold">{formatCurrency(loanDetails.totalInterest)}</p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-6 h-6" />
                        <p className="text-purple-100">Total Amount</p>
                      </div>
                      <p className="text-2xl font-bold">{formatCurrency(loanDetails.totalAmount)}</p>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {loanDetails && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
              <Card className="shadow-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <PieChart className="w-5 h-5" />
                    Principal vs Interest Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={80}
                          outerRadius={120}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-8 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <span className="font-medium">
                        Principal ({((loanDetails.principal / loanDetails.totalAmount) * 100).toFixed(1)}%)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                      <span className="font-medium">
                        Interest ({((loanDetails.totalInterest / loanDetails.totalAmount) * 100).toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
              <Card className="shadow-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Yearly Payment Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={yearlyData.slice(0, 10)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`} />
                        <Tooltip
                          formatter={(value: number, name: string) => [
                            formatCurrency(value),
                            name === "principal" ? "Principal" : name === "interest" ? "Interest" : "Balance",
                          ]}
                        />
                        <Bar dataKey="principal" fill="#3b82f6" name="principal" />
                        <Bar dataKey="interest" fill="#ef4444" name="interest" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}

        {loanDetails && amortization.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="mt-8"
          >
            <Card className="shadow-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">Amortization Schedule Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Month</th>
                        <th className="text-left p-2">EMI</th>
                        <th className="text-left p-2">Principal</th>
                        <th className="text-left p-2">Interest</th>
                        <th className="text-left p-2">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {amortization.slice(0, 12).map((entry, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-slate-700">
                          <td className="p-2">{entry.month}</td>
                          <td className="p-2">{formatCurrency(entry.emi)}</td>
                          <td className="p-2 text-blue-600">{formatCurrency(entry.principal)}</td>
                          <td className="p-2 text-red-600">{formatCurrency(entry.interest)}</td>
                          <td className="p-2">{formatCurrency(entry.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {amortization.length > 12 && (
                    <p className="text-center text-gray-500 mt-4">
                      Showing first 12 months of {amortization.length} total payments
                    </p>
                  )}
                </div>

                <div className="mt-6 flex gap-4">
                  <Button
                    onClick={() => {
                      const csvContent =
                        "Month,EMI,Principal,Interest,Balance\n" +
                        amortization
                          .map(
                            (entry) =>
                              `${entry.month},${entry.emi.toFixed(2)},${entry.principal.toFixed(2)},${entry.interest.toFixed(2)},${entry.balance.toFixed(2)}`,
                          )
                          .join("\n")

                      const blob = new Blob([csvContent], { type: "text/csv" })
                      const url = URL.createObjectURL(blob)
                      const a = document.createElement("a")
                      a.href = url
                      a.download = "amortization_schedule.csv"
                      a.click()
                      URL.revokeObjectURL(url)
                    }}
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download Schedule (CSV)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
