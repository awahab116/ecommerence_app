interface CartItem {
  productId: number;
  quantity: number;
}

export interface Cart {
  userId?: number;
  date: string;
  products: CartItem[];
}
