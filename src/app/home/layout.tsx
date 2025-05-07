import Dashboard from "@/components/layout/dashboard/dashboard";

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <Dashboard>{children}</Dashboard>;
}
