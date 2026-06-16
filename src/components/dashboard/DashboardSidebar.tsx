"use client"

import { Home, Newspaper, LayoutDashboard, LogOut } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  username: string
  image: string
}

const navItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Blog", url: "/blog", icon: Newspaper },
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
]

export function DashboardSidebar({ user }: { user: User }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="/">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <LayoutDashboard className="size-4" />
                  </div>
                  <span className="truncate font-semibold">AstroBP</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.url === "/dashboard"}>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                asChild
                className="data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground"
              >
                <a href="#">
                  <img src={user.image} alt={user.firstName} className="size-8 rounded-full" />
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user.firstName} {user.lastName}
                    </span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <Separator />
          <SidebarMenu>
            <SidebarMenuItem>
              <form method="POST" action="/api/logout" className="contents">
                <SidebarMenuButton asChild>
                  <button type="submit">
                    <LogOut />
                    <span>Sign Out</span>
                  </button>
                </SidebarMenuButton>
              </form>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </header>
        <div className="flex-1 p-6">
          <div className="rounded-lg border p-6">
            <div className="flex items-center gap-4 mb-6">
              <img src={user.image} alt={user.firstName} className="w-16 h-16 rounded-full" />
              <div>
                <h2 className="text-xl font-semibold">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <p className="text-sm text-muted-foreground">@{user.username}</p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-xs">
                <p className="text-sm text-muted-foreground">Total Posts</p>
                <p className="text-2xl font-bold">—</p>
              </div>
              <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-xs">
                <p className="text-sm text-muted-foreground">Comments</p>
                <p className="text-2xl font-bold">—</p>
              </div>
              <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-xs">
                <p className="text-sm text-muted-foreground">Likes</p>
                <p className="text-2xl font-bold">—</p>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
