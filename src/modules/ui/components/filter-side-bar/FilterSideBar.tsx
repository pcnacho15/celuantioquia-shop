"use client";

import clsx from "clsx";
import { IoCloseOutline } from "react-icons/io5";
import { useUiStore, ValidMarcas } from "@/modules";

import { useFilterStore } from "@/modules/products/store/productStore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { fontTitle } from "@/utils";

interface Props {
  marcas: { marca: ValidMarcas }[];
  colores: any[];
}

const estados = ["nuevo", "exhibicion"];

export const FilterSidebar = ({ colores, marcas }:Props) => {
  const marcasSelect = useFilterStore((state) => state.marcas);
  const setMarcaFilter = useFilterStore((state) => state.setMarcaFilter);

  const coloresSelect = useFilterStore((state) => state.colores);
  const setColoresFilter = useFilterStore((state) => state.setColorFilter);

  const estadosSelect = useFilterStore((state) => state.estados);
  const setEstadoFilter = useFilterStore((state) => state.setEstadoFilter);

  const isFilterSideMenuOpen = useUiStore((state) => state.isFilterSideMenuOpen);
  const closeFilterMenu = useUiStore((state) => state.closeFilterSideMenu);

  return (
    <div>
      {/* Background black */}
      {isFilterSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
      )}

      {/* Blur */}
      {isFilterSideMenuOpen && (
        <div
          onClick={() => closeFilterMenu()}
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
        />
      )}

      {/* Sidemenu */}
      <div
        className={clsx(
          "fixed p-5 right-0 top-0 w-[350px] md:w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300 overflow-auto",
          {
            "translate-x-full": !isFilterSideMenuOpen,
          }
        )}
      >
        <div className="flex justify-between items-center">
          <span className={`${fontTitle.className} text-2xl`}>Filtros</span>
          <IoCloseOutline
            size={40}
            className="cursor-pointer"
            onClick={() => closeFilterMenu()}
          />
        </div>
        {/* Separador */}
        <div className="w-full h-px bg-gray-200 my-5"></div>
        {/* Input de busquedad */}
        <div className=" w-full m-auto pr-5">
          <Accordion
            type="multiple"
            defaultValue={["item-1", "item-2", "item-3"]}
          >
            <AccordionItem
              value="item-1"
              autoFocus
            >
              <AccordionTrigger>Categoría</AccordionTrigger>
              <AccordionContent>
                {marcas.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 mb-3"
                  >
                    <Checkbox
                      id={item.marca}
                      checked={marcasSelect.includes(item.marca)}
                      onCheckedChange={() => setMarcaFilter(item.marca)}
                    />
                    <label
                      htmlFor={item.marca}
                      className="text-sm capitalize font-medium text-gray-700 hover:cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {item.marca}
                    </label>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Color</AccordionTrigger>
              <AccordionContent>
                {colores.map((item, index) => (
                  <div
                    key={`${item.color}-${index}`}
                    className="flex items-center space-x-2 mb-3"
                  >
                    <Checkbox
                      id={item.color}
                      checked={coloresSelect.includes(item.color)}
                      onCheckedChange={() => setColoresFilter(item.color)}
                    />
                    <label
                      htmlFor={item.color}
                      className="text-sm capitalize font-medium text-gray-700 hover:cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {item.color}
                    </label>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-xl mb-3">Estado</AccordionTrigger>
              <AccordionContent>
                {estados.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="flex items-center space-x-2 mb-5"
                  >
                    <Checkbox
                      id={item}
                      checked={estadosSelect.includes(item)}
                      onCheckedChange={() => setEstadoFilter(item)}
                    />
                    <label
                      htmlFor={item}
                      className="text-base capitalize font-medium text-gray-700 hover:cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {item}
                    </label>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};
