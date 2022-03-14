import { render } from "@testing-library/react";

import { Alert } from ".";

describe("Alert component", () => {
  it("renders correctly", () => {
    render(<Alert message="test" openAlert={true} setOpenAlert={() => {}} />);
  });
});
