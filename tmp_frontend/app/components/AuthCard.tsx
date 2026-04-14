"use client";

import { motion } from "framer-motion";

export const AuthCard = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-card-background backdrop-blur-3xl border border-white/40 dark:border-white/5 shadow-2xl dark:shadow-indigo-500/10 rounded-[2.5rem] p-8 sm:p-10 relative overflow-hidden">
        
        {/* Decorative ambient flare inside the card */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-8 relative z-10">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5, type: "spring" }}
            className="w-16 h-16 bg-gradient-to-br from-primary to-purple-500 rounded-[1.25rem] mx-auto flex items-center justify-center mb-6 shadow-xl shadow-primary/30 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-colors" />
            <div className="w-8 h-8 rounded-full border-[3px] border-white/90 border-t-white/20 animate-[spin_3s_linear_infinite]" />
          </motion.div>
          
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground bg-clip-text">
            {title}
          </h1>
          {subtitle && (
            <p className="text-card-foreground/70 mt-3 text-sm font-semibold max-w-xs mx-auto">
              {subtitle}
            </p>
          )}
        </div>
        <div className="relative z-10">{children}</div>
      </div>
    </motion.div>
  );
};
