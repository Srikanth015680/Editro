"use client";

import React, { useEffect } from "react";

import Hero from "@/modules/hero";
import Features from "@/modules/features";
import Pricing from "@/modules/pricing";
import Editor from "@/modules/editor";
import Footer from "@/components/footer";

const Page = () => {

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const sessionId = params.get("session_id");

        if (!sessionId) return;

        const res = await fetch("/api/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionId }),
        });

        const data = await res.json();

        if (res.ok) {
          console.log(" Payment verified, user upgraded");

          
          window.history.replaceState({}, document.title, "/");

          
          window.location.reload();
        } else {
          console.error("Verification failed:", data.error);
        }
      } catch (err) {
        console.error("Error verifying payment:", err);
      }
    };

    verifyPayment();
  }, []);

  return (
    <div>
      <Hero />
      <Features />
      <Pricing />
      <Editor />
      <Footer />
    </div>
  );
};

export default Page;