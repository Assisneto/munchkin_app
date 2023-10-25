import { render, fireEvent, act } from "@testing-library/react-native";
import React, { ReactNode } from "react";
import { Header } from ".";
import { ThemeProvider } from "styled-components/native";
import { themes } from "../../../../theme/theme";
import { editPlayers as mockEditPlayers } from "../../../../storage/player";

const renderWithTheme = (component: ReactNode) => {
  return render(<ThemeProvider theme={themes.dark}>{component}</ThemeProvider>);
};

jest.mock("../../../../storage/player", () => ({
  editPlayers: jest.fn()
}));

describe("<Header />", () => {
  let mockReloadStateFunction: jest.Mock;
  let mockResetAllPlayersNotify: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockReloadStateFunction = jest.fn();
    mockResetAllPlayersNotify = jest.fn();
  });

  it("renders correctly", () => {
    const { getByText, getByTestId } = renderWithTheme(
      <Header
        players={[]}
        reloadStateFunction={mockReloadStateFunction}
        resetAllPlayersNotify={mockResetAllPlayersNotify}
      />
    );

    expect(getByText("Munchkins")).toBeTruthy();
    expect(getByTestId("headerContainer")).toBeTruthy();
  });

  it("resets players when there are players", async () => {
    const players = [
      { name: "John", gender: "male", power: 10, level: 1 },
      { name: "Jane", gender: "female", power: 5, level: 2 }
    ];

    const { getByTestId } = renderWithTheme(
      <Header
        players={players}
        reloadStateFunction={mockReloadStateFunction}
        resetAllPlayersNotify={mockResetAllPlayersNotify}
      />
    );
    const resetButton = getByTestId("resetButton");
    await act(async () => {
      fireEvent.press(resetButton);
    });

    expect(mockEditPlayers).toHaveBeenCalledWith(players, {
      level: 1,
      power: 0
    });
    expect(mockReloadStateFunction).toHaveBeenCalledTimes(1);
    expect(mockResetAllPlayersNotify).toHaveBeenCalledTimes(1);
  });

  it("does not reset players when there are none", async () => {
    const { getByTestId } = renderWithTheme(
      <Header
        players={[]}
        reloadStateFunction={mockReloadStateFunction}
        resetAllPlayersNotify={mockResetAllPlayersNotify}
      />
    );

    const resetButton = getByTestId("resetButton");
    await act(async () => {
      fireEvent.press(resetButton);
    });

    expect(mockEditPlayers).not.toHaveBeenCalled();
    expect(mockReloadStateFunction).not.toHaveBeenCalled();
    expect(mockResetAllPlayersNotify).not.toHaveBeenCalled();
  });
});