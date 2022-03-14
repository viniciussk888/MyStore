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
  totalItems: number;
  Contains: (id: number) => boolean;
  addProduct: (cart: Product) => void;
  setCart: (cart: Product[]) => void;
}

const CartContext = createContext<CartProvider>({
  cart: [],
  totalItems: 0,
  addProduct: () => {},
  Contains: () => false,
  setCart: () => {},
});

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Product[]>([]);
  const [totalItems, seTotalItems] = useState(0);

  const addProduct = (product: Product) => {
    setCart([...cart, product]);
    sessionStorage.setItem("@cart", JSON.stringify([...cart, product]));
  };

  useEffect(() => {
    const cartStorage = sessionStorage.getItem("@cart");
    if (cartStorage) {
      setCart(JSON.parse(cartStorage));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("@cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    seTotalItems(cart.length);
  }, [cart]);

  const Contains = (id: number) => {
    return cart.some((product) => product.id === id);
  };

  return (
    <CartContext.Provider
      value={{ setCart, cart, totalItems, Contains, addProduct }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
