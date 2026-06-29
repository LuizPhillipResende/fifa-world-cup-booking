import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "@/components/ui/Card";

describe("Card Component", () => {
  it("renders children correctly", () => {
    render(
      <Card>
        <div>Test Content</div>
      </Card>
    );
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("applies hover classes when hover prop is true", () => {
    const { container } = render(<Card hover>Hover Card</Card>);
    expect(container.firstChild).toHaveClass("hover:border-white/10");
  });

  it("renders with different paddings", () => {
    const { container: smContainer } = render(<Card padding="sm">SM</Card>);
    expect(smContainer.firstChild).toHaveClass("p-4");

    const { container: mdContainer } = render(<Card padding="md">MD</Card>);
    expect(mdContainer.firstChild).toHaveClass("p-5");
  });
});
