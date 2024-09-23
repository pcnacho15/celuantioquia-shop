export interface OrderItem {
  quantity: number;
  price: number;
  color: string;
  product: {
    title: string;
    slug: string;
    ProductImages: {
      url: string;
    }[];
  };
}
