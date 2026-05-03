"use client";
import { Check, Crown, Star, Zap } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out Editra",
    features: [
      "10 edits on free plan",
      "Basic background removal",
      "Standard resolution output",
      "Community support",
    ],
    limitations: ["Limited daily usage"],
    cta: "Start Free",
    popular: false,
    icon: Star,
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    description: "Unlimited power for professionals",
    features: [
      "Unlimited edits",
      "All features unlocked",
      "Up to 4K resolution",
      "Priority support",
      "Batch processing",
      "API access",
      "Commercial license",
    ],
    cta: "Go Pro",
    popular: true,
    icon: Crown,
  },
];

const Pricing = () => {
  const scrollToEditor = () => {
    const element = document.getElementById("editor");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">

      {/* subtle glow background */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-red-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-[120px]" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-xl rounded-full px-5 py-2 mb-6">
            <Zap className="h-4 w-4 text-purple-400" />
            <span className="text-sm text-gray-300">Simple Pricing</span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Choose Your </span>
            <span className="bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
              Plan
            </span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Start free, upgrade when you need more. No hidden fees.
          </p>
        </motion.div>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.03, y: -6 }}
              className={`relative ${plan.popular ? "md:-mt-6" : ""}`}
            >

              {/*  POPULAR BADGE */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-red-500 to-purple-500 text-white px-4 py-1 rounded-full text-xs font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              {/* CARD */}
              <div className={`h-full rounded-2xl p-8 backdrop-blur-xl bg-white/5 border transition-all duration-300
                ${plan.popular
                  ? "border-purple-500/40 shadow-lg shadow-purple-500/10"
                  : "border-white/10 hover:border-purple-500/30"}
              `}>

                {/* ICON */}
                <div className="text-center mb-8">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-red-500 to-purple-500 flex items-center justify-center">
                    <plan.icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mt-2">{plan.description}</p>

                  <div className="mt-4">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400 ml-1">/{plan.period}</span>
                  </div>
                </div>

                {/* FEATURES */}
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <div className="w-5 h-5 flex items-center justify-center rounded-full bg-purple-500/20">
                        <Check className="w-3 h-3 text-purple-400" />
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}

                  {plan.limitations?.map((limitation, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <div className="w-5 h-5 flex items-center justify-center rounded-full bg-gray-700">
                        <div className="w-3 h-[2px] bg-gray-400" />
                      </div>
                      <span className="text-gray-500">{limitation}</span>
                    </div>
                  ))}
                </div>

                {/* BUTTON */}
                <Button
                  onClick={scrollToEditor}
                  className={`w-full rounded-xl font-semibold ${
                    plan.popular
                      ? "bg-gradient-to-r from-red-500 to-purple-600 text-white hover:opacity-90"
                      : "bg-white text-black hover:bg-gray-200"
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FOOTER */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center text-gray-400 mt-12"
        >
          All plans include core features. Upgrade anytime.
        </motion.p>

      </div>
    </section>
  );
};

export default Pricing;