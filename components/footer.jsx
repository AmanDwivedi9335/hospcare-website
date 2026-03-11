"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

import LadwaLogo from "@/public/images/hospcare_logo.png";

const companyLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Projects", href: "/" },
  { name: "Contact Us", href: "/contact-us" },
];

const resourcesLinks = [
  { name: "Blogs", href: "/blog" },
  { name: "Certificates", href: "/" },
  { name: "Terms and Conditions", href: "/" },
  { name: "Privacy Policy", href: "/" },
];

const socialLinks = [
  { icon: Facebook, href: "/", label: "Facebook" },
  { icon: Twitter, href: "/", label: "X" },
  { icon: Youtube, href: "/", label: "Youtube" },
  { icon: Instagram, href: "/", label: "Instagram" },
  { icon: Linkedin, href: "/", label: "LinkedIn" },
];

function LinkSection({ title, links }) {
  return (
    <div className="space-y-3">
      <h3 className="text-base lg:text-lg font-semibold">{title}</h3>
      <ul className="space-y-2">
        {links.map((link, i) => (
          <li key={i}>
            <Link
              href={link.href}
              className="text-gray-700 hover:text-gray-900 transition-colors text-sm"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ModernFooter() {
  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      setIsLoading(true);
      setShowSuccess(false);

      const res = await fetch("/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setEmail("");
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      }
    } catch (err) {
      console.error("Subscription failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-gradient-to-br from-teal-50 to-teal-400 text-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        {/* Top: brand + newsletter */}
        <div className="grid gap-6 md:gap-8 lg:grid-cols-12 items-start">
          {/* Brand */}
          <div className="lg:col-span-5 space-y-4">
            <Image src={LadwaLogo} alt="Ladwa Logo" width={170} height={52} priority />
            <p className="text-gray-700 text-sm leading-relaxed">
              Hospcare is a digital healthcare platform helping patients connect with trusted doctors, hospitals, and treatment support services in one place.
            </p>

            <div className="flex flex-wrap gap-3">
              {socialLinks.map((s, i) => (
                <a
                  key={i}
                  aria-label={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-600/50"
                >
                  <s.icon className="h-5 w-5 text-white" />
                </a>
              ))}
            </div>

            {/* Optional app badges */}
            {/* <div className="flex gap-3 pt-1">
              <Image src={AppStore} alt="App Store" className="h-10 w-auto" />
              <Image src={GooglePlay} alt="Google Play" className="h-10 w-auto" />
            </div> */}
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-teal-300/60 bg-white/60 backdrop-blur p-4 sm:p-5">
              <h3 className="text-base lg:text-lg font-semibold mb-2">
                Subscribe to our newsletter
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                Insights, product news, and updates. No spam—unsubscribe anytime.
              </p>

              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-3 py-2 rounded-md text-sm bg-teal-50 border border-teal-400 placeholder-teal-400/70
                             focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-500/60"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 rounded-md bg-teal-600 text-white hover:bg-teal-500 disabled:opacity-70"
                >
                  {isLoading ? "Subscribing..." : "Subscribe"}
                </button>
              </form>

              {showSuccess && (
                <p className="mt-2 text-sm text-teal-700">Thanks for subscribing!</p>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-teal-300/70" />

        {/* Link columns + contact */}
        <div className="grid gap-6 md:gap-8 [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]">
          <LinkSection title="Company" links={companyLinks} />
          <LinkSection title="Resources" links={resourcesLinks} />

          <div className="space-y-3">
            <h3 className="text-base lg:text-lg font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <span className="block">NO. 3,4 AND 9,</span>
                <span className="block">Kanpur</span>
                <span className="block">Uttar Pradesh</span>
              </li>
              <li>
                <a className="hover:text-gray-900" href="tel:+9199999999">
                  +91-99999999
                </a>
              </li>
              <li>
                <a className="hover:text-gray-900" href="mailto:sales@hospcare.com">
                  sales@hospcare.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-teal-300/70">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-700 text-center md:text-left">
              © {new Date().getFullYear()} Hospcare — Smart Healthcare Access Platform
            </p>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link href="/" className="text-sm text-gray-700 hover:text-gray-900">Terms of Use</Link>
              <Link href="/" className="text-sm text-gray-700 hover:text-gray-900">Privacy Policy</Link>
              <Link href="/" className="text-sm text-gray-700 hover:text-gray-900">Legal</Link>
              <Link href="/contact-us" className="text-sm text-gray-700 hover:text-gray-900">Site Map</Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
