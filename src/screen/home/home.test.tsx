import React, { ReactNode } from "react";
import { render, act, fireEvent, waitFor } from "@testing-library/react-native";
import { Home } from ".";
import { ThemeProvider } from "styled-components/native";
import { themes } from "../../theme/theme";
import { NavigationContainer } from "@react-navigation/native";
import { SocketContext } from "../../socket/socket";
import { SocketType } from "../../storage/socket";
import { deletePlayerByName, getPlayers } from "../../storage/player";
import { AppState } from "react-native";

const { Socket: MockedSocket } = require("phoenix");

const mockUseFocusEffectCallback = jest.fn();
const mockSocketInstance = new MockedSocket("");
const mockChannelInstance = mockSocketInstance.channel("");
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
jest.mock("../../hooks/useSocket", () => ({
  useSocket: () => ({ channel: mockChannelInstance })
}));

const mockSocketContextValue = {
  socketState: SocketType.HOST,
  setSocketState: jest.fn()
};

const renderWithProviders = (children: ReactNode) => {
  return render(
    <ThemeProvider theme={themes.dark}>
      <SocketContext.Provider value={mockSocketContextValue}>
        <NavigationContainer>{children}</NavigationContainer>
      </SocketContext.Provider>
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

  it("toggles the visibility of the modal", async () => {
    const { getByTestId, queryByTestId, findByTestId } = renderWithProviders(
      <Home />
    );

    expect(queryByTestId("partyModal")).toBeNull();

    fireEvent.press(getByTestId("toggleModalButton"));

    const partyModal = await findByTestId("partyModal");
    expect(partyModal).toBeTruthy();
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
  it("sends a request_sync event for SocketType.CLIENT", () => {
    const mockPush = jest.fn();
    mockChannelInstance.push = mockPush;
    mockSocketContextValue.socketState = SocketType.CLIENT;

    renderWithProviders(<Home />);

    expect(mockPush).toHaveBeenCalledWith("request_sync", {});
  });
});
