"use client";
import { Crop, Expand, Scissors, Type, Zap } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Scissors,
    title: "AI Background Removal",
    description:
      "1-click clean photos with precision AI. Remove any background instantly and get professional results.",
    gradient: "from-red-500 to-purple-500",
    delay: 0.1,
  },
  {
    icon: Expand,
    title: "AI Generative Fill",
    description:
      "Expand your canvas and auto-fill edges seamlessly. Create perfect aspect ratios effortlessly.",
    gradient: "from-purple-500 to-red-500",
    delay: 0.2,
  },
  {
    icon: Zap,
    title: "AI Upscale & Enhance",
    description:
      "Boost resolution up to 4x while fixing details. Transform low-res into stunning high-quality images.",
    gradient: "from-red-500 to-purple-600",
    delay: 0.3,
  },
  {
    icon: Crop,
    title: "Smart Crop & Face Focus",
    description:
      "Perfect thumbnails automatically. AI detects faces and important content for optimal cropping.",
    gradient: "from-purple-600 to-red-500",
    delay: 0.4,
  },
  {
    icon: Type,
    title: "Watermark & Text Overlay",
    description:
      "Brand your content professionally. Add custom watermarks and text with perfect positioning.",
    gradient: "from-red-400 to-purple-600",
    delay: 0.5,
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden">

      {/*  subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">

        {/*  HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Powerful </span>
            <span className="bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
              Features
            </span>
          </h2>

          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Transform your photos with advanced editing tools. Get professional
            results instantly without complex workflows.
          </p>
        </motion.div>

        {/*  TOP GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.slice(0, 3).map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>

        {/*  BOTTOM GRID */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.slice(3).map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>

      </div>
    </section>
  );
};

function FeatureCard({ feature }: { feature: any }) {
  const { icon: Icon, title, description, gradient, delay } = feature;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.03, y: -6 }}
      className="group"
    >
      <div className="h-full rounded-2xl p-6 bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 shadow-lg hover:shadow-purple-500/10">

        {/*  ICON */}
        <div className="relative mb-6">
          <div
            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} p-3 flex items-center justify-center`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>

          <div className="absolute inset-0 w-14 h-14 rounded-xl bg-gradient-to-br from-red-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition" />
        </div>

        {/*  TITLE */}
        <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-purple-400 transition">
          {title}
        </h3>

        {/*  DESCRIPTION */}
        <p className="text-gray-400 text-sm leading-relaxed">
          {description}
        </p>

        {/*  FOOTER */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-sm text-purple-400">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            <span>Powered by Editra</span>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

export default Features;