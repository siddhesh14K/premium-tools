import type { Metadata } from "next"
import { LoanCalculator } from "@/components/tools/loan-calculator"

export const metadata: Metadata = {
  title: "Free Loan EMI Calculator Online - Calculate Monthly Payments | Exact Tools",
  description:
    "Calculate loan EMI, total interest, and view detailed amortization schedule. Free online loan calculator for home loans, car loans, personal loans with interactive charts.",
  keywords:
    "loan calculator, EMI calculator, loan EMI, monthly payment calculator, home loan calculator, car loan calculator, personal loan calculator, amortization schedule",
  openGraph: {
    title: "Free Loan EMI Calculator - Calculate Monthly Payments & Interest",
    description: "Professional loan calculator with EMI calculation, amortization schedule, and interactive charts.",
    type: "website",
  },
  alternates: {
    canonical: "https://exacttools.com/tools/loan-calculator",
  },
}

export default function LoanCalculatorPage() {
  return <LoanCalculator />
}
