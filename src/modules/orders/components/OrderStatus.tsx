import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

interface Props {
  isPaid: string;
  refEpayco?: string;
}

export const OrderStatus = ({ isPaid, refEpayco }: Props) => {
  return (
    <div
      className={clsx(
        "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white",
        {
          "bg-blue-500": isPaid === 'pendiente',
          "bg-green-700": isPaid === 'pagado',
          "bg-red-700": isPaid === 'rechazado',
        }
      )}
    >
      <IoCardOutline size={30} />
      {/* <span className="mx-2">Pendiente de pago</span> */}
      <span className="mx-2">{isPaid}</span>
      <span>{`Ref N° ${refEpayco}`}</span>
    </div>
  );
};
