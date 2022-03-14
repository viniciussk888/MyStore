import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export interface CartProviderProps {
  children: ReactNode;
}

interface CartProvider {
  cart: Product[];
  totalCart: number;
  totalItems: number;
  Contains: (id: number) => boolean;
  addProduct: (cart: Product) => void;
  setCart: (cart: Product[]) => void;
}

const CartContext = createContext<CartProvider>({
  cart: [],
  totalCart: 0,
  totalItems: 0,
  addProduct: () => {},
  Contains: () => false,
  setCart: () => {},
});

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Product[]>([]);
  const [totalCart, setTotalCart] = useState(0);
  const [totalItems, seTotalItems] = useState(0);

  const addProduct = (product: Product) => {
    setCart([...cart, product]);
  };

  useEffect(() => {
    const total = cart.reduce((acc, cur) => acc + cur.price, 0);
    setTotalCart(total);
  }, [cart]);

  useEffect(() => {
    seTotalItems(cart.length);
  }, [cart]);

  const Contains = (id: number) => {
    return cart.some((product) => product.id === id);
  };

  return (
    <CartContext.Provider
      value={{ setCart, cart, totalCart, totalItems, Contains, addProduct }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
