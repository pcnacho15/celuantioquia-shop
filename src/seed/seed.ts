import { InputJsonValue } from "@prisma/client/runtime/library";

import bcryptjs from "bcryptjs";

interface SeedProduct {
  title: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  discount?: number;
  slug: string;
  tags?: string[];
  category: ValidCategories;
  marca: ValidMarcas;
  color?: string;
  estado: ValidStatus;
  bateria?: number;
  especificaciones?: InputJsonValue;
}

interface SeedUser {
  email: string;
  password: string;
  name: string;
  role: "admin" | "user";
}
type ValidStatus = "nuevo" | "exhibicion";
type ValidCategories = "celulares" | "accesorios";
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

interface SeedData {
  users: SeedUser[];
  categories: string[];
  products: SeedProduct[];
}

export const initialData: SeedData = {
  users: [
    {
      email: "nacho@google.com",
      name: "Nacho Pistacho",
      password: bcryptjs.hashSync("123456"),
      role: "admin",
    },
    {
      email: "tom@google.com",
      name: "Tom Soto",
      password: bcryptjs.hashSync("123456"),
      role: "user",
    },
  ],
  categories: ["celulares", "accesorios"],
  products: [
    {
      title: "IPhone 15 128GB",
      description:
        "IPhone 15 128GB Nuevo SIM FISICA / DUAL SIM FISICA + Beneficio Apartamento",
      images: ["AA-PRODUCT-0.jpg"],
      inStock: 3,
      price: 3019990,
      discount: 20,
      slug: "iphone-15-128-gigas-nuevo-sim-virtual-verde",
      //   tags: ["a", "b"],
      category: "celulares",
      estado: "nuevo",
      marca: "apple",
      color: "verde",
      especificaciones: {
        pantalla: "6.1”  2556 x 1179 pixeles",
        procesador: "Apple A16 Bionic",
        almacenamiento: "128 GB",
        expansion: "Sin micro SD",
        camara: "Triple 48MP + 12MP + 12MP",
        bateria: "3349 mAh",
        ios: "IOS 17",
        perfil: "7.8 mm",
        peso: "171 gr",
      },
    },
    {
      title: "IPhone 15 128GB",
      description:
        "IPhone 15 128GB Nuevo SIM FISICA / DUAL SIM FISICA + Beneficio Apartamento",
      images: ["AA-PRODUCT-1.jpg"],
      inStock: 3,
      price: 3019990,
      discount: 20,
      slug: "iphone-15-128-gigas-nuevo-sim-virtual-negro",
      //   tags: ["a", "b"],
      category: "celulares",
      marca: "apple",
      estado: "nuevo",
      color: "negro",
      especificaciones: {
        pantalla: "6.1”  2556 x 1179 pixeles",
        procesador: "Apple A16 Bionic",
        almacenamiento: "128 GB",
        expansion: "Sin micro SD",
        camara: "Triple 48MP + 12MP + 12MP",
        bateria: "3349 mAh",
        ios: "IOS 17",
        perfil: "7.8 mm",
        peso: "171 gr",
      },
    },
    {
      title: "IPhone 13 Pro 128GB",
      description:
        "El iPhone 13 pro cuenta con una pantalla super retina que te ofrecerá una experiencia rápida y fluida. Su diseño no se queda atrás te ofrece un material de acero inoxidable de calidad con resistencia al agua IP68.",
      images: ["BB-PRODUCT-0.jpg"],
      inStock: 3,
      price: 2399990,
      discount: 15,
      slug: "iphone-13-pro-128-gigas-de-exhibicion-verde",
      //   tags: ["a", "b"],
      category: "celulares",
      marca: "apple",
      estado: "exhibicion",
      color: "verde",
      especificaciones: {
        pantalla: "6.1”  1170 x 2532 pixeles",
        procesador: "Apple A15 Bionic",
        almacenamiento: "128 GB",
        expansion: "Sin micro SD",
        camara: "Cuádruple 12MP + 12MP + 12MP + TOF 3D",
        bateria: "3095 mAh",
        ios: "IOS 16",
        perfil: "7.7 mm",
        peso: "204 gr",
      },
    },
    {
      title: "IPhone 13 Pro 128GB",
      description:
        "El iPhone 13 pro cuenta con una pantalla super retina que te ofrecerá una experiencia rápida y fluida. Su diseño no se queda atrás te ofrece un material de acero inoxidable de calidad con resistencia al agua IP68.",
      images: ["BB-PRODUCT-1.jpg"],
      inStock: 3,
      price: 2399990,
      discount: 15,
      slug: "iphone-13-pro-128-gigas-de-exhibicion-dorado",
      //   tags: ["a", "b"],
      category: "celulares",
      marca: "apple",
      estado: "exhibicion",
      bateria: 89,
      color: "dorado",
      especificaciones: {
        pantalla: "6.1”  1170 x 2532 pixeles",
        procesador: "Apple A15 Bionic",
        almacenamiento: "128 GB",
        expansion: "Sin micro SD",
        camara: "Cuádruple 12MP + 12MP + 12MP + TOF 3D",
        bateria: "3095 mAh",
        ios: "IOS 16",
        perfil: "7.7 mm",
        peso: "204 gr",
      },
    },
    {
      title: "IPhone 12 Pro Max 256GB",
      description:
        "Este dispositivo es más ambicioso en la fotografía, tiene una pantalla super retina XDR display con una buena resolución y densidad, llevando hasta HDR 10 a 460 ppp, además de la mejor intensidad en colores, se ven más nítidos como si fueran de una pantalla grande.",
      images: ["CC-PRODUCT-0.jpg"],
      inStock: 3,
      price: 2399990,
      discount: 30,
      slug: "iphone-12-pro-max-256-gigas-de-exhibicion-azul",
      //   tags: ["a", "b"],
      category: "celulares",
      marca: "apple",
      estado: "exhibicion",
      bateria: 90,
      color: "azul",
      especificaciones: {
        pantalla: "6.7”  1284 x 2778 pixeles",
        procesador: "Apple A14 Bionic",
        almacenamiento: "256 GB",
        expansion: "Sin micro SD",
        camara: "Cuádruple 12MP + 12MP + 12MP + LÍDAR",
        bateria: "3687  mAh",
        ios: "IOS 16",
        perfil: "7.4 mm",
        peso: "228 gr",
      },
    },
    {
      title: "IPhone 12 Pro Max 256GB",
      description:
        "Este dispositivo es más ambicioso en la fotografía, tiene una pantalla super retina XDR display con una buena resolución y densidad, llevando hasta HDR 10 a 460 ppp, además de la mejor intensidad en colores, se ven más nítidos como si fueran de una pantalla grande.",
      images: ["CC-PRODUCT-1.jpg"],
      inStock: 3,
      price: 2399990,
      discount: 30,
      slug: "iphone-12-pro-max-256-gigas-de-exhibicion-dorado",
      //   tags: ["a", "b"],
      category: "celulares",
      marca: "apple",
      estado: "exhibicion",
      bateria: 87.9,
      color: "dorado",
      especificaciones: {
        pantalla: "6.7”  1284 x 2778 pixeles",
        procesador: "Apple A14 Bionic",
        almacenamiento: "256 GB",
        expansion: "Sin micro SD",
        camara: "Cuádruple 12MP + 12MP + 12MP + LÍDAR",
        bateria: "3687  mAh",
        ios: "IOS 16",
        perfil: "7.4 mm",
        peso: "228 gr",
      },
    },
    {
      title: "Samsung Galaxy S23 Ultra 256GB",
      description:
        "Este Samsung es el futuro de los dispositivo Android, tiene una pantalla Amoled de 6,8 pulgadas con resolución QHD+, además de una tasa de refresco de 120 Hz, Samsung siempre ofrece el mejor nivel de brillo en su pantalla, repele bien los reflejos, con un brillo mínimo te dará la mejor iluminación.",
      images: ["DD-PRODUCT-0.jpg"],
      inStock: 3,
      price: 3599990,
      discount: 30,
      slug: "samsung-galaxy-s23-ultra-256-gigas-nuevo-negro",
      //   tags: ["a", "b"],
      category: "celulares",
      marca: "samsung",
      estado: "nuevo",
      color: "negro",
      especificaciones: {
        pantalla: "6.8”  1440 x 3080 pixeles",
        procesador: "Snapdragon 8 Gen 2",
        almacenamiento: "256 GB",
        ram: "12 GB",
        // expansion: "Sin micro SD",
        camara: "Cuádruple 200MP + 12MP + 10MP + 10MP",
        bateria: "5000  mAh",
        os: "Android 13",
        perfil: "8.9 mm",
        peso: "234 gr",
      },
    },
    {
      title: "Samsung Galaxy S23 Ultra 256GB",
      description:
        "Este Samsung es el futuro de los dispositivo Android, tiene una pantalla Amoled de 6,8 pulgadas con resolución QHD+, además de una tasa de refresco de 120 Hz, Samsung siempre ofrece el mejor nivel de brillo en su pantalla, repele bien los reflejos, con un brillo mínimo te dará la mejor iluminación.",
      images: ["DD-PRODUCT-1.jpg"],
      inStock: 3,
      price: 3599990,
      discount: 30,
      slug: "samsung-galaxy-s23-ultra-256-gigas-nuevo-crema",
      //   tags: ["a", "b"],
      category: "celulares",
      marca: "samsung",
      estado: "nuevo",
      color: "crema",
      especificaciones: {
        pantalla: "6.8”  1440 x 3080 pixeles",
        procesador: "Snapdragon 8 Gen 2",
        almacenamiento: "256 GB",
        ram: "12 GB",
        // expansion: "Sin micro SD",
        camara: "Cuádruple 200MP + 12MP + 10MP + 10MP",
        bateria: "5000  mAh",
        os: "Android 13",
        perfil: "8.9 mm",
        peso: "234 gr",
      },
    },
    {
      title: "Samsung Galaxy A35 5G 256GB",
      description:
        "El Samsung Galaxy A35 debuta con una pantalla Super AMOLED de 6.6 pulgadas con tasa de refresco de 120Hz. Por dentro, encontramos a un procesador Exynos 1380 junto con 8GB de RAM y hasta 256GB de almacenamiento, y una batería de 5000 mAh con soporte para carga rápida.",
      images: ["EE-PRODUCT-0.jpg"],
      inStock: 3,
      price: 989990,
      discount: 40,
      slug: "samsung-galaxy-a35-256-gigas-8-ram-preventa-blanco",
      //   tags: ["a", "b"],
      category: "celulares",
      marca: "samsung",
      estado: "nuevo",
      color: "blanco",
      especificaciones: {
        pantalla: "6.6', 1080 x 2340 pixeles",
        procesador: "Exynos 1380 2.4GHz",
        almacenamiento: "256 GB",
        ram: "8 GB",
        expansion: "micro SD",
        camara: "Triple, 50MP+8MP+5MP",
        bateria: "5000  mAh",
        os: "Android 14",
        perfil: "8.2 mm",
        peso: "209 gr",
      },
    },
    {
      title: "Samsung Galaxy A35 5G 256GB",
      description:
        "El Samsung Galaxy A35 debuta con una pantalla Super AMOLED de 6.6 pulgadas con tasa de refresco de 120Hz. Por dentro, encontramos a un procesador Exynos 1380 junto con 8GB de RAM y hasta 256GB de almacenamiento, y una batería de 5000 mAh con soporte para carga rápida.",
      images: ["EE-PRODUCT-1.jpg"],
      inStock: 3,
      price: 989990,
      discount: 40,
      slug: "samsung-galaxy-a35-256-gigas-8-ram-preventa-negro",
      //   tags: ["a", "b"],
      category: "celulares",
      marca: "samsung",
      estado: "nuevo",
      color: "negro",
      especificaciones: {
        pantalla: "6.6', 1080 x 2340 pixeles",
        procesador: "Exynos 1380 2.4GHz",
        almacenamiento: "256 GB",
        ram: "8 GB",
        expansion: "micro SD",
        camara: "Triple, 50MP+8MP+5MP",
        bateria: "5000  mAh",
        os: "Android 14",
        perfil: "8.2 mm",
        peso: "209 gr",
      },
    },
    {
      title: "Apple Watch SE 2nd Generación – 40 MM",
      description: "Apple Watch SE 2nd Generación – 40 MM",
      images: ["FF-PRODUCT-0.jpg", "FF-PRODUCT-1.jpg"],
      inStock: 3,
      price: 1049990,
      slug: "apple-watch-se-2nd-generacion-40-mm-negro",
      //   tags: ["a", "b"],
      category: "accesorios",
      marca: "apple",
      estado: "nuevo",
      color: "negro",
      especificaciones: {
        pantalla: "Retina OLED LTPO",
        os: "IOS",
        dimensiones: "40 x 34 mm",
        bateria: "Hasta 18 horas",
        procesador: "Chip S8",
        conectividad: "Bluetooth 5.3 – WI-FI ",
        funciones:
          "Brújula, Altímetro, Resistencia al agua, Sensor luz ambiental, Micrófono, Emergencia SOS.",
      },
    },
    {
      title: "Samsung Galaxy Watch 4",
      description: "Samsung Galaxy Watch 4",
      images: ["GG-PRODUCT-0.jpg", "GG-PRODUCT-1.jpg"],
      inStock: 3,
      price: 599990,
      discount: 30,
      slug: "samsung-galaxy-watch-4-negro",
      //   tags: ["a", "b"],
      category: "accesorios",
      marca: "samsung",
      estado: "nuevo",
      color: "negro",
      especificaciones: {
        pantalla: "Retina OLED LTPO",
        os: "IOS",
        dimensiones: "40 x 34 mm",
        bateria: "Hasta 18 horas",
        procesador: "Chip S8",
        conectividad: "Bluetooth 5.3 – WI-FI ",
        funciones:
          "Brújula, Altímetro, Resistencia al agua, Sensor luz ambiental, Micrófono, Emergencia SOS.",
      },
    },
  ],
};
