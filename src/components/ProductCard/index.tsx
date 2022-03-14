import {
  Button,
  Icon,
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";
import { RiShoppingCart2Line, RiCheckLine } from "react-icons/ri";
import { useAlert } from "../../contexts/AlertContext";
import { useCart } from "../../contexts/CartContext";

interface ProductProps {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export default function ProductCard({
  category,
  description,
  id,
  image,
  price,
  title,
}: ProductProps) {
  const { setMessage, setOpenAlert } = useAlert();
  const { addProduct, Contains } = useCart();

  const AddCart = () => {
    if (Contains(id)) {
      setMessage("Este produto já está no carrinho");
      setOpenAlert(true);
    } else {
      addProduct({ id, title, price, category, description, image });
      setOpenAlert(true);
      setMessage(`Produto adicionado ao carrinho!`);
    }
  };

  return (
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${image})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            rounded={"lg"}
            height={230}
            width={282}
            objectFit={"cover"}
            src={image}
          />
        </Box>
        <Stack pt={10} align={"center"}>
          <Text color={"gray.900"} fontSize={"sm"} textTransform={"uppercase"}>
            {title}
          </Text>
          <Text color={"gray.500"} fontSize={"sm"}>
            {category}
          </Text>
          <Heading color={"GrayText"} fontSize={"sm"} fontWeight={500}>
            {description.substring(0, 140)}...
          </Heading>
          <Stack direction={"column"} align={"center"}>
            <Text color={"black"} fontWeight={800} fontSize={"xl"}>
              R$ {price}
            </Text>
            {Contains(id) ? (
              <Icon as={RiCheckLine} fontSize="30" color="green.500" />
            ) : (
              <Button
                onClick={AddCart}
                backgroundColor="gray.700"
                leftIcon={<Icon as={RiShoppingCart2Line} fontSize="20" />}
              >
                Adicionar
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
