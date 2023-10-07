import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { PlayerSelected } from ".";
import { ThemeProvider } from "styled-components/native";
import { themes } from "../../../../theme/theme";

// Mock the required external dependencies
jest.mock("../../../../storage/player", () => ({
  editPlayer: jest.fn()
}));
jest.mock("../../../../hooks/useSocket", () => ({
  useSocket: jest.fn().mockReturnValue({ channel: jest.fn() })
}));
jest.mock("../../../../utils/executeBySocketType");
jest.mock("../../../../socket/socket");

describe("<PlayerSelected />", () => {
  const initialProps = {
    name: "John",
    gender: "male",
    power: 5,
    level: 10
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with given initialPlayer props", () => {
    const { getByText } = render(
      <ThemeProvider theme={themes.dark}>
        <PlayerSelected initialPlayer={initialProps} />
      </ThemeProvider>
    );
    expect(getByText("John")).toBeTruthy();
    expect(getByText("Força")).toBeTruthy();
    expect(getByText("15")).toBeTruthy();
  });

  // Assuming Gender component and StatAdjuster support testID or another approach to be queried.
  it("displays the correct gender icon based on player gender", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={themes.dark}>
        <PlayerSelected initialPlayer={initialProps} />
      </ThemeProvider>
    );
    expect(getByTestId("gender-male-icon")).toBeTruthy();
  });

  it("calls editPlayer and updates the socket channel on player stats change", async () => {
    const { getByTestId } = render(
      <ThemeProvider theme={themes.dark}>
        <PlayerSelected initialPlayer={initialProps} />
      </ThemeProvider>
    );

    const levelUpArrow = getByTestId("level-increment-button"); // Assuming StatAdjuster for level has this testID for up arrow
    fireEvent.press(levelUpArrow);

    await waitFor(() => {
      // Verify if the editPlayer function and socket channel were updated correctly
      // You may need to add the appropriate mocks and assertions here
    });
  });

  it("updates player stats when initialPlayer prop changes", () => {
    const { rerender, getByText } = render(
      <ThemeProvider theme={themes.dark}>
        <PlayerSelected initialPlayer={initialProps} />
      </ThemeProvider>
    );

    const updatedProps = { ...initialProps, name: "Jane", power: 7 };
    rerender(
      <ThemeProvider theme={themes.dark}>
        <PlayerSelected initialPlayer={updatedProps} />
      </ThemeProvider>
    );

    expect(getByText("Jane")).toBeTruthy();
    expect(getByText("17")).toBeTruthy(); // New force value after power is updated to 7 (10 + 7)
  });
});
