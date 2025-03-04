import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";  // ✅ Ensures `toBeInTheDocument()` is available
import App from "../App";
import axios from "axios";

// Mock axios to prevent real API requests during testing
jest.mock("axios");

test("renders App component correctly", async () => {
  axios.get.mockResolvedValue({ data: [] }); // Mock API response

  render(<App />);

  // Wait for elements to appear
  await waitFor(() => {
    expect(screen.getByText(/hello, welcome to the crud application!/i)).toBeInTheDocument();
  });

  // ✅ Fix: Use `getAllByText()` for multiple matches
  expect(screen.getAllByText(/crud application/i)[0]).toBeInTheDocument();
  expect(screen.getByText(/items list/i)).toBeInTheDocument();
});
