import { Footer, Sidebar, TopMenu } from "@/modules";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <TopMenu />
      <Sidebar />
      <div className="px-5 sm:px-10 lg:px-24">{children}</div>
      <Footer />
    </main>
  );
}
