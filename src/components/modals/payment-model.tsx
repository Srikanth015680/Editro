"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Crown, Star, X, Zap } from "lucide-react";
import { Button } from "../ui/button";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  usageCount: number;
  usageLimit: number;
}

const PaymentModal = ({
  isOpen,
  onClose,
  onUpgrade,
  usageCount,
  usageLimit,
}: PaymentModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Upgrade failed:", error);
      alert("Failed to start checkout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 mt-18 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-md rounded-2xl p-6 bg-white/5 backdrop-blur-xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition"
            >
              <X className="h-4 w-4 text-gray-400" />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-500 to-purple-600 rounded-full flex items-center justify-center">
                <Crown className="h-8 w-8 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">
                Upgrade to Pro
              </h2>

              <p className="text-gray-400">
                You've used {usageCount}/{usageLimit} free uploads
              </p>
            </div>

            <div className="space-y-4 mb-6">

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Check className="h-4 w-4 text-purple-400" />
                </div>
                <div>
                  <p className="font-medium text-white">
                    Unlimited Uploads
                  </p>
                  <p className="text-sm text-gray-400">
                    No more usage limits
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Zap className="h-4 w-4 text-purple-400" />
                </div>
                <div>
                  <p className="font-medium text-white">
                    Priority Processing
                  </p>
                  <p className="text-sm text-gray-400">
                    Faster AI processing
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Star className="h-4 w-4 text-purple-400" />
                </div>
                <div>
                  <p className="font-medium text-white">Premium Effects</p>
                  <p className="text-sm text-gray-400">
                    Access to advanced AI tools
                  </p>
                </div>
              </div>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
              <div className="text-center">
                <p className="text-sm text-gray-400">Pro Plan</p>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-3xl font-bold text-white">$19</span>
                  <span className="text-gray-400">/month</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleUpgrade}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-red-500 to-purple-600 text-white"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Crown className="h-4 w-4 mr-2" />
                    Start Pro Plan
                  </>
                )}
              </Button>

              <Button
                onClick={onClose}
                className="w-full border border-white/10 text-white hover:bg-white/10"
              >
                Maybe Later
              </Button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              By upgrading, you agree to our Terms of Service and Privacy Policy
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;