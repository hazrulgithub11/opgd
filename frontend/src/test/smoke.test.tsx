import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { describe, it, expect } from "vitest";
import HomePage from "@/pages/HomePage";

const qc = new QueryClient();

describe("HomePage", () => {
  it("renders blank landing page", () => {
    render(
      <QueryClientProvider client={qc}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </QueryClientProvider>,
    );
    expect(screen.getByRole("main")).toBeDefined();
  });
});
