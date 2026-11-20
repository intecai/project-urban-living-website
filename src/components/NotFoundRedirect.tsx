"use client";

import { useEffect } from "react";

export default function NotFoundRedirect() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const pathname = window.location.pathname;
    // Check if user visited an old /rooms/<id> or /rooms/<slug> URL
    const match = pathname.match(/^\/rooms\/([^/]+)\/?$/);
    if (match && match[1] && match[1] !== "premium-single-room") {
      const search = window.location.search;
      const target = `/rooms/?id=${encodeURIComponent(match[1])}${search ? "&" + search.slice(1) : ""}`;
      window.location.replace(target);
    }
  }, []);

  return null;
}
