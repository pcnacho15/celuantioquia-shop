import { Metadata } from "next";
import { notFound } from "next/navigation";

import { MdBatteryCharging90 } from "react-icons/md";

import { getProductBySlug } from "@/modules/product/actions/get-product-by-slog";
import { CarruselProducts } from "@/modules/products/components/CarruselProducts";
import { getProductsRelationByMarca } from "@/modules/products/actions/product-by-relation";
import { MobileSlideShow, SlideShow, StockLabel, Title } from "@/modules";
import { currencyFormat, fontTitle } from "@/utils";

import { AddToCart } from "./ui/AddToCart";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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
  const { products } = await getProductsRelationByMarca(
    product!.marca,
    product!.id
  );

  if (!product) notFound();

  return (
    <>
      <div className="mt-10 mb-20 grid grid-cols-1 md:grid-cols-2 gap-8 lg:w-3/4 m-auto">
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
        <div className="col-span-1 px-5 mt-0">
          <StockLabel slug={product.slug} />
          <h1 className={`${fontTitle.className} antialiased text-xl`}>
            {product.title}{" "}
            <span className="capitalize text-base font-semibold">
              ({product.color})
            </span>{" "}
          </h1>
          <span className="capitalize text-base font-semibold text-gray-400 mt-1">
            {product.estado === "exhibicion" ? "exhibición" : product.estado}
          </span>
          {product.bateria && (
            <div className="flex items-center justify-start gap-2 rounded w-1/6 h-6 lg:h-auto lg:mr-8 pr-1 mt-5">
              <span className="text-base text-neutral-700 font-semibold">
                Batería:{" "}
              </span>
              <span className="flex flex-nowrap text-base">
                <MdBatteryCharging90
                  size={23}
                  className="text-lime-600"
                />
                {product.bateria}%
              </span>
            </div>
          )}
          <div className="flex flex-col my-5">
            <div className="flex items-center">
              <span className={`${!product.discount && "mb-5"} font-bold`}>
                {currencyFormat(product.price)}
              </span>
              {product.discount && (
                <span className="text-xs bg-red-600 rounded text-white px-1 ml-1">
                  -{product.discount}%
                </span>
              )}
            </div>
            {product.discount && (
              <span className="text-gray-400 line-through text-sm">
                {currencyFormat(
                  (product.price * product.discount) / 100 + product.price
                )}
              </span>
            )}
          </div>
          
          <AddToCart product={product} />

          {/* Detalles del profucto */}
          <Accordion
            type="single"
            collapsible
            className="w-full"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>Descripción</AccordionTrigger>
              <AccordionContent>
                <p className="font-light">{product.description}</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Especificaciones</AccordionTrigger>
              <AccordionContent>
                hola
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                Yes. It's animated by default, but you can disable it if you
                prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div className="flex flex-col gap-3 justify-center px-10 md:px-5 m-auto">
        <Title title="Otrxs han comprado" />
        <CarruselProducts products={products} />
      </div>
    </>
  );
}
