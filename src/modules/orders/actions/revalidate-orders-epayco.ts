


export const revalidateOrders = async (transactionId: string) => {
 
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/epayco`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ref_epayco: transactionId }),
        }
      );

      const data = await response.json();
      console.log(data);
      return data.order;
    } catch (error) {
      console.error("Error validando la orden:", error);
    }
};
