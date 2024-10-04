import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "../interfaces/Product";
import Link from "next/link";
import Image from "next/image";

interface Props {
  products: Product[];
}

export const CarruselProducts = ({ products }: Props) => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-6xl"
    >
      <CarouselContent>
        {products.map((product, index) => (
          <CarouselItem
            key={index}
            className="md:basis-1/2 lg:basis-1/3"
          >
            <div className="p-1">
              <Card className=" w-full">
                <CardContent className="flex aspect-square items-center justify-center p-6 w-full h-full">
                  <div className="flex flex-col rounded-xl overflow-hidden fade-in bg-white">
                    <Link href={`/product/${product.slug}`}>
                      <Image
                        src={`/products/${product.images[0]}`}
                        alt={product.title}
                        className="w-full object-cover rounded"
                        width={500}
                        height={500}
                        // onMouseEnter={() => setDisplayImage(product.images[1])}
                        // onMouseLeave={() => setDisplayImage(product.images[0])}
                        priority
                      />
                      {/* <div className="relative bg-lime-600 h-9 text-white font-semibold text-center">
          <span>40% OFF</span>
        </div> */}
                    </Link>
                    <Link
                      className="hover:text-lime-600  text-ellipsis grow"
                      href={`/product/${product.slug}`}
                    >
                      <div className="flex flex-col">
                        <span>
                          {product.title}{" "}
                          <span className="capitalize text-sm font-semibold">
                            ({product.color})
                          </span>{" "}
                        </span>
                        <span className="capitalize text-sm font-semibold text-gray-400 mt-1">
                          {product.estado === "exhibicion"
                            ? "exhibición"
                            : product.estado}
                        </span>
                      </div>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
