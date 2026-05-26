"use client";
import { useEffect } from "react";

export default function ScrollManager() {
  useEffect(() => {
    // Let the browser restore scroll position on refresh / back-forward navigation.
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "auto";
    }

    // On a fresh navigation (not a reload, not a back/forward), if there's no
    // hash to scroll to, ensure the page opens at the top.
    const nav = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    const isReloadOrRestore =
      nav?.type === "reload" || nav?.type === "back_forward";

    if (!isReloadOrRestore && !window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return null;
}
