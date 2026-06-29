import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputField from "@/components/ui/InputField";

describe("InputField Component", () => {
  it("renders label and placeholder correctly", () => {
    render(<InputField label="Email" placeholder="Enter email" name="email" />);
    
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
  });

  it("allows user to type", async () => {
    const onChange = jest.fn();
    render(<InputField label="Name" name="name" onChange={onChange} />);
    
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "John Doe");
    
    expect(input).toHaveValue("John Doe");
    expect(onChange).toHaveBeenCalled();
  });

  it("renders a left icon if provided", () => {
    const TestIcon = () => <span data-testid="left-icon">Icon</span>;
    render(<InputField label="Email" name="email" icon={<TestIcon />} />);
    
    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
  });

  it("renders a right element if provided", () => {
    const RightBtn = () => <button data-testid="right-btn">Btn</button>;
    render(<InputField label="Password" name="password" rightElement={<RightBtn />} />);
    
    expect(screen.getByTestId("right-btn")).toBeInTheDocument();
  });

  it("shows an error message", () => {
    render(<InputField label="Name" name="name" error="Invalid name" />);
    
    expect(screen.getByText("Invalid name")).toBeInTheDocument();
  });
});
