"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import LoadingSpinner from "@/components/HomeNew/LoadingSpinner.jsx";

export default function RouteChangeLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleClick = (e) => {
      const anchor = e.target.closest("a");
      if (!anchor) return;

      const href = anchor.href;
      if (
        href &&
        href.startsWith(window.location.origin) &&
        href !== window.location.href
      ) {
        const url = new URL(href);
        if (!url.pathname.startsWith("/admin")) {
          setLoading(true);
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [pathname]);


  if (pathname?.startsWith("/admin") || !loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/75">
      <LoadingSpinner />
    </div>
  );
}
