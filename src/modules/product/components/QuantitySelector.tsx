// "use client";

// import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
  onQuantityChanges: (quantity: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChanges }: Props) => {
  // const [cantidad, setCantidad] = useState(quantity);

  const onChangeQuantity = (value: number) => {
    if (quantity + value < 1) return;
    // setCantidad(cantidad + value);
    onQuantityChanges(quantity + value);
  };

  return (
    <div className="flex items-center">
      <button onClick={() => onChangeQuantity(-1)}>
        <IoRemoveCircleOutline size={20} />
      </button>
      <span className="w-10 md:w-20 mx-0 md:mx-3 px-0 md:px-5 bg-gray-100 text-center rounded">
        {quantity}
      </span>
      <button onClick={() => onChangeQuantity(+1)}>
        <IoAddCircleOutline size={20} />
      </button>
    </div>
  );
};
