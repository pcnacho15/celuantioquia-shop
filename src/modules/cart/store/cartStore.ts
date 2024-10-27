import { CartProduct } from "@/modules/products/interfaces/Product";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  // Methods
  getTotalItems: () => number;
  getSummaryProducts: () => {
    totalItems: number;
    subTotal: number;
    // tax: number;
    total: number;
  };
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;

  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      // Methods

      getTotalItems: () => {
        const { cart } = get();

        return cart.reduce((total, item) => total + item.quantity, 0);
      },
      getSummaryProducts: () => {
        const { cart } = get();
        const totalItems = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );

        const subTotal = cart.reduce(
          (acumulador, item) => item.quantity * item.price + acumulador,
          0
        );
        // const tax = subTotal * 0.15;
        // const total = subTotal + tax;
        const total = subTotal;

        return {
          totalItems,
          subTotal,
          // tax,
          total,
        };
      },
      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        const productCart = cart.some(
          (p) => p.id === product.id && p.color === product.color
        );

        if (!productCart) {
          set({
            cart: [...cart, product],
          });
          return;
        }

        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.color === product.color) {
            return { ...item, quantity: item.quantity + product.quantity };
          }
          return item;
        });

        set({
          cart: updatedCartProducts,
        });
      },
      updateProductQuantity: (product, quantity) => {
        const { cart } = get();

        const updatedProducts = cart.map((item) => {
          if (item.id === product.id && item.color === product.color) {
            item.quantity = quantity;
            return item;
          }

          return item;
        });

        set({
          cart: updatedProducts,
        });
      },
      removeProduct: (product) => {
        const { cart } = get();
        const updatedProductsDelete = cart.filter(
          (item) => item.id !== product.id || item.color !== product.color
        );

        set({
          cart: updatedProductsDelete,
        });
      },

      clearCart: () => {
        set({ cart: [] });
      },
    }),
    {
      name: "shopping-cart",
    }
  )
);
