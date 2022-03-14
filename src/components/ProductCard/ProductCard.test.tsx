import { render, screen } from "@testing-library/react";

import ProductCard from ".";

const MockProduct = {
  id: 1,
  title: "Product 1",
  price: 100,
  category: "Category 1",
  description: "Description 1",
  image: "https://via.placeholder.com/150",
};

describe("ProductCard component", () => {
  it("renders correctly", () => {
    render(
      <ProductCard
        category={MockProduct.category}
        description={MockProduct.description}
        id={MockProduct.id}
        image={MockProduct.image}
        price={MockProduct.price}
        title={MockProduct.title}
      />
    );
  });
});
