"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import * as React from "react";

interface ButtonProps extends HTMLMotionProps<"button"> {
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, isLoading, disabled, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        disabled={isLoading || disabled}
        className={`
          relative w-full h-14 bg-linear-to-r from-primary via-indigo-500 to-purple-600
          text-white font-extrabold text-[1.05rem] rounded-2xl shadow-lg shadow-primary/25
          flex items-center justify-center overflow-hidden transition-all duration-300 hover:shadow-primary/40
          disabled:opacity-70 disabled:cursor-not-allowed
          animate-gradient bg-size-[200%_auto]
          ${className || ""}
        `}
        {...props}
      >
        <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />
        
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center"
          >
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="ml-2 font-semibold tracking-wide">Processing...</span>
          </motion.div>
        ) : (
          <span className="relative z-10 flex items-center justify-center w-full tracking-wide">
            {children as React.ReactNode}
          </span>
        )}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
