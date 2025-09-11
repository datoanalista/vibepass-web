// Tipos compartidos para eventos
export interface EventAPI {
  id?: string;
  _id?: string;
  informacionGeneral: {
    nombreEvento: string;
    descripcion: string;
    fechaEvento: string;
    horaInicio: string;
    horaTermino: string;
    lugarEvento: string;
    bannerPromocional: string;
    fechaCreacion: string;
    estado: string;
  };
  entradas?: Array<{
    cuposDisponibles: number;
    entradasVendidas: number;
    tipoEntrada: string;
    precio: number;
    activa: boolean;
  }>;
}

// Tipo más flexible para el contexto (puede tener campos opcionales)
export interface EventContextType {
  id?: string;
  _id?: string;
  informacionGeneral?: {
    nombreEvento?: string;
    descripcion?: string;
    fechaEvento?: string;
    horaInicio?: string;
    horaTermino?: string;
    lugarEvento?: string;
    bannerPromocional?: string;
    fechaCreacion?: string;
    estado?: string;
  };
  entradas?: Array<{
    cuposDisponibles?: number;
    entradasVendidas?: number;
    tipoEntrada?: string;
    precio?: number;
    activa?: boolean;
  }>;
}

// Tipo para eventos de landing (diferente estructura)
export interface EventLanding {
  id: string;
  ticketsAvailable: string;
  imageUrl: string;
  date: string;
  month: string;
  location: string;
  title: string;
  time: string;
}
