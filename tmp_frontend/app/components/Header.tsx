"use client";
import { useTheme } from "next-themes";
import { Moon, Sun, LogOut, LayoutDashboard, Database, Search, ShieldCheck, Box, Hourglass, Gauge, Map, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const NAV_LINKS = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Inventory", href: "/inventory", icon: Database },
  { name: "Discovery", href: "/discovery", icon: Search },
  { name: "Scan", href: "/scan", icon: ShieldCheck },
  { name: "CBOM", href: "/cbom", icon: Box },
  { name: "PQC", href: "/pqc", icon: Hourglass },
  { name: "Heatmap", href: "/heatmap", icon: Map },
  { name: "Rating", href: "/rating", icon: Gauge },
  { name: "Reports", href: "/reports", icon: FileText },
];

export function Header({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  };

  return (
    <header className="w-full max-w-[90rem] mx-auto my-4 relative z-50 px-4">
      <div className="flex flex-col xl:flex-row justify-between items-center bg-card-background/70 backdrop-blur-xl rounded-2xl border border-input-border/50 shadow-sm p-3 gap-3">
        
        {/* Logo Section */}
        <div className="flex gap-4 items-center w-full xl:w-auto justify-between xl:justify-start">
          <Link href="/" className="font-black text-xl tracking-tight bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity whitespace-nowrap">
            PNB Hackathon
          </Link>
          
          <div className="hidden lg:flex items-center bg-[#FCF8EC] dark:bg-white rounded-full px-3 py-1 shadow-sm border border-black/10 gap-3 h-10">
            <img src="/assets/dfs.png" alt="DFS" className="h-[80%] w-auto object-contain" />
            <div className="h-full w-[1.5px] bg-black/20 rounded-full" />
            <img src="/assets/iba.png" alt="IBA" className="h-full w-auto object-contain scale-110" />
            <div className="h-full w-[1.5px] bg-black/20 rounded-full" />
            <img src="/assets/pnb.png" alt="PNB" className="h-[80%] w-auto object-contain" />
            <div className="h-full w-[1.5px] bg-black/20 rounded-full" />
            <img src="/assets/iitkp.png" alt="IITK" className="h-full w-auto object-contain scale-105" />
          </div>
        </div>

        {/* Navigation Section */}
        {mounted && isLoggedIn && (
          <nav className="flex items-center gap-1 overflow-x-auto w-full xl:w-auto pb-2 xl:pb-0 scrollbar-hide py-1 max-w-full">
            {NAV_LINKS.map((link) => {
              const isActive = pathname.startsWith(link.href);
              const Icon = link.icon;
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`
                    flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border border-transparent
                    ${isActive 
                      ? "bg-primary text-white shadow-md shadow-primary/20 border-primary/20" 
                      : "text-card-foreground/70 hover:bg-input-border/30 hover:text-foreground"
                    }
                  `}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-primary/70"}`} />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        )}

        {/* Action Buttons */}
        {mounted && (
          <div className="flex items-center gap-2 shrink-0 self-end xl:self-auto -mt-10 xl:mt-0">
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="group flex items-center gap-2 px-3 py-2.5 bg-red-500/10 border border-red-500/20 text-red-600 hover:bg-red-500 hover:text-white dark:text-red-400 font-bold text-sm rounded-xl transition-all shadow-sm"
              >
                <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            )}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="relative p-2.5 rounded-xl bg-foreground/5 hover:bg-foreground/10 transition-colors border border-input-border/30"
              aria-label="Toggle theme"
            >
              <Sun className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
