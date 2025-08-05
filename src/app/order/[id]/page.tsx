"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CreditCard, Truck } from 'lucide-react'

const labubuProducts = [
  {
    id: 1,
    name: "Klasični Roze Labubu",
    price: 2500,
    image: "/pink-labubu-bow.png",
    description: "Originalni roze Labubu sa mašnicom",
  },
  {
    id: 2,
    name: "Plavi Labubu Princ",
    price: 2800,
    image: "/blue-plush-toy-prince.png",
    description: "Elegantni plavi Labubu u prinčevskom odelu",
  },
  {
    id: 3,
    name: "Žuti Labubu Sunce",
    price: 2300,
    image: "/sunny-labubu-sunflower.png",
    description: "Veseli žuti Labubu sa suncokretom",
  },
  {
    id: 4,
    name: "Ljubičasti Labubu Čarobnjak",
    price: 3200,
    image: "/magical-labubu-wizard.png",
    description: "Magični ljubičasti Labubu sa čarobnjačkim šeširom",
  },
  {
    id: 5,
    name: "Beli Labubu Anđeo",
    price: 2900,
    image: "/white-angel-labubu-plush.png",
    description: "Nebeški beli Labubu sa krilima i aureolom",
  },
  {
    id: 6,
    name: "Crni Labubu Ninja",
    price: 2700,
    image: "/black-ninja-labubu-plush.png",
    description: "Misteriozni crni Labubu ninja sa maskom",
  },
]

interface FormData {
  ime: string
  prezime: string
  email: string
  telefon: string
  adresa: string
  grad: string
  postanskiBroj: string
  napomene: string
  placanje: string
  kolicina: number
}

interface FormErrors {
  ime?: string
  prezime?: string
  email?: string
  telefon?: string
  adresa?: string
  grad?: string
  postanskiBroj?: string
}

export default function OrderPage() {
  const params = useParams()
  const router = useRouter()
  const productId = Number.parseInt(params.id as string)
  const product = labubuProducts.find((p) => p.id === productId)

  const [formData, setFormData] = useState<FormData>({
    ime: "",
    prezime: "",
    email: "",
    telefon: "",
    adresa: "",
    grad: "",
    postanskiBroj: "",
    napomene: "",
    placanje: "pouzecem",
    kolicina: 1,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Proizvod nije pronađen</h2>
            <Link href="/">
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-md flex items-center gap-2 mx-auto">
                <ArrowLeft className="w-4 h-4" />
                Nazad na početnu
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\d\s+\-()]{8,15}$/
    return phoneRegex.test(phone.replace(/\s/g, ""))
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.ime.trim()) newErrors.ime = "Ime je obavezno"
    if (!formData.prezime.trim()) newErrors.prezime = "Prezime je obavezno"

    if (!formData.email.trim()) {
      newErrors.email = "Email je obavezan"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Email nije validan"
    }

    if (!formData.telefon.trim()) {
      newErrors.telefon = "Telefon je obavezan"
    } else if (!validatePhone(formData.telefon)) {
      newErrors.telefon = "Telefon nije validan"
    }

    if (!formData.adresa.trim()) newErrors.adresa = "Adresa je obavezna"
    if (!formData.grad.trim()) newErrors.grad = "Grad je obavezan"
    if (!formData.postanskiBroj.trim()) newErrors.postanskiBroj = "Poštanski broj je obavezan"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Simulacija API poziva
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Preusmeri na potvrdu
      router.push(`/confirmation?orderId=${Date.now()}`)
    } catch (error) {
      alert("Greška pri slanju porudžbine. Pokušajte ponovo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const totalPrice = product.price * formData.kolicina

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-pink-200">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center text-pink-600 hover:text-pink-700">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="text-lg font-semibold">Labubu Tijana 👑</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Info */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-pink-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Vaša porudžbina</h2>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-lg font-bold text-pink-600 mt-2">{product.price.toLocaleString("sr-RS")} RSD</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Količina</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.kolicina}
                  onChange={(e) => handleInputChange("kolicina", Number.parseInt(e.target.value) || 1)}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Ukupno:</span>
                  <span className="text-pink-600">{totalPrice.toLocaleString("sr-RS")} RSD</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Form */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-pink-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Podaci za dostavu</h2>
            <p className="text-gray-600 mb-6">Unesite svoje podatke za dostavu Labubu prijatelja 💕</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ime *</label>
                  <input
                    type="text"
                    value={formData.ime}
                    onChange={(e) => handleInputChange("ime", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                      errors.ime ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.ime && <p className="text-red-500 text-sm mt-1">{errors.ime}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prezime *</label>
                  <input
                    type="text"
                    value={formData.prezime}
                    onChange={(e) => handleInputChange("prezime", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                      errors.prezime ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.prezime && <p className="text-red-500 text-sm mt-1">{errors.prezime}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="primer@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefon *</label>
                <input
                  type="tel"
                  value={formData.telefon}
                  onChange={(e) => handleInputChange("telefon", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                    errors.telefon ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="060 123 4567"
                />
                {errors.telefon && <p className="text-red-500 text-sm mt-1">{errors.telefon}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Adresa *</label>
                <input
                  type="text"
                  value={formData.adresa}
                  onChange={(e) => handleInputChange("adresa", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                    errors.adresa ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Ulica i broj"
                />
                {errors.adresa && <p className="text-red-500 text-sm mt-1">{errors.adresa}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grad *</label>
                  <input
                    type="text"
                    value={formData.grad}
                    onChange={(e) => handleInputChange("grad", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                      errors.grad ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.grad && <p className="text-red-500 text-sm mt-1">{errors.grad}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Poštanski broj *</label>
                  <input
                    type="text"
                    value={formData.postanskiBroj}
                    onChange={(e) => handleInputChange("postanskiBroj", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                      errors.postanskiBroj ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="11000"
                  />
                  {errors.postanskiBroj && <p className="text-red-500 text-sm mt-1">{errors.postanskiBroj}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Napomene za dostavu</label>
                <textarea
                  value={formData.napomene}
                  onChange={(e) => handleInputChange("napomene", e.target.value)}
                  placeholder="Dodatne napomene za dostavu..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Način plaćanja</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="pouzecem"
                      name="placanje"
                      value="pouzecem"
                      checked={formData.placanje === "pouzecem"}
                      onChange={(e) => handleInputChange("placanje", e.target.value)}
                      className="mr-2"
                    />
                    <label htmlFor="pouzecem" className="flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      Plaćanje pouzećem
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="kartica"
                      name="placanje"
                      value="kartica"
                      checked={formData.placanje === "kartica"}
                      onChange={(e) => handleInputChange("placanje", e.target.value)}
                      className="mr-2"
                    />
                    <label htmlFor="kartica" className="flex items-center gap-2 text-gray-500">
                      <CreditCard className="w-4 h-4" />
                      Plaćanje karticom (uskoro dostupno)
                    </label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 px-4 rounded-md text-lg font-medium transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Šalje se..." : `Poruči za ${totalPrice.toLocaleString("sr-RS")} RSD`}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}