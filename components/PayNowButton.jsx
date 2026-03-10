"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function PayNowButton({ amount, productName }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePay = () => {
    if (typeof window === "undefined" || !window.Razorpay) return;
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "", // add your Razorpay key id
      amount: Math.round(amount * 100),
      currency: "INR",
      name: "Ladwa Group",
      description: productName,
      handler: function () {
        alert("Payment successful");
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <Button
      onClick={handlePay}
      className="bg-teal-600 hover:bg-teal-700 text-white"
    >
      Pay Now
    </Button>
  );
}
