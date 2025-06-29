export interface TicketType {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export const initialTicketTypes: TicketType[] = [
  {
    id: 1,
    name: "Niños (Hasta 14 años)",
    price: 10000,
    quantity: 1,
  },
  {
    id: 2,
    name: "Adultos",
    price: 15000,
    quantity: 2,
  },
  {
    id: 3,
    name: "Adulto mayor",
    price: 6000,
    quantity: 0,
  },
];

export const formatPrice = (price: number): string => {
  return `$${price.toLocaleString("es-CL")}`;
};

export const calculateCartTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.total, 0);
};
