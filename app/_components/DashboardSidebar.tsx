
"use client"

import {
          Sidebar,
          SidebarContent,
          SidebarFooter,
          SidebarGroup,
          SidebarHeader,
          SidebarMenu,
          SidebarMenuButton,
          SidebarMenuItem,
} from "@/components/ui/sidebar"

import { signOut, useSession } from "@/lib/auth-client"

import {
          Bookmark,
          Briefcase,
          Building2,
          FileText,
          LayoutDashboard,
          LogOut,
          PlusCircle,
          Settings,
          Users,
          Wallet,
          type LucideIcon,
} from "lucide-react"

import Link from "next/link"

export type Role = "seeker" | "recruiter" | "admin"

export interface MenuItem {
          id: string
          name: string
          url: string
          icon: LucideIcon
}

const menuItemsByRole: Record<Role, MenuItem[]> = {
          seeker: [
                    { id: "dashboard", name: "Dashboard", url: "/dashboard/seeker", icon: LayoutDashboard },
                    { id: "jobs", name: "Jobs", url: "/dashboard/seeker/jobs", icon: Briefcase },
                    { id: "saved-jobs", name: "Saved Jobs", url: "/dashboard/seeker/saved", icon: Bookmark },
                    { id: "applications", name: "Applications", url: "/dashboard/seeker/applications", icon: FileText },
                    { id: "billing", name: "Billing", url: "/dashboard/seeker/billing", icon: Wallet },
                    { id: "settings", name: "Settings", url: "/dashboard/seeker/settings", icon: Settings },
          ],

          recruiter: [
                    { id: "dashboard", name: "Dashboard", url: "/dashboard/recruiter", icon: LayoutDashboard },
                    { id: "company", name: "My Company", url: "/dashboard/recruiter/company", icon: Building2 },
                    { id: "manage-jobs", name: "Manage Jobs", url: "/dashboard/recruiter/jobs", icon: Briefcase },
                    { id: "job", name: " Add job", url: "/dashboard/recruiter/jobs/new", icon: PlusCircle},
                    { id: "applications", name: "Applications", url: "/dashboard/recruiter/applications", icon: FileText },
                    { id: "settings", name: "Settings", url: "/dashboard/recruiter/settings", icon: Settings },
          ],

          admin: [
                    { id: "dashboard", name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
                    { id: "users", name: "Users", url: "/dashboard/admin/users", icon: Users },
                    { id: "companies", name: "Companies", url: "/dashboard/admin/companies", icon: Building2 },
                    { id: "jobs", name: "Jobs", url: "/dashboard/admin/jobs", icon: PlusCircle },
                    { id: "payments", name: "Payments", url: "/dashboard/admin/payments", icon: Wallet },
                    { id: "settings", name: "Settings", url: "/dashboard/admin/settings", icon: Settings },
          ],
}

export function DashboardSidebar() {
          const { data: session, isPending } = useSession()

          const userRole = session?.user?.role

          const role: Role =
                    userRole === "admin" ||
                              userRole === "recruiter" ||
                              userRole === "seeker"
                              ? userRole
                              : "seeker"

          const handleLogout = async () => {
                    await signOut()
                    window.location.href = "/"
          }

          if (isPending) return null

          return (
                    <Sidebar>
                              <SidebarHeader />

                              <SidebarContent>
                                        <SidebarGroup>
                                                  <SidebarMenu>
                                                            {menuItemsByRole[role].map((item) => (
                                                                      <SidebarMenuItem key={item.id}>
                                                                                <SidebarMenuButton render={<Link href={item.url} />}>
                                                                                          <item.icon />
                                                                                          <span>{item.name}</span>
                                                                                </SidebarMenuButton>
                                                                      </SidebarMenuItem>
                                                            ))}
                                                  </SidebarMenu>
                                        </SidebarGroup>
                              </SidebarContent>

                              <SidebarFooter>
                                        <SidebarMenu>
                                                  <SidebarMenuItem>
                                                            <SidebarMenuButton onClick={handleLogout}>
                                                                      <LogOut />
                                                                      <span>Logout</span>
                                                            </SidebarMenuButton>
                                                  </SidebarMenuItem>
                                        </SidebarMenu>
                              </SidebarFooter>
                    </Sidebar>
          )
}
