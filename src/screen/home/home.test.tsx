import React, { ReactNode } from "react";
import { render, act, fireEvent, waitFor } from "@testing-library/react-native";
import { Home } from ".";
import { ThemeProvider } from "styled-components/native";
import { ThemeContext, ThemeType, themes } from "../../theme/theme";
import { NavigationContainer } from "@react-navigation/native";
import { RoomContext } from "../../context/room";

const mockUseFocusEffectCallback = jest.fn();

jest.mock("../../storage/room");

const mockNavigation = { navigate: jest.fn(), goBack: jest.fn() };

jest.mock("../../storage/player");
jest.mock("phoenix");
jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useRoute: jest.fn(),
  useFocusEffect: jest.fn((cb) =>
    mockUseFocusEffectCallback.mockImplementation(cb)
  ),
  useNavigation: () => mockNavigation,
  NavigationContainer: ({ children }: { children: ReactNode }) => children
}));

const mockThemeContextValue = {
  theme: ThemeType.dark,
  setSpecificTheme: jest.fn()
};

const dummyPlayers = [
  { name: "John", gender: "male", level: 5, power: 2 },
  { name: "Jane", gender: "female", level: 10, power: 7 }
];

const mockRoomContextValue = {
  players: dummyPlayers,
  savePlayer: jest.fn(),
  editPlayer: jest.fn(),
  deletePlayer: jest.fn((name) => {
    mockRoomContextValue.players = mockRoomContextValue.players.filter(
      (player) => player.name !== name
    );
  })
};

const renderWithProviders = (children: ReactNode) => {
  return render(
    <ThemeProvider theme={themes.dark}>
      <ThemeContext.Provider value={mockThemeContextValue}>
        <RoomContext.Provider value={mockRoomContextValue}>
          <NavigationContainer>{children}</NavigationContainer>
        </RoomContext.Provider>
      </ThemeContext.Provider>
    </ThemeProvider>
  );
};

describe("<Home />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    act(() => {
      mockUseFocusEffectCallback();
    });

    renderWithProviders(<Home />);
  });

  it("displays fetched players", async () => {
    const { findByText } = renderWithProviders(<Home />);
    act(() => {
      mockUseFocusEffectCallback();
    });
    const johnText = await findByText("John");
    expect(johnText).toBeTruthy();
  });

  it("navigates to new player screen upon pressing the new player button", async () => {
    const { findByTestId } = renderWithProviders(<Home />);
    act(() => {
      mockUseFocusEffectCallback();
    });

    const player = await findByTestId("playerContainer-John");
    await act(async () => {
      fireEvent.press(player);
    });
    await act(async () => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith("editPlayer", {
        name: "John"
      });
    });
  });

  it("navigates to the new player screen when the 'plus' button is pressed", async () => {
    const { getByTestId } = renderWithProviders(<Home />);
    act(() => {
      mockUseFocusEffectCallback();
    });
    await act(async () => {
      const navigateButton = getByTestId("navigateNewPlayerButton");
      fireEvent.press(navigateButton);
    });
    expect(mockNavigation.navigate).toHaveBeenCalledWith("newPlayer");
  });

  it("deletes a player when the delete action is pressed in Player component", async () => {
    const { findByTestId } = renderWithProviders(<Home />);

    act(() => {
      mockUseFocusEffectCallback();
    });

    await act(async () => {
      const deleteButtonInsidePlayer = await findByTestId("deleteButton-John");
      fireEvent.press(deleteButtonInsidePlayer);
    });

    await waitFor(() => {
      expect(mockRoomContextValue.deletePlayer).toHaveBeenCalledWith("John");
    });
  });
});
