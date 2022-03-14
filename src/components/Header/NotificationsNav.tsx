import { HStack, Icon, Text } from "@chakra-ui/react";
import { useState } from "react";
import { RiShoppingCart2Line } from "react-icons/ri";
import { useCart } from "../../contexts/CartContext";
import ModalCart from "../ModalCart";

export function NotificationsNav() {
  const { totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const OpenModalCart = () => {
    setIsOpen(true);
  };

  return (
    <HStack
      spacing={["6", "2"]}
      mx={["6", "8"]}
      pr={["6", "8"]}
      py="1"
      color="gray.300"
      borderRightWidth={1}
      borderColor="gray.700"
    >
      <ModalCart setIsOpen={setIsOpen} open={isOpen} />
      <Icon cursor='pointer' onClick={OpenModalCart} as={RiShoppingCart2Line} fontSize="35" />
      {totalItems > 0 && (
        <Text fontWeight="bold" color="red" fontFamily="Roboto">
          {totalItems}
        </Text>
      )}
    </HStack>
  );
}
