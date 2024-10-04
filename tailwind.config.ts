import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        verde: "#55b223",
        dorado: "#dfe360",
        azul: "#5168a8",
        negro: "#45474e",
        crema: "#e6e7d4",
        blanco: "#f6f6f0",
        
      },
    },
  },
  plugins: [],
};
export default config;
