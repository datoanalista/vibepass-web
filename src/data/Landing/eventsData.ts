export interface Event {
  id: string;
  ticketsAvailable: string;
  imageUrl: string;
  date: string;
  month: string;
  location: string;
  title: string;
  time: string;
}

export const eventsData: Event[] = [
  {
    id: "1",
    ticketsAvailable: "110",
    imageUrl:
      "/images/landing/Compra-tu-entrada-1.png",
    date: "28",
    month: "Febrero",
    location: "Parque Padre Hurtado – Santiago",
    title: "Carnaval Fiesta de disfraces",
    time: "12:00 - 15:00",
  },
  {
    id: "2",
    ticketsAvailable: "280",
    imageUrl:
      "/images/landing/Compra-tu-entrada-2.png",
    date: "20",
    month: "Agosto",
    location: "Parque Quinta Normal – Santiago Centro",
    title: "Infancias con títeres",
    time: "16:00 - 18:00",
  },
  {
    id: "3",
    ticketsAvailable: "500",
    imageUrl:
      "/images/landing/Compra-tu-entrada-3.png",
    date: "15",
    month: "Enero",
    location: "Parque borcelle – Santiago",
    title: "Folklorica infantil",
    time: "11:00 - 14:00",
  },
  {
    id: "4",
    ticketsAvailable: "230",
    imageUrl:
      "/images/landing/Compra-tu-entrada-4.png",
    date: "01",
    month: "Octubre",
    location: "Parque Padre Hurtado – Santiago",
    title: "Casa Piedra – Vitacura",
    time: "16:00 - 20:00",
  },
  {
    id: "5",
    ticketsAvailable: "420",
    imageUrl:
      "/images/landing/Compra-tu-entrada-5.png",
    date: "30",
    month: "Abril",
    location: "Parque Bicentenario – Vitacura, Santiago",
    title: "Feliz día del niño",
    time: "10:00 - 14:00",
  },
  {
    id: "6",
    ticketsAvailable: "80",
    imageUrl:
      "/images/landing/Compra-tu-entrada-6.png",
    date: "31",
    month: "Octubre",
    location: "Espacio Riesco – Huechuraba, Santiago",
    title: "Fiesta de halloween",
    time: "18:00 - 21:00",
  },
];
