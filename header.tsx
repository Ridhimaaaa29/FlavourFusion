"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/components/auth-provider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Utensils, Menu, X, Home, BookOpen, Award, Search, PenTool, Heart, User } from "lucide-react"
import { cn } from "@/lib/utils"

export function Header() {
  const { user, signOut } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Recipes", href: "/recipes", icon: BookOpen },
    { name: "Create Recipe", href: "/recipes/new", icon: PenTool },
    { name: "Contests", href: "/contests", icon: Award },
    { name: "Blog", href: "/blog", icon: BookOpen },
    { name: "Favorites", href: "/favorites", icon: Heart },
    { name: "Search", href: "/search", icon: Search },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Utensils className="h-6 w-6 text-primary" />
          <Link href="/" className="text-xl font-bold">
            <span className="gradient-text">FlavorFusion</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ModeToggle />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    {user.name.charAt(0)}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="default">
              <Link href="/login">Sign In</Link>
            </Button>
          )}

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 top-16 z-50 bg-background md:hidden transition-transform duration-300 ease-in-out",
          isMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <nav className="container py-8">
          <ul className="grid gap-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 text-lg font-medium hover:text-primary"
                  onClick={closeMenu}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            ))}

            {user ? (
              <>
                <li>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 text-lg font-medium hover:text-primary"
                    onClick={closeMenu}
                  >
                    <User className="h-5 w-5" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-3 text-lg font-medium hover:text-primary w-full justify-start p-0"
                    onClick={() => {
                      signOut()
                      closeMenu()
                    }}
                  >
                    <User className="h-5 w-5" />
                    Log out
                  </Button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  href="/login"
                  className="flex items-center gap-3 text-lg font-medium hover:text-primary"
                  onClick={closeMenu}
                >
                  <User className="h-5 w-5" />
                  Sign In
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

