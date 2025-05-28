"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserAuthNav } from "@/components/user-auth-nav";
import { useAuth } from "@/lib/auth";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, Ticket } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

export function Header() {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Create Event", href: "/create-event" },
    { label: "Your Events", href: "/your-events" },
    { label: "Check-in", href: "/check-in" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center">
          {isMobile && (
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2 md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                <div className="flex flex-col space-y-4 py-4">
                  <Link
                    href="/"
                    className="flex items-center space-x-2 px-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Ticket className="h-6 w-6 text-primary" />
                    <span className="font-bold">EventPass</span>
                  </Link>
                  <div className="flex flex-col space-y-1">
                    {menuItems.map((item) => (
                      <Button
                        key={item.href}
                        variant="ghost"
                        className="justify-start"
                        asChild
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Link href={item.href}>{item.label}</Link>
                      </Button>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}

          <Link href="/" className="flex items-center space-x-2">
            <Ticket className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">EventPass</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="ml-6 hidden md:flex items-center space-x-4">
            {menuItems.map((item) => (
              <Button key={item.href} variant="ghost" size="sm" asChild>
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-2">
          <ThemeToggle />

          {!user ? (
            <>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="hidden sm:flex"
              >
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/auth/register">Register</Link>
              </Button>
            </>
          ) : (
            <UserAuthNav />
          )}
        </div>
      </div>
    </header>
  );
}
