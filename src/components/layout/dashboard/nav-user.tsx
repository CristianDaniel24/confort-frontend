"use client";

import {
  BadgeHelp,
  ChevronsUpDown,
  LogOut,
  User,
  Moon,
  Sun,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cookieUtils } from "@/app/utils/cookies.utils";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { useEffect, useState } from "react";
import { IAuthResponse } from "@/types/auth-response-interface";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

function getInitialTheme(theme: string) {
  return theme === "dark" ? "light" : "dark";
}

export function NavUser() {
  const theme = useTheme();
  const { isMobile } = useSidebar();
  const router = useRouter();
  const [person, setPerson] = useState<IAuthResponse>({} as IAuthResponse);
  const [currTheme, setCurrTheme] = useState<string>(
    getInitialTheme(theme.theme ?? "dark")
  );

  const handleTheme = () => {
    setCurrTheme(() => (currTheme === "dark" ? "light" : "dark"));
    theme.setTheme(currTheme);
  };

  useEffect(() => {
    const cookie = cookieUtils.getCookieValue("session");
    const personCookie = cookie
      ? (JSON.parse(cookie) as IAuthResponse)
      : ({} as IAuthResponse);
    setPerson(personCookie);
  }, [person.person?.id]);

  const handleLogout = () => {
    authService.logOut();
    router.refresh();
  };

  const handleEditAccount = () => {
    router.push("/home/employee/profile");
  };

  const getInitials = () => {
    const firstNameInitial = person.person?.firstName.charAt(0) ?? "";
    const lastNameInitial = person.person?.lastName.charAt(0) ?? "";
    return (firstNameInitial + lastNameInitial).toUpperCase();
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {/*<AvatarImage src={user.avatar} alt={user.name} />*/}
                <AvatarFallback className="rounded-lg">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {person.person?.firstName}
                </span>
                <span className="truncate text-xs">{person.person?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  {/** <AvatarImage src={user.avatar} alt={user.name} /> */}
                  <AvatarFallback className="rounded-lg">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {person.person?.firstName}
                  </span>
                  <span className="truncate text-xs">
                    {person.person?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={handleEditAccount}
                className="cursor-pointer"
              >
                <User />
                Editar perfil
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleTheme}
                className="cursor-pointer"
              >
                {currTheme === "dark" ? (
                  <>
                    <Moon /> Modo oscuro
                  </>
                ) : (
                  <>
                    <Sun /> Modo claro
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-destructive transition-colors duration-200 hover:bg-destructive/10 focus:bg-destructive/10"
            >
              <LogOut />
              Cerrar sesion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
