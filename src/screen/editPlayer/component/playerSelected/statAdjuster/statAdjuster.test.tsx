import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { StatAdjuster, PointKey } from ".";
import { ThemeProvider } from "styled-components/native";
import { themes } from "../../../../../theme/theme";

describe("<StatAdjuster />", () => {
  const mockAdjustFunction = jest.fn();

  const defaultProps = {
    title: "Nível",
    value: 10,
    adjustValue: mockAdjustFunction,
    keyName: "level" as PointKey
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with given props", () => {
    const { getByText } = render(
      <ThemeProvider theme={themes.dark}>
        <StatAdjuster {...defaultProps} />
      </ThemeProvider>
    );

    expect(getByText("Nível")).toBeTruthy();
    expect(getByText("10")).toBeTruthy();
  });

  it("calls adjustValue with correct parameters on increment", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={themes.dark}>
        <StatAdjuster {...defaultProps} />
      </ThemeProvider>
    );

    const incrementButton = getByTestId("level-increment-button");
    fireEvent.press(incrementButton);

    expect(mockAdjustFunction).toHaveBeenCalledWith("level", 1);
  });

  it("calls adjustValue with correct parameters on decrement", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={themes.dark}>
        <StatAdjuster {...defaultProps} />
      </ThemeProvider>
    );

    const decrementButton = getByTestId("level-decrement-button");
    fireEvent.press(decrementButton);

    expect(mockAdjustFunction).toHaveBeenCalledWith("level", -1);
  });
});
