"use client";

import { useState, useEffect } from "react";

export function useActiveLink() {
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    // Set initial path
    setCurrentPath(window.location.pathname);

    // Function to update path
    const updatePath = () => {
      setCurrentPath(window.location.pathname);
    };

    // Listen for route changes
    window.addEventListener("popstate", updatePath);

    // Cleanup
    return () => window.removeEventListener("popstate", updatePath);
  }, []);

  // Function to check if a link is active
  const isActive = (path: string) => {
    return currentPath === path;
  };

  return { currentPath, isActive };
}
