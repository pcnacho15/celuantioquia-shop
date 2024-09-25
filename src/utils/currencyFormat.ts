export const currencyFormat = (value: number) => {
  return `$${new Intl.NumberFormat("co-CO", {
    style: "decimal",
    currency: "COP",
  }).format(value)}`
};
