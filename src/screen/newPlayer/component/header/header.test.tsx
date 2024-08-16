import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Header } from ".";
import { ThemeProvider } from "styled-components/native";
import { themes } from "./../../../../theme/theme";

const mockNavigation = {
  goBack: jest.fn()
};

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => mockNavigation
}));

jest.mock("@react-native-community/netinfo", () => ({
  useNetInfo: () => ({
    isConnected: true
  })
}));

describe("<Header />", () => {
  const mockProps = {
    savePlayer: jest.fn(),
    showError: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the title correctly", () => {
    const { getByText } = render(
      <ThemeProvider theme={themes.dark}>
        <Header {...mockProps} />
      </ThemeProvider>
    );

    expect(getByText("Novo Munchkin")).toBeTruthy();
  });

  it("navigates back when the back button is pressed", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={themes.dark}>
        <Header {...mockProps} />
      </ThemeProvider>
    );

    const backButton = getByTestId("back-icon");
    fireEvent.press(backButton);

    expect(mockNavigation.goBack).toHaveBeenCalled();
  });

  it("calls savePlayer when the save button is pressed", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={themes.dark}>
        <Header {...mockProps} />
      </ThemeProvider>
    );

    const saveButton = getByTestId("save-button");
    fireEvent.press(saveButton);

    expect(mockProps.savePlayer).toHaveBeenCalled();
  });
});
