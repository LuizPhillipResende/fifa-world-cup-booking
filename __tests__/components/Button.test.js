import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "@/components/ui/Button";

describe("Button Component", () => {
  it("renders correctly with children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("handles click events", async () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    
    const button = screen.getByText("Click me");
    await userEvent.click(button);
    
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("shows loading state when loading prop is true", () => {
    render(<Button loading loadingText="Wait...">Click me</Button>);
    
    expect(screen.getByText("Wait...")).toBeInTheDocument();
    expect(screen.queryByText("Click me")).not.toBeInTheDocument();
    
    // O botão deve estar desabilitado
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("renders an icon if provided", () => {
    const TestIcon = () => <span data-testid="test-icon">Icon</span>;
    render(<Button icon={<TestIcon />}>Click me</Button>);
    
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  it("disables the button when disabled prop is true", () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
