import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Header } from "."; // Adjust path if necessary
import { ThemeProvider } from "styled-components/native";
import { themes } from "../../../../theme/theme"; // Adjust path to your theme

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn()
}));

describe("<Header />", () => {
  const mockGoBack = jest.fn();
  beforeEach(() => {
    require("@react-navigation/native").useNavigation.mockReturnValue({
      goBack: mockGoBack
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={themes.dark}>
        <Header />
      </ThemeProvider>
    );

    expect(getByTestId("header-container")).toBeTruthy();
  });

  it("navigates back when back icon is pressed", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={themes.dark}>
        <Header />
      </ThemeProvider>
    );

    fireEvent.press(getByTestId("back-icon"));
    expect(mockGoBack).toHaveBeenCalled();
  });
});
