import React, { ReactNode } from "react";
import { render, act, fireEvent, waitFor } from "@testing-library/react-native";
import { Home } from ".";
import { ThemeProvider } from "styled-components/native";
import { ThemeContext, ThemeType, themes } from "../../theme/theme";
import { NavigationContainer } from "@react-navigation/native";
import { SocketContext } from "../../socket/socket";
import { deletePlayerByName, getPlayers } from "../../storage/player";
import { AppState } from "react-native";
import * as PhoenixMocks from "phoenix";
import * as roomStorage from "../../storage/room";
const { Socket: MockedSocket, Channel: MockedChannel } = PhoenixMocks;

const mockUseFocusEffectCallback = jest.fn();

jest.mock("../../storage/room");

const mockedGetRoomID = roomStorage.getRoomID as jest.MockedFunction<
  typeof roomStorage.getRoomID
>;

const mockedDeletePlayerByName = deletePlayerByName as jest.Mock;
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

const renderWithProviders = (children: ReactNode) => {
  return render(
    <ThemeProvider theme={themes.dark}>
      <ThemeContext.Provider value={mockThemeContextValue}>
        <NavigationContainer>{children}</NavigationContainer>
      </ThemeContext.Provider>
    </ThemeProvider>
  );
};

describe("<Home />", () => {
  const dummyPlayers = [
    { name: "John", gender: "male", level: 5, power: 2 },
    { name: "Jane", gender: "female", level: 10, power: 7 }
  ];

  beforeEach(() => {
    (getPlayers as jest.Mock).mockResolvedValue(dummyPlayers);
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
    const { findByTestId, queryByText, debug } = renderWithProviders(<Home />);

    act(() => {
      mockUseFocusEffectCallback();
    });

    await act(async () => {
      const deleteButtonInsidePlayer = await findByTestId("deleteButton-John");
      fireEvent.press(deleteButtonInsidePlayer);
    });

    await waitFor(() => {
      expect(mockedDeletePlayerByName).toHaveBeenCalledWith("John");
    });
  });

  it("emits request_sync event when app state changes to active", async () => {
    const MockedChannelInstance = new MockedChannel("");
    mockedGetRoomID.mockResolvedValueOnce("room1");

    const socketContextValue = {
      socket: MockedSocket,
      channel: MockedChannelInstance,
      setRoomID: jest.fn(),
      roomID: "sampleRoomID"
    };

    const { root } = render(
      <ThemeProvider theme={themes.dark}>
        <ThemeContext.Provider value={mockThemeContextValue}>
          <NavigationContainer>
            <SocketContext.Provider value={socketContextValue}>
              <Home />
            </SocketContext.Provider>
          </NavigationContainer>
        </ThemeContext.Provider>
      </ThemeProvider>
    );

    const appStateChange = AppState.addEventListener.mock.calls[0][1];

    await act(() => {
      appStateChange("active");
    });

    expect(MockedChannelInstance.push).toHaveBeenCalledWith("request_sync", {});
  });
});
