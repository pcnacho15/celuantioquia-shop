import { JsonValue } from "@prisma/client/runtime/library";

export interface Product {
  id: string;
  title: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  priceCompare?: number;
  slug: string;
  tags?: string[];
  // category: ValidCategories;
  marca: ValidMarcas;
  colores: string[];
  especificaciones?: JsonValue;
}

export interface CartProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  color?: string;
  image: string;
}

// type ValidCategories = "celulares" | "accesorios";
type ValidMarcas =
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