"use client";

import { Toaster } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";

export function ResponsiveToaster() {
  const { isRTL } = useLanguage();
  const [position, setPosition] = useState<"bottom-right" | "bottom-left" | "bottom-center">("bottom-center");

  useEffect(() => {
    const handleResize = () => {
      // md breakpoint is 768px
      if (window.innerWidth >= 768) {
        setPosition(isRTL ? "bottom-right" : "bottom-left");
      } else {
        // sm and xs devices
        setPosition("bottom-center");
      }
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isRTL]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 767px) {
          [data-sonner-toaster] {
            display: none !important;
          }
        }
      `}} />
      <Toaster
        position={position}
        toastOptions={{
          style: {
            background: "#fff",
            border: "1px solid #F0E0DA",
            color: "#2D2D2D",
          },
        }}
      />
    </>
  );
}
