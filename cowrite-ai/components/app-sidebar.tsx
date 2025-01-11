"use client"

import { FileText, Home, Image, MessageSquare, Settings, Star, Menu } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useSidebar } from "@/components/ui/sidebar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"

const navigation = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    title: "Content",
    items: [
      {
        title: "Blog Posts",
        icon: FileText,
        href: "/content/blog",
      },
      {
        title: "Social Media",
        icon: Image,
        href: "/content/social",
      },
      {
        title: "Email Templates",
        icon: MessageSquare,
        href: "/content/email",
      },
    ],
  },
  {
    title: "Favorites",
    icon: Star,
    href: "/favorites",
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { toggleSidebar } = useSidebar()

  return (
    <Sidebar className="border-r transition-all duration-300 ease-in-out md:w-64 md:translate-x-0">
      <SidebarHeader className="border-b p-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image
            src="/placeholder.svg"
            width={32}
            height={32}
            alt="Logo"
            className="rounded"
          />
          <span>Content AI</span>
        </Link>
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navigation.map((item) =>
            item.items ? (
              <SidebarGroup key={item.title}>
                <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((subItem) => (
                      <SidebarMenuItem key={subItem.href}>
                        <SidebarMenuButton
                          asChild
                          isActive={pathname === subItem.href}
                        >
                          <Link href={subItem.href}>
                            <subItem.icon className="h-4 w-4" />
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ) : (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                >
                  <Link href={item.href}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          )}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
          <Link href="/settings">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}

