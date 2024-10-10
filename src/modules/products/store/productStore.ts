import { CartProduct } from "@/modules/products/interfaces/Product";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  marcas: any[];
  colores: any[];
  estados: any[];

  // Methods
  setMarcaFilter: (marcasFilter: string) => void;

  setColorFilter: (color: any) => void;

  setEstadoFilter: (estado: any) => void;
}

export const useFilterStore = create<State>()(
  persist(
    (set, get) => ({
      marcas: [],
      colores: [],
      estados: [],

      // Methods
      setMarcaFilter: (marcaFilter: string) => {
        let { marcas } = get();

        if (marcas.includes(marcaFilter)) {
          set({
            marcas: marcas.filter((marca) => marca !== marcaFilter),
          });

          return;
        }

        set({
          marcas: [...marcas, marcaFilter],
        });
      },
      setColorFilter: (color: string) => {
        let { colores } = get();

        if (colores.includes(color)) {
          set({
            colores: colores.filter((item) => item !== color),
          });

          return;
        }

        set({
          colores: [...colores, color],
        });
      },

      setEstadoFilter: (estado: string) => {
        let { estados } = get();

        if (estados.includes(estado)) {
          set({
            estados: estados.filter((item) => item !== estado),
          });

          return;
        }

        set({
          estados: [...estados, estado],
        });
      },
    }),
    {
      name: "filter-products",
    }
  )
);
