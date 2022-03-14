import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "../styles/theme";
import { AlertProvider } from "../contexts/AlertContext";
import { CartProvider } from "../contexts/CartContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <CartProvider>
        <AlertProvider>
          <Component {...pageProps} />
        </AlertProvider>
      </CartProvider>
    </ChakraProvider>
  );
}

export default MyApp;
