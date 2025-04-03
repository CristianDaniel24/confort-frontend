"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";

export default function AppBreadcrumbList() {
  const paths = usePathname();
  const [pathNames, setPathNames] = useState<string[]>();

  useEffect(() => {
    setPathNames(paths.split("/").filter((path) => path));
  }, [paths]);

  if (!pathNames) {
    return <Skeleton className="w-40 h-4" />;
  }

  return (
    <BreadcrumbList>
      {pathNames.map((link, index) => {
        let href = `/${pathNames.slice(0, index + 1).join("/")}`;
        return (
          <React.Fragment key={link}>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href={href} className="capitalize">
                {link}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {pathNames.length !== index + 1 && (
              <BreadcrumbSeparator className="hidden md:block" />
            )}
          </React.Fragment>
        );
      })}
    </BreadcrumbList>
  );
}
