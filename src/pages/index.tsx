import { Box, Heading, Skeleton, Stack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import ProductCard from "../components/ProductCard";
import { GetStaticProps } from "next";
import productsMock from "../utils/mock.json";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

interface Props {
  products: Product[];
}

export default function Home({ products }: Props) {
  return (
    <Box>
      <Header />
      <Box marginTop="4%" paddingInline="13%">
        <Heading
          textAlign="center"
          color={"white"}
          mb={5}
          fontSize={{ base: "2xl", md: "3xl" }}
        >
          Veja nosso catálogo
        </Heading>
        {products?.length > 0 ? (
          <Box
            overflow="auto"
            display="grid"
            gridGap="1.5rem"
            gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
            gridAutoRows="minmax(200px, auto)"
          >
            {products.map((product) => (
              <ProductCard
                category={product.category}
                description={product.description}
                id={product.id}
                image={product.image}
                price={product.price}
                title={product.title}
                key={product.id}
              />
            ))}
          </Box>
        ) : (
          <Stack>
            <Skeleton height="50px" />
            <Skeleton height="50px" />
            <Skeleton height="50px" />
            <Skeleton height="50px" />
            <Skeleton height="50px" />
            <Skeleton height="50px" />
          </Stack>
        )}
      </Box>
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await axios.get("https://fakestoreapi.com/products");
  const products = response.data;

  return {
    props: {
      products,
    },
    revalidate: 60, //1min
  };
};
