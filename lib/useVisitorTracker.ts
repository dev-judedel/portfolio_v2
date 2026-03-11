"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

function parseUserAgent(ua: string) {
  let browser = "Other";
  if (ua.includes("Edg/"))          browser = "Edge";
  else if (ua.includes("OPR/"))     browser = "Opera";
  else if (ua.includes("Chrome/"))  browser = "Chrome";
  else if (ua.includes("Firefox/")) browser = "Firefox";
  else if (ua.includes("Safari/"))  browser = "Safari";

  let os = "Other";
  if (ua.includes("Windows NT"))    os = "Windows";
  else if (ua.includes("Mac OS X")) os = "macOS";
  else if (ua.includes("Android"))  os = "Android";
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
  else if (ua.includes("Linux"))    os = "Linux";

  let device = "Desktop";
  if (ua.includes("Mobile") || ua.includes("Android") || ua.includes("iPhone")) device = "Mobile";
  else if (ua.includes("iPad") || ua.includes("Tablet")) device = "Tablet";

  return { browser, os, device };
}

export function useVisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Skip admin pages
    if (pathname.startsWith("/admin")) return;

    const ua = navigator.userAgent;
    const { browser, os, device } = parseUserAgent(ua);

    fetch("/api/visitors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: pathname, browser, os, device }),
    }).catch(() => {});
  }, [pathname]);
}
