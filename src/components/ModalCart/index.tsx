import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableCaption,
  Tbody,
  Td,
  Avatar,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Icon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { RiCheckboxIndeterminateLine, RiAddBoxLine } from "react-icons/ri";

interface Product {
  id: number;
  title: string;
  price: number;
  amount: number;
  category: string;
  description: string;
  image: string;
}

interface ModalCartProps {
  open: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function ModalCart({ open,setIsOpen }: ModalCartProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { cart, setCart } = useCart();
  const [cartWithTotal, setCartWithTotal] = useState<Product[]>([]);

  const removeItemcart = (id: number) => {
    const newCart = cartWithTotal.filter((product) => product.id !== id);
    setCartWithTotal(newCart);
    setCart(newCart);
  };

  const sumTotalValue = () => {
    const total = cartWithTotal.reduce(
      (acc, cur) => acc + cur.price * cur.amount,
      0
    );
    return total;
  };

  const addAmount = (product: Product) => {
    const newCart = cartWithTotal.map((item) => {
      if (item.id === product.id) {
        return { ...product, amount: product.amount + 1 };
      }
      return item;
    });
    setCartWithTotal(newCart);
  };

  const removeAmount = (product: Product) => {
    const newCart = cartWithTotal.map((item) => {
      if (item.id === product.id && product.amount > 1) {
        return { ...product, amount: product.amount - 1 };
      }
      return item;
    });
    setCartWithTotal(newCart);
  };

  useEffect(() => {
    let cartTemp = [];
    cart.map((item) => {
      cartTemp.push({
        ...item,
        amount: 1,
      });
    });
    setCartWithTotal(cartTemp);
  }, [cart]);

  useEffect(() => {
    if (open) {
      onOpen();
    }
  }, [open]);

  const closeModal = () => {
    onClose();
    setIsOpen(false)
  }

  return (
    <>
      <Modal size="2xl" isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="black">Carrinho</ModalHeader>
          <ModalBody>
            <Table variant="striped">
              <TableCaption color="black" fontSize={20}>
                Total: R$ {sumTotalValue().toFixed(2)}
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>Item</Th>
                  <Th>QTD</Th>
                  <Th>Valor</Th>
                  <Th>remover</Th>
                </Tr>
              </Thead>
              <Tbody>
                {cartWithTotal.map((item) => (
                  <Tr key={item.id}>
                    <Td
                      fontSize={10}
                      display="flex"
                      alignItems="center"
                      color="black"
                      maxW="290px"
                    >
                      <Avatar mr="3" name={item.title} src={item.image} />{" "}
                      {item.title}
                    </Td>
                    <Td minW="150px" color="black">
                      <Icon
                        onClick={() => removeAmount(item)}
                        cursor="pointer"
                        mr={3}
                        as={RiCheckboxIndeterminateLine}
                        color="black"
                        size={30}
                      />
                      {item.amount}
                      <Icon
                        onClick={() => addAmount(item)}
                        cursor="pointer"
                        ml={3}
                        as={RiAddBoxLine}
                        color="black"
                        size={30}
                      />
                    </Td>
                    <Td color="black">{item.price}</Td>
                    <Td color="black">
                      <Button
                        onClick={() => removeItemcart(item.id)}
                        colorScheme="red"
                        size="sm"
                      >
                        Remover
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={closeModal}>
              Fechar
            </Button>
            <Button colorScheme="blue">Finalizar compra</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
