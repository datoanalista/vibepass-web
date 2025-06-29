export interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: "alimentos" | "bebestibles";
  quantity: number;
}

export const foodItemsData: FoodItem[] = [
  // Alimentos
  {
    id: 1,
    name: "Hamburguesa Italiana",
    description: "Pan, carne, palta, tomate, mayonesa",
    price: 6000,
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/6d2ab17a0bc294935cbc590b0b2293071d0ddaaf?placeholderIfAbsent=true",
    category: "alimentos",
    quantity: 1,
  },
  {
    id: 2,
    name: "Papas Fritas",
    description: "Papa casera, aceite, sal",
    price: 3000,
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/44745407f78638c566babb8eaf6474164d69168c?placeholderIfAbsent=true",
    category: "alimentos",
    quantity: 0,
  },
  {
    id: 3,
    name: "Pizza Familiar",
    description: "Masa, Queso, Tomate",
    price: 10000,
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/69c28e706ab5cd22d043c1689d8b0a5145921468?placeholderIfAbsent=true",
    category: "alimentos",
    quantity: 0,
  },
  // Bebestibles
  {
    id: 4,
    name: "Coca Cola - Sin Azúcar",
    description: "Bebida",
    price: 800,
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/afbf35b82a41f8f5c4cc00d741acef9cfba53407?placeholderIfAbsent=true",
    category: "bebestibles",
    quantity: 0,
  },
  {
    id: 5,
    name: "Fanta",
    description: "Bebida",
    price: 800,
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/fe60ddf60961c9ca83c55905fb6d55f13d783081?placeholderIfAbsent=true",
    category: "bebestibles",
    quantity: 2,
  },
  {
    id: 6,
    name: "Agua - Cachantun",
    description: "Bebida",
    price: 800,
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/d299fed25c2b0229e6656f7379d58db0375eaa07?placeholderIfAbsent=true",
    category: "bebestibles",
    quantity: 0,
  },
];

export const ticketData = [
  {
    id: 1,
    name: "Niños (Hasta 14 años)",
    price: 10000,
    quantity: 1,
  },
  {
    id: 2,
    name: "Adultos",
    price: 30000,
    quantity: 2,
  },
];
