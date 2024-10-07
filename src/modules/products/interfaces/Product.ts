import { JsonValue } from "@prisma/client/runtime/library";

export interface Product {
  id: string;
  title: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  discount?: number | null;
  slug: string;
  tags?: string[];
  // category: ValidCategories;
  marca: ValidMarcas;
  color: string | null;
  estado: string;
  bateria?: number | null;
  especificaciones?: {};
}

export interface ProductImage {
  id: number;
  productId: string;
  url: string;
  codeColor?: string | null;
  color?: string | null;
}

export interface CartProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  color?: string | null;
  image: string;
}

// type ValidCategories = "celulares" | "accesorios";
export type ValidMarcas =
  | "apple"
  | "samsung"
  | "xiaomi"
  | "motorola"
  | "nokia"
  | "zte"
  | "infinix"
  | "tecno"
  | "vivo"
  | "oppo";
