import * as React from "react";
import { ChevronRight } from "lucide-react"; // Ícono de separación
import { cn } from "@/lib/utils"; // Asegúrate de tener tu función 'cn' que combina clases

export const Breadcrumb = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  return (
    <nav className={cn("flex", className)} aria-label="breadcrumb" {...props} />
  );
};

export const BreadcrumbList = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLOListElement>) => {
  return <ol className={cn("flex items-center gap-1", className)} {...props} />;
};

export const BreadcrumbItem = ({
  className,
  ...props
}: React.LiHTMLAttributes<HTMLLIElement>) => {
  return <li className={cn("text-sm", className)} {...props} />;
};

export const BreadcrumbLink = ({
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a
      className={cn(
        "font-medium transition-colors hover:text-primary",
        className
      )}
      {...props}
    />
  );
};

export const BreadcrumbPage = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLOListElement>) => {
  return (
    <span
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-semibold text-muted-foreground", className)}
      {...props}
    />
  );
};

export const BreadcrumbSeparator = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLLIElement>) => {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cn("flex items-center px-1", className)}
      {...props}
    >
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </li>
  );
};
