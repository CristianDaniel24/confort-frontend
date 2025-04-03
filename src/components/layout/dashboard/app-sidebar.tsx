"use client";

import * as React from "react";
import {
  Car,
  CarFront,
  PencilRuler,
  PersonStanding,
  Route,
  Settings2,
  Truck,
  UserCog,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "Empleado",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Confort",
      logo: Car,
      plan: "Tapiceria Confort",
    },
  ],

  projects: [
    {
      name: "Roles",
      url: "/home/rols",
      icon: PersonStanding,
    },
    {
      name: "Empleados",
      url: "/home/employees",
      icon: UserCog,
    },
    {
      name: "Carros",
      url: "/home/cars",
      icon: CarFront,
    },
    {
      name: "Proveedores",
      url: "/home/providers",
      icon: Truck,
    },
    {
      name: "Productos",
      url: "/home/products",
      icon: PencilRuler,
    },
    {
      name: "Servicios",
      url: "/home/services",
      icon: Route,
    },
  ],

  navMain: [
    {
      title: "Configuraciones",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
