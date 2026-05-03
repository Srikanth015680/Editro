"use client"

import { motion } from "framer-motion"
import { Sparkles, Menu, X } from "lucide-react"
import { signIn, useSession } from "next-auth/react"
import React, { useEffect, useState } from "react"
import { Button } from "../button"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileOpen(false)
    }
  }

  const handleSubmit = async () => {
    if (session?.user) {
      scrollToSection("editor")
    } else {
      await signIn("google")
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/50 backdrop-blur-xl border-b border-purple-500/20 shadow-lg shadow-purple-500/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between">

          {/*  LOGO */}
          <motion.div
            onClick={() => scrollToSection("hero")}
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="relative">
              <Sparkles className="text-purple-400 w-6 h-6" />
              <div className="absolute inset-0 blur-md bg-purple-500/40 rounded-full"></div>
            </div>

            <span className="text-lg font-semibold tracking-wide bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
              Editra
            </span>
          </motion.div>

          {/*  DESKTOP NAV */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">

            <button
              onClick={() => scrollToSection("features")}
              className="relative text-gray-300 hover:text-white transition group"
            >
              Features
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-red-500 to-purple-500 transition-all group-hover:w-full"></span>
            </button>

            <button
              onClick={() => scrollToSection("pricing")}
              className="relative text-gray-300 hover:text-white transition group"
            >
              Pricing
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-red-500 to-purple-500 transition-all group-hover:w-full"></span>
            </button>

            {/*  CTA BUTTON */}
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white px-5 py-2 rounded-xl shadow-lg shadow-purple-500/20 transition-all"
            >
              {session?.user ? "Launch App" : "Sign In"}
            </Button>
          </div>

          {/*  MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/*  MOBILE MENU */}
        <motion.div
          initial={false}
          animate={{
            height: isMobileOpen ? "auto" : 0,
            opacity: isMobileOpen ? 1 : 0,
          }}
          className="md:hidden overflow-hidden"
        >
          <div className="flex flex-col space-y-4 mt-4 bg-black/80 backdrop-blur-xl rounded-xl p-4 border border-purple-500/20">

            <button
              onClick={() => scrollToSection("features")}
              className="text-gray-300 hover:text-white text-left"
            >
              Features
            </button>

            <button
              onClick={() => scrollToSection("pricing")}
              className="text-gray-300 hover:text-white text-left"
            >
              Pricing
            </button>

            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-red-500 to-purple-600 text-white rounded-lg"
            >
              {session?.user ? "Launch App" : "Sign In"}
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}

export default Navbar