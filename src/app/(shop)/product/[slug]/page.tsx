import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import {
  MobileSlideShow,
  SlideShow,
  StockLabel,
} from "@/modules";
import { currencyFormat, fontTitle } from "@/utils";
import { getProductBySlug } from "@/modules/product/actions/get-product-by-slog";
import { AddToCart } from "./ui/AddToCart";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const product = await getProductBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title ?? "Producto no encontrado",
    description: product?.description ?? "",
    openGraph: {
      title: product?.title ?? "Producto no encontrado",
      description: product?.description ?? "",
      // images: [], // https://misitioweb.com/products/image.png
      images: [`/products/${product?.images[0]}`],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="col-span-1">
        {/* Slideshow Mobile */}
        <MobileSlideShow
          title={product.title}
          images={product.images.map((img) => img)}
          className="block md:hidden"
        />
        {/* Slideshow Desktop */}
        <SlideShow
          title={product.title}
          images={product.images.map((img) => img)}
          className="hidden md:block"
        />
      </div>
      {/* Detalles */}
      <div className="col-span-1 px-5 mt-20">
        <StockLabel slug={product.slug} />
        <h1 className={`${fontTitle.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">{currencyFormat(product.price)}</p>

        <AddToCart product={product} />

        {/* Descripción */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
