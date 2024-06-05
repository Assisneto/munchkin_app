import { render, fireEvent, act } from "@testing-library/react-native";
import React, { ReactNode } from "react";
import { Header } from ".";
import { ThemeProvider } from "styled-components/native";
import { ThemeContext, ThemeType, themes } from "../../../../theme/theme";
import { editPlayers as mockEditPlayers } from "../../../../storage/player";

const mockThemeContextValue = {
  theme: ThemeType.dark,
  setSpecificTheme: jest.fn()
};

const renderWithTheme = (component: ReactNode) => {
  return render(
    <ThemeContext.Provider value={mockThemeContextValue}>
      <ThemeProvider theme={themes.dark}>{component}</ThemeProvider>
    </ThemeContext.Provider>
  );
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

  it("rolls the dice and shows the dice modal when dice icon is pressed", async () => {
    const { getByTestId } = renderWithTheme(
      <Header
        players={[]}
        reloadStateFunction={mockReloadStateFunction}
        resetAllPlayersNotify={mockResetAllPlayersNotify}
      />
    );

    const diceIcon = getByTestId("diceIcon");
    await act(async () => {
      fireEvent.press(diceIcon);
    });

    const diceModal = getByTestId("diceModal");
    expect(diceModal).toBeTruthy();
  });

  it("closes the dice modal when onClose is called", async () => {
    const { getByTestId, queryByTestId, debug } = renderWithTheme(
      <Header
        players={[]}
        reloadStateFunction={mockReloadStateFunction}
        resetAllPlayersNotify={mockResetAllPlayersNotify}
      />
    );
    const diceIcon = getByTestId("diceIcon");
    await act(async () => {
      fireEvent.press(diceIcon);
    });

    const modalCloseButton = getByTestId("backgroundTouchable");

    await act(async () => {
      fireEvent.press(modalCloseButton);
    });

    const diceModal = queryByTestId("diceModal");
    expect(diceModal).toBeNull();
  });
  it("switches theme when the theme icon is pressed", async () => {
    const { getByTestId } = renderWithTheme(
      <Header
        players={[]}
        reloadStateFunction={mockReloadStateFunction}
        resetAllPlayersNotify={mockResetAllPlayersNotify}
      />
    );

    const themeSwitchIcon = getByTestId("theme-switch-icon");

    await act(async () => {
      fireEvent.press(themeSwitchIcon);
    });

    expect(mockThemeContextValue.setSpecificTheme).toHaveBeenCalled();
  });
});
