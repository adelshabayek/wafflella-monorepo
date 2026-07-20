"use client";

import { Toaster } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";

export function ResponsiveToaster() {
  const { isRTL } = useLanguage();
  const [position, setPosition] = useState<"bottom-right" | "bottom-left" | "top-center">("top-center");

  useEffect(() => {
    const handleResize = () => {
      // md breakpoint is 768px
      if (window.innerWidth >= 768) {
        setPosition(isRTL ? "bottom-right" : "bottom-left");
      } else {
        // sm and xs devices
        setPosition("top-center");
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
            top: 35% !important;
            bottom: auto !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            display: flex !important;
            justify-content: center !important;
            transform: translateY(-50%) !important;
            margin: 0 !important;
          }
          [data-sonner-toast] {
            margin: 0 auto !important;
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
