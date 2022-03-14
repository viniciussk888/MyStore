import { render, screen } from "@testing-library/react";

import ModalCart from ".";

describe("ModalCart component", () => {
  it("renders correctly", () => {
    render(<ModalCart open={true} setIsOpen={() => {}} />);
  });
});
