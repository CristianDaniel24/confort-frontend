"use client";

import * as React from "react";
import {
  Cable,
  Car,
  Hammer,
  KeySquare,
  PackageSearch,
  PersonStanding,
  Pickaxe,
  Route,
  Settings2,
  ShoppingBasket,
  Truck,
  UserPen,
} from "lucide-react";

import Link from "next/link";
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
      url: "/home/employee",
      icon: UserPen,
    },
    {
      name: "Tipos de carros",
      url: "/home/typeCar",
      icon: KeySquare,
    },
    {
      name: "Proveedores",
      url: "/home/providers",
      icon: Truck,
    },
    {
      name: "Tipos de productos",
      url: "/home/typeProduct",
      icon: PackageSearch,
    },
    {
      name: "Productos",
      url: "/home/products",
      icon: ShoppingBasket,
    },
    {
      name: "Tipos de procedimientos",
      url: "/home/typeProcedure",
      icon: Cable,
    },
    {
      name: "Procedimientos",
      url: "/home/procedure",
      icon: Pickaxe,
    },
    {
      name: "Servicios",
      url: "/home/service",
      icon: Route,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link href="/home" className="block w-full">
          <TeamSwitcher teams={data.teams} />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
