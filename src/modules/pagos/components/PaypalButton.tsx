"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from "@paypal/paypal-js";
import { setTransactionId } from "../actions/paypal/set-transaction-id";
import { paypalCheckPayment } from "../actions/paypal/paypal-check-payment";

interface Props {
  orderId: string;
  amount: number;
}

export const PaypalButton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = amount.toFixed(2).toString();
  console.log(roundedAmount);

  if (isPending) {
    return (
      <div className="animate-pulse">
        <div className="h-12 bg-gray-300 rounded"></div>
        <div className="h-12 bg-gray-300 rounded mt-2"></div>
      </div>
    );
  }

  const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
    
    const transactionId = await actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          // invoice_id: orderId,
          // reference_id: orderId,
          invoice_id: orderId,
          amount: {
            currency_code: "USD",
            value: roundedAmount,
          },
        },
      ],
    });
    
    // TODO: Guardar el transactionId en BD
    // setTransactionId
    const { ok, message } = await setTransactionId(orderId, transactionId);
    
    if (!ok) {
      throw new Error(message);
    }


    return transactionId;
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture();

    if (!details) return;
    
    await paypalCheckPayment(details.id ?? '');
  };


  return (
    <PayPalButtons
      createOrder={createOrder}
      onApprove={ onApprove }
    />
  );
};
