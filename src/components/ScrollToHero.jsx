"use client";

import { useEffect } from "react";

export default function ScrollToHero() {
  useEffect(() => {
    const targetId = "home";
    // Ensure URL hash is set to #home on initial load
    if (typeof window !== "undefined") {
      if (window.location.hash !== `#${targetId}`) {
        // Use replaceState to avoid creating a new history entry
        const url = new URL(window.location.href);
        url.hash = targetId;
        window.history.replaceState({}, "", url.toString());
      }

      // Scroll into view after layout paints
      const el = document.getElementById(targetId);
      if (el) {
        // Use instant jump to avoid interfering with user perception on reload
        el.scrollIntoView({ behavior: "instant", block: "start" });
        // Fallback to top if any issue
        if (window.scrollY !== 0) {
          window.scrollTo({ top: 0 });
        }
      } else {
        window.scrollTo({ top: 0 });
      }
    }
  }, []);

  return null;
}


