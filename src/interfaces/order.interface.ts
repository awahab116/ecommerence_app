interface CartItem {
  productId: number;
  quantity: number;
}

export interface Order {
  id?: number;
  userId?: number;
  date: string;
  products: CartItem[];
  totalPrice: number;
  orderStatus?: string;
  userDetails?: {
    username: string;
  };
}
