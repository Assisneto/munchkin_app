import React, { ReactNode } from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";
import { EditPlayer } from ".";
import { ThemeProvider } from "styled-components/native";
import { themes } from "../../theme/theme";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { RoomContext } from "../../context/room";
import { RoomEvent, SocketContext } from "../../socket/socket";
import * as PhoenixMocks from "phoenix";

const { Channel: MockedChannel } = PhoenixMocks;

jest.mock("../../storage/player", () => ({
  getPlayers: jest.fn(),
  deletePlayerByName: jest.fn()
}));

jest.mock("@react-native-community/netinfo", () => ({
  useNetInfo: () => ({
    isConnected: true
  })
}));

jest.mock("phoenix");
jest.mock("../../socket/socket");

const mockUseFocusEffectCallback = jest.fn();
const mockGoBack = jest.fn();
const mockNavigate = jest.fn();

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useRoute: jest.fn(),
  useFocusEffect: jest.fn((cb) =>
    mockUseFocusEffectCallback.mockImplementation(cb)
  ),
  useNavigation: () => ({
    goBack: mockGoBack,
    navigate: mockNavigate
  }),
  NavigationContainer: ({ children }: { children: ReactNode }) => children
}));

const dummyPlayers = [
  { name: "John", gender: "male", level: 5, power: 2 },
  { name: "Jane", gender: "female", level: 10, power: 7 }
];

const mockRoomContextValue = {
  players: dummyPlayers,
  savePlayer: jest.fn(),
  editPlayer: jest.fn(),
  deletePlayer: jest.fn((name: string) => {
    mockRoomContextValue.players = mockRoomContextValue.players.filter(
      (player) => player.name !== name
    );
  })
};
const mockSocketContextValue = {
  socket: new PhoenixMocks.Socket(""),
  channel: new MockedChannel(""),
  setRoomID: jest.fn(),
  roomID: "null",
  setRoomEvent: jest.fn(),
  roomEvent: RoomEvent.Connect
};

const renderWithProviders = (children: ReactNode) => {
  return render(
    <ThemeProvider theme={themes.dark}>
      <SocketContext.Provider value={mockSocketContextValue}>
        <RoomContext.Provider value={mockRoomContextValue}>
          <NavigationContainer>{children}</NavigationContainer>
        </RoomContext.Provider>
      </SocketContext.Provider>
    </ThemeProvider>
  );
};

describe("<EditPlayer />", () => {
  const routeMock = {
    params: {
      name: "John"
    }
  };

  beforeEach(() => {
    (useRoute as jest.Mock).mockReturnValue(routeMock);
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    renderWithProviders(<EditPlayer />);
  });

  it("fetches and sets players on focus", async () => {
    renderWithProviders(<EditPlayer />);

    act(() => {
      mockUseFocusEffectCallback();
    });

    await waitFor(() => {
      expect(mockRoomContextValue.players.length).toBe(dummyPlayers.length);
    });
  });

  it("renders and shows the selected player correctly", async () => {
    const { getByTestId } = renderWithProviders(<EditPlayer />);

    act(() => {
      mockUseFocusEffectCallback();
    });

    const playerName = await waitFor(() => getByTestId("playerSelectedName"));
    expect(playerName).toBeTruthy();
    expect(playerName.props.children).toBe(routeMock.params.name);
  });

  it("navigates to editPlayer route with selected player's name when another player is selected", async () => {
    const { findByTestId } = renderWithProviders(<EditPlayer />);

    act(() => {
      mockUseFocusEffectCallback();
    });

    const janePlayer = await findByTestId("playerContainer-Jane");

    await act(async () => {
      fireEvent.press(janePlayer);
    });

    await act(async () => {
      expect(mockNavigate).toHaveBeenCalledWith("editPlayer", { name: "Jane" });
    });
  });

  it("delete the selected player when delete action is pressed", async () => {
    const { getByText, getByTestId } = renderWithProviders(<EditPlayer />);

    await act(async () => {
      const deleteButton = getByText("Deletar");
      fireEvent.press(deleteButton);
      await waitFor(() => {
        expect(mockRoomContextValue.deletePlayer).toHaveBeenCalledWith("Jane");
      });
    });
  });
});
