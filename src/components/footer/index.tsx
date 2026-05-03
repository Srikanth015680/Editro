"use client";
import React from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/10 relative overflow-hidden bg-black">

      <div className="absolute inset-0 bg-gradient-to-t from-black via-[#0a0a0a] to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="relative">
              <Sparkles className="h-8 w-8 text-purple-400 animate-pulse" />
              <div className="absolute inset-0 h-8 w-8 text-red-500 opacity-40 blur-md" />
            </div>

            <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
              Editra
            </span>
          </div>

          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Transform your photos with AI-powered editing tools. Remove
            backgrounds, enhance quality, and create stunning visuals in
            seconds.
          </p>

          <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 animate-pulse" />
            <span>for creators everywhere</span>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p className="text-sm text-gray-500 text-center">
              © 2025 Editra. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;