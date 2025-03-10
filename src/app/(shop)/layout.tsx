import { Footer, Sidebar, TopMenu } from "@/modules";
import { ProductFilterMenu } from "@/modules/products/components/ProductFilterMenu";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main className="min-h-screen">
        <TopMenu />
        <Sidebar />
        <ProductFilterMenu />
        <div className="px-5 sm:px-10 pt-16">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
