"use client";

import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { generatePaginationNumbers } from "../../utils/generatePaginationNumbers";
import { clsx } from "clsx";

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);
  if (isNaN(currentPage)) {
    redirect(pathName);
  }

  const allPages = generatePaginationNumbers(currentPage, totalPages);

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    if (pageNumber === "...") {
      return `${pathName}?${params.toString()}`;
    }

    if (+pageNumber <= 0) {
      return `${pathName}`;
    }

    if (+pageNumber > totalPages) {
      return `${pathName}?${params.toString()}`;
    }

    if (+pageNumber === 1) {
      return `${pathName}`;
    }

    params.set("page", pageNumber.toString());
    return `${pathName}?${params.toString()}`;
  };

  return (
    <div className="flex justify-center mt-20 ">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          <li className="page-item mr-3">
            {currentPage > 1 && (
              <Link
                className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                href={createPageUrl(currentPage - 1)}
              >
                <div className="flex items-start gap-1">
                  <IoChevronBack size={25} />
                  Anterior
                </div>
              </Link>
            )}
          </li>

          {allPages.map((page, index) => (
            <li
              key={page + "-" + index}
              className="page-item"
            >
              <Link
                className={`relative block py-1.5 px-3 border-0 outline-none mx-1 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none ${
                  page === currentPage &&
                  "bg-lime-600 text-white hover:bg-lime-600 hover:text-white shadow-lg"
                }`}
                href={createPageUrl(page)}
              >
                {page}
              </Link>
            </li>
          ))}

          <li className="page-item ml-3">
            <Link
              className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPage + 1)}
            >
              <div className="flex flex-row-reverse items-start gap-1">
                <IoChevronForward size={25} />
                Siguiente
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
