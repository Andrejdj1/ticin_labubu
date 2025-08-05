"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Home, Mail, Phone } from "lucide-react"

function ConfirmationContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-green-50 border-2 border-green-200 rounded-lg shadow-lg">
        <div className="text-center p-6">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-green-700 mb-2">Porudžbina je uspešno poslata! 🎉</h1>
          <p className="text-lg text-green-600">Vaš Labubu prijatelj je na putu ka vama! 💕</p>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center">
            <p className="text-lg text-gray-700 mb-2">Broj porudžbine:</p>
            <p className="text-2xl font-bold text-pink-600">#{orderId || "12345"}</p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-pink-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Šta se dešava dalje?</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <p className="text-gray-700">Potvrdićemo vašu porudžbinu u roku od 24 sata</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <p className="text-gray-700">Pripremićemo vaš Labubu sa posebnom pažnjom</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <p className="text-gray-700">Dostava će biti izvršena u roku od 3-5 radnih dana</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">Kontakt informacije</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-blue-700">
                <Mail className="w-4 h-4" />
                <span>labubu.tijana@email.com</span>
              </div>
              <div className="flex items-center gap-2 text-blue-700">
                <Phone className="w-4 h-4" />
                <span>+381 60 123 4567</span>
              </div>
            </div>
            <p className="text-sm text-blue-600 mt-3">
              Ako imate pitanja o vašoj porudžbini, slobodno nas kontaktirajte!
            </p>
          </div>

          <div className="text-center">
            <Link href="/">
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-md flex items-center gap-2 mx-auto transition-colors">
                <Home className="w-4 h-4" />
                Nazad na početnu
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-green-50 border-2 border-green-200 rounded-lg shadow-lg">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Učitava se potvrda...</p>
        </div>
      </div>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-pink-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <h1 className="text-4xl font-bold text-pink-600 flex items-center gap-2">
              Labubu Tijana
              <span className="text-3xl">👑</span>
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<LoadingFallback />}>
          <ConfirmationContent />
        </Suspense>
      </main>
    </div>
  )
}
