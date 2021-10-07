/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import CryptoList from "../components/Home/CryptoList";

const queryClient = new QueryClient();

describe("CryptoList", () => {
  it("Wait for loading data then renders a table", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CryptoList />
      </QueryClientProvider>
    );

    await waitFor(() =>
      expect(screen.queryByTestId("Loading-spinner")).not.toBeInTheDocument()
    );
    const resultsTable = screen.getByTestId("data-table");

    expect(resultsTable).toBeInTheDocument();
  });
});
