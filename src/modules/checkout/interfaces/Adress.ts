export interface Departamento {
  id: number;
  nombre: string;
}

export interface Municipio {
  id: number;
  nombre: string;
  departamentoId: number;
}

export interface Adress {
//   id: string;
  nombres: string;
  apellidos: string;
  direccion: string;
  direccion2?: string;
  telefono: string;
  correo: string;
  numeroDocumento: string;
  tipoDocumento: string;
  departamento: string;
  municipio: string;
  tipoEnvio: boolean;
  // codigoPostal: string;
  // ciudad: string;
  // pais: string;
}