"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, ChevronLeft, ChevronRight, Menu, X, Home, Printer } from 'lucide-react'

interface LabubuProduct {
  id: number
  name: string
  price: number
  image: string
  description: string
}

const labubuProducts = [
  {
    id: 1,
    name: "Klasični Roze Labubu",
    price: 2500,
    image: "/placeholder.svg?height=300&width=300&text=Roze+Labubu",
    description: "Originalni roze Labubu sa mašnicom",
  },
  {
    id: 2,
    name: "Plavi Labubu Princ",
    price: 2800,
    image: "/placeholder.svg?height=300&width=300&text=Plavi+Labubu",
    description: "Elegantni plavi Labubu u prinčevskom odelu",
  },
  {
    id: 3,
    name: "Žuti Labubu Sunce",
    price: 2300,
    image: "/placeholder.svg?height=300&width=300&text=Žuti+Labubu",
    description: "Veseli žuti Labubu sa suncokretom",
  },
  {
    id: 4,
    name: "Ljubičasti Labubu Čarobnjak",
    price: 3200,
    image: "/placeholder.svg?height=300&width=300&text=Ljubičasti+Labubu",
    description: "Magični ljubičasti Labubu sa čarobnjačkim šeširom",
  },
  {
    id: 5,
    name: "Beli Labubu Anđeo",
    price: 2900,
    image: "/placeholder.svg?height=300&width=300&text=Beli+Labubu",
    description: "Nebeški beli Labubu sa krilima i aureolom",
  },
  {
    id: 6,
    name: "Crni Labubu Ninja",
    price: 2700,
    image: "/placeholder.svg?height=300&width=300&text=Crni+Labubu",
    description: "Misteriozni crni Labubu ninja sa maskom",
  },
]

const PRODUCTS_PER_PAGE = 6

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [favorites, setFavorites] = useState<number[]>([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const totalPages = Math.ceil(labubuProducts.length / PRODUCTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const currentProducts = labubuProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE)

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const addToCart = (product: LabubuProduct) => {
  alert(`${product.name} je dodat u korpu! 🛒`)
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md border-b-2 border-pink-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-pink-600">
              <span>🎀</span>
              Labubu Tijana
              <span>👑</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="flex items-center gap-2 text-gray-700 hover:text-pink-600 transition-colors">
                <Home className="w-4 h-4" />
                Početna
              </Link>
              <Link
                href="/3d-printing"
                className="flex items-center gap-2 text-gray-700 hover:text-pink-600 transition-colors"
              >
                <Printer className="w-4 h-4" />
                3D Printing
              </Link>
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors">
                <ShoppingCart className="w-4 h-4" />
                Korpa (0)
              </button>
            </div>

            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="text-pink-600 p-2"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-pink-200">
              <div className="flex flex-col space-y-4">
                <Link href="/" className="flex items-center gap-2 text-gray-700 hover:text-pink-600">
                  <Home className="w-4 h-4" />
                  Početna
                </Link>
                <Link href="/3d-printing" className="flex items-center gap-2 text-gray-700 hover:text-pink-600">
                  <Printer className="w-4 h-4" />
                  3D Printing
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-500 shadow-lg">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white flex items-center justify-center gap-3 mb-4 drop-shadow-lg">
              <span className="animate-pulse">✨</span>
              Labubu Tijana
              <span className="text-4xl md:text-5xl animate-bounce">👑</span>
              <span className="animate-pulse">✨</span>
            </h1>
            <div className="flex items-center justify-center gap-2 text-white/90 text-lg md:text-xl mb-4">
              <span>💕</span>
              <p>Najslađi Labubu plišanci za sve uzraste!</p>
              <span>💕</span>
            </div>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Otkrijte našu čarobnu kolekciju od {labubuProducts.length} jedinstvenih Labubu prijatelja!
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Naša Labubu Kolekcija</h2>
          <p className="text-lg text-gray-600">
            Stranica {currentPage} od {totalPages} - Prikazano {currentProducts.length} od {labubuProducts.length} proizvoda 🎀
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-pink-100 hover:border-pink-300 cursor-pointer hover:scale-105 transform group"
            >
              <div className="p-4">
                <div
                  className="relative aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-pink-100 to-purple-100 mb-4"
                  onClick={() => (window.location.href = `/order/${product.id}`)}
                >
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <Heart
                      className={`w-6 h-6 cursor-pointer transition-colors ${
                        favorites.includes(product.id)
                          ? "text-red-500 fill-red-500"
                          : "text-pink-400 hover:text-pink-600"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(product.id)
                      }}
                    />
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-pink-600">{product.price.toLocaleString("sr-RS")} RSD</span>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        addToCart(product)
                      }}
                      className="border border-pink-300 text-pink-600 hover:bg-pink-50 px-3 py-1 rounded-md transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                    <Link href={`/order/${product.id}`}>
                      <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md transition-colors">
                        Poruči
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-4 py-2 border border-pink-300 text-pink-600 rounded-md hover:bg-pink-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            Prethodna
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-md transition-colors ${
                  currentPage === page
                    ? "bg-pink-500 text-white"
                    : "border border-pink-300 text-pink-600 hover:bg-pink-50"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-4 py-2 border border-pink-300 text-pink-600 rounded-md hover:bg-pink-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sledeća
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t-2 border-pink-200 mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-gray-600">© 2024 Labubu Tijana 👑 - Svi Labubu prijatelji čekaju svoj novi dom! 💕</p>
        </div>
      </footer>
    </div>
  )
}
