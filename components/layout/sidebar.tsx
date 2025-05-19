"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
 
  LayoutDashboard,
  Menu,
  Search,
  Users,
  Briefcase,
  Activity,
  UserRound,
  Bell,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signOut, useSession } from "next-auth/react"

function SimpleAvatar({
  name,
  
  className = "",
}: {
  name: string
  image?: string
  className?: string
}) {
  const initials = name
    .split(" ")
    .map((part: string) => part[0])
    .join("")
    .toUpperCase()

  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-primary text-primary-foreground rounded-full h-10 w-10 text-sm font-medium ${className}`}
    >
      {initials}
    </div>
  )
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
 

  const { data: session } = useSession()
  const user = session?.user

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Çalışanlar",
      icon: Users,
      href: "/employees",
      active: pathname === "/employees",
    },
    {
      label: "Projeler",
      icon: Briefcase,
      href: "/projects",
      active: pathname === "/projects",
    },
    {
      label: "Gerçek Zamanlı",
      icon: Activity,
      href: "/realtime",
      active: pathname === "/realtime",
    },
    {
      label: "Takımlar",
      icon: BarChart3,
      href: "/teams",
      active: pathname === "/teams",
    },
  ]

  const SidebarContent = (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <BarChart3 className="h-6 w-6" />
          <span className="text-lg">IOTECH</span>
        </Link>
        <Button variant="ghost" size="icon" className="ml-auto lg:hidden" onClick={() => setOpen(false)}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <div className="px-4 py-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Ara..." className="pl-8" />
          </div>
        </div>
        <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                route.active ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              <route.icon className="h-5 w-5" />
              <span>{route.label}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto border-t p-4">
        <div className="flex items-center gap-2">
         
          <div className="flex flex-1 flex-col">
            <span className="text-sm font-medium">{user?.name}</span>
        
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Bildirimler</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Yeni çalışan eklendi</DropdownMenuItem>
              <DropdownMenuItem>Proje tamamlandı</DropdownMenuItem>
              <DropdownMenuItem>Toplantı hatırlatması</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <UserRound className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">Profil</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">Ayarlar</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut({ redirect: true, callbackUrl: "/login" })}>
                Çıkış Yap
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden absolute left-4 top-4 z-50">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menüyü Aç</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] p-0">
          {SidebarContent}
        </SheetContent>
      </Sheet>

      <aside className={cn("hidden border-r bg-background lg:block", className)}>{SidebarContent}</aside>
    </>
  )
}
