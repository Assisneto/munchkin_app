import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Player } from "./index";
import { ThemeProvider } from "styled-components/native";
import { themes } from "./../../theme/theme";

const mockNavigation = {
  navigate: jest.fn()
};

jest.mock("@react-navigation/native", () => {
  return {
    useNavigation: () => mockNavigation
  };
});

describe("<Player />", () => {
  const mockDeletePlayer = jest.fn();
  const props = {
    name: "John",
    gender: "male",
    power: 5,
    level: 10,
    deletePlayer: mockDeletePlayer
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByText } = render(
      <ThemeProvider theme={themes.dark}>
        <Player {...props} />
      </ThemeProvider>
    );
    expect(getByText("John")).toBeTruthy();
    expect(getByText("10")).toBeTruthy();
    expect(getByText("5")).toBeTruthy();
  });

  it("calls deletePlayer when the delete button is pressed", () => {
    const { getByText } = render(
      <ThemeProvider theme={themes.dark}>
        <Player {...props} />
      </ThemeProvider>
    );
    const deleteButton = getByText("Deletar");
    fireEvent.press(deleteButton);
    expect(mockDeletePlayer).toHaveBeenCalledWith("John");
  });

  it("navigates to 'editPlayer' when Player component is pressed", () => {
    const { getByText } = render(
      <ThemeProvider theme={themes.dark}>
        <Player {...props} />
      </ThemeProvider>
    );
    const playerComponent = getByText("John");
    fireEvent.press(playerComponent);
    expect(mockNavigation.navigate).toHaveBeenCalledWith("editPlayer", {
      name: "John"
    });
  });

  it("displays the combined level and power correctly", () => {
    const { getByText } = render(
      <ThemeProvider theme={themes.dark}>
        <Player {...props} />
      </ThemeProvider>
    );
    expect(getByText("15")).toBeTruthy();
  });

  it("displays the correct gender", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={themes.dark}>
        <Player {...props} />
      </ThemeProvider>
    );
    expect(getByTestId("gender-male-icon")).toBeTruthy();
  });

  it("displays the correct gender for female", () => {
    const femaleProps = {
      ...props,
      gender: "female"
    };
    const { getByTestId } = render(
      <ThemeProvider theme={themes.dark}>
        <Player {...femaleProps} />
      </ThemeProvider>
    );
    expect(getByTestId("gender-female-icon")).toBeTruthy();
  });

  it("displays the power level and level icons correctly", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={themes.dark}>
        <Player {...props} />
      </ThemeProvider>
    );
    const powerIcon = getByTestId("power-icon");
    const levelIcon = getByTestId("level-icon");
    expect(powerIcon).toBeTruthy();
    expect(levelIcon).toBeTruthy();
  });
});
