export const currencyFormat = (value: number) => {
  return new Intl.NumberFormat("co-CO", {
    style: "currency",
    currency: "COP",
  }).format(value);
};
