import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  adress: {
    correo:string;
    nombres: string;
    apellidos: string;
    celular: string;
    tipoDocumento: string;
    numeroDocumento: string;
    direccion: string;
    direccion2?: string;
    codigoPostal: string;
    ciudad: string;
    pais: string;
    telefono: string;
  };

  // Methods
  setAdress: (adress: State["adress"]) => void;
  getAdress: () => State["adress"];
}

export const useAdresStore = create<State>()(
  persist(
    (set, get) => ({
      adress: {
        correo
nombres
apellidos
celular
tipoDocumento
numeroDocumento
direccion
direccion2
codigoPostal
ciudad
pais
telefono
        correo
nombres
apellidos
celular
tipoDocumento
numeroDocumento
direccion
direccion2
codigoPostal
ciudad
pais
telefono
        correo
nombres
apellidos
celular
tipoDocumento
numeroDocumento
direccion
direccion2
codigoPostal
ciudad
pais
telefono
        correo
nombres
apellidos
celular
tipoDocumento
numeroDocumento
direccion
direccion2
codigoPostal
ciudad
pais
telefono
        correo
nombres
apellidos
celular
tipoDocumento
numeroDocumento
direccion
direccion2
codigoPostal
ciudad
pais
telefono
        correo
nombres
apellidos
celular
tipoDocumento
numeroDocumento
direccion
direccion2
codigoPostal
ciudad
pais
telefono
        correo
nombres
apellidos
celular
tipoDocumento
numeroDocumento
direccion
direccion2
codigoPostal
ciudad
pais
telefono
        correo
nombres
apellidos
celular
tipoDocumento
numeroDocumento
direccion
direccion2
codigoPostal
ciudad
pais
telefono
      },
      setAdress: (adress) => {
        set({ adress });
      },
      getAdress: () => {
        const { adress } = get();
      
        return adress;
    }
    }),
    {
      name: "adress-storage",
    }
  )
);
