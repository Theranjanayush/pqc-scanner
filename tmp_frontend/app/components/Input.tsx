"use client";
import * as React from "react";
import { LucideIcon, Eye, EyeOff } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon: Icon, error, className, type, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label className={`text-sm font-bold pl-1 transition-colors duration-300 ${isFocused ? 'text-primary' : 'text-card-foreground/80'}`}>{label}</label>
        <div className="relative group">
          {Icon && (
            <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${isFocused ? 'text-primary scale-110' : 'text-card-foreground/40'}`}>
              <Icon className="w-5 h-5" />
            </div>
          )}
          <input
            ref={ref}
            type={inputType}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            className={`
              w-full h-14 bg-input-background border-[1.5px] border-input-border/60 text-foreground
              rounded-2xl px-4 py-2 transition-all duration-300 outline-none shadow-sm shadow-black/5
              ${Icon ? "pl-12" : ""}
              ${isPassword ? "pr-12" : ""}
              focus:bg-white dark:focus:bg-slate-900/60 focus:border-primary focus:ring-4 focus:ring-primary/10
              hover:border-input-border
              ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}
              ${className || ""}
            `}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-card-foreground/40 hover:text-primary transition-colors focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          )}
        </div>
        {error && <span className="text-xs text-red-500 font-bold pl-1 mt-1">{error}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";
