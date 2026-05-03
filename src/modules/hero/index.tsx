"use client"
import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight } from "lucide-react"
import Image from "next/image"
import BeforeAfterImage from "../../../public/carImage.png"

const Hero = () => {

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 px-4"
    >

      {/* subtle background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />

      {/*  glow accents */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-600/10 blur-[120px] rounded-full -z-10" />

      {/*  container */}
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left space-y-6"
        >

          {/* badge */}
          <motion.div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-400">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Powered by AI Magic</span>
          </motion.div>

          {/* heading */}
          <motion.h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
              Editra
            </span>
            <br />
            <span className="text-white">
              Transform ordinary photos into stunning visuals in seconds.
            </span>
          </motion.h1>

          {/* description */}
          <motion.p className="text-gray-400 max-w-lg mx-auto md:mx-0">
            Elevate your photos with intelligent editing. Remove backgrounds,
            enhance clarity, and create stunning visuals instantly.
          </motion.p>

          {/* buttons */}
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">

            <Button
              onClick={() => scrollToSection("editor")}
              className="bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white px-6 py-2 rounded-xl"
            >
              Try for free
            </Button>

            <Button
              onClick={() => scrollToSection("editor")}
              variant="outline"
                className="bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white px-6 py-2 rounded-xl"            >
              Launch App
              <ArrowRight className="w-4 h-4" />
            </Button>

          </motion.div>

          {/* features */}
          <motion.div className="flex flex-col sm:flex-row gap-6 text-sm text-gray-400 justify-center md:justify-start">

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              <span>Unlimited uploads on Pro</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              <span>Unlimited edits</span>
            </div>

          </motion.div>

        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center"
        >
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl">
            <Image
              src={BeforeAfterImage}
              alt="before after"
              width={600}
              height={400}
              className="object-cover"
            />
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Hero