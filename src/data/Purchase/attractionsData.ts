export interface Promotion {
  id: number;
  title: string;
}

export interface Attraction {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: "heightRestriction" | "kidsZone";
  quantity: number;
}

export interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  category: "tickets" | "food" | "attractions";
}

export const promotionsData: Promotion[] = [
  { id: 1, title: "Pack familar" },
  { id: 2, title: "Pack familar" },
  { id: 3, title: "Pack familar" },
];

export const attractionsData: Attraction[] = [
  {
    id: 1,
    name: "Toro mecánico",
    description: "1 intento",
    price: 3000,
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/0c221c57f90ac88710dff171d53c94872b093b36?width=864",
    category: "heightRestriction",
    quantity: 1,
  },
  {
    id: 2,
    name: "Bolos humanos",
    description: "15 minutos",
    price: 2000,
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/d42a856419c7e5802117d0f9ae845153d8879f6d?width=750",
    category: "heightRestriction",
    quantity: 0,
  },
  {
    id: 3,
    name: "Taca Taca",
    description: "1 partido",
    price: 1500,
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/8ff5843e1c83e48e45b6b962ca9af8835ed5b778?width=807",
    category: "heightRestriction",
    quantity: 0,
  },
  {
    id: 4,
    name: "15 minutos",
    description: "Bebida",
    price: 2000,
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/f59a3dd4bc92cd0c64b801e737c848b56dc756f5?width=660",
    category: "kidsZone",
    quantity: 0,
  },
  {
    id: 5,
    name: "Cama elástica",
    description: "15 miuntos",
    price: 2000,
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/541e6228a7be8927c0bf48cfc5207673ca5704a6?width=712",
    category: "kidsZone",
    quantity: 1,
  },
  {
    id: 6,
    name: "15 minutos",
    description: "Bebida",
    price: 1500,
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/f3484759d6e08306bc41001e062ca0daca2b9b7d?width=734",
    category: "kidsZone",
    quantity: 0,
  },
];

export const initialCartData: CartItem[] = [
  {
    id: 1,
    name: "Niños (Hasta 14 años)",
    quantity: 1,
    price: 10000,
    category: "tickets",
  },
  { id: 2, name: "Adultos", quantity: 2, price: 15000, category: "tickets" },
  {
    id: 3,
    name: "Hamburguesa Italiana",
    quantity: 1,
    price: 6000,
    category: "food",
  },
  { id: 4, name: "Fanta", quantity: 2, price: 800, category: "food" },
  {
    id: 5,
    name: "Toro mecánico",
    quantity: 1,
    price: 3000,
    category: "attractions",
  },
  {
    id: 6,
    name: "Cama elástica",
    quantity: 1,
    price: 2000,
    category: "attractions",
  },
];
