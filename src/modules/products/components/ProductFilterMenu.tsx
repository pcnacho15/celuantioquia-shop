import { FilterSidebar } from "@/modules/ui/components/filter-side-bar/FilterSideBar";
import { getFiltersProduct } from "../actions/product-filters";

export const ProductFilterMenu = async () => {
  const { marcas, colores } = await getFiltersProduct();

  return (
    <FilterSidebar
      colores={colores}
      marcas={marcas}
    />
  );
};
