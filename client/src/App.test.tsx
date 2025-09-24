import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders requirement capture portal", () => {
  render(<App />);
  const heading = screen.getByText(/Requirement Capture Portal/i);
  expect(heading).toBeInTheDocument();
});
