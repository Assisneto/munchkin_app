import React, { ReactNode } from "react";
import { render, act, fireEvent, waitFor } from "@testing-library/react-native";
import { RoomProvider, RoomContext } from ".";
import { SocketContext, RoomEvent } from "../../socket/socket";
import {
  savePlayer as mockSavePlayer,
  editPlayer as mockEditPlayer,
  deletePlayerByName as mockDeletePlayerByName,
  getPlayers as mockGetPlayers,
  savePlayers as mockSavePlayers
} from "../../storage/player";
import { Text, TouchableOpacity } from "react-native";
import * as PhoenixMocks from "phoenix";

jest.mock("../../storage/player", () => ({
  savePlayer: jest.fn(),
  editPlayer: jest.fn(),
  deletePlayerByName: jest.fn(),
  getPlayers: jest.fn(),
  savePlayers: jest.fn()
}));

const { Channel: MockedChannel } = PhoenixMocks;
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
    <SocketContext.Provider value={mockSocketContextValue}>
      <RoomProvider>{children}</RoomProvider>
    </SocketContext.Provider>
  );
};

describe("RoomContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with empty players list", () => {
    (mockGetPlayers as jest.Mock).mockResolvedValue([]);
    const { getByText } = renderWithProviders(
      <RoomContext.Consumer>
        {({ players }) => <Text>{players.length}</Text>}
      </RoomContext.Consumer>
    );
    expect(getByText("0")).toBeTruthy();
  });

  it("should fetch players on mount", async () => {
    (mockGetPlayers as jest.Mock).mockResolvedValue([
      { name: "John", gender: "male", power: 10, level: 1 }
    ]);

    const { getByText } = renderWithProviders(
      <RoomContext.Consumer>
        {({ players }) => (
          <Text>{players.length > 0 ? players[0].name : "No players"}</Text>
        )}
      </RoomContext.Consumer>
    );

    await waitFor(() => {
      expect(getByText("John")).toBeTruthy();
    });
  });

  it("should save a new player", async () => {
    (mockGetPlayers as jest.Mock).mockResolvedValue([]);
    const player = { name: "John", gender: "male", power: 10, level: 1 };

    const { getByText } = renderWithProviders(
      <RoomContext.Consumer>
        {({ savePlayer }) => (
          <TouchableOpacity onPress={() => savePlayer(player)}>
            <Text>Save Player</Text>
          </TouchableOpacity>
        )}
      </RoomContext.Consumer>
    );

    fireEvent.press(getByText("Save Player"));

    await waitFor(() => {
      expect(mockSavePlayer).toHaveBeenCalledWith(player);
      expect(mockGetPlayers).toHaveBeenCalled();
    });
  });

  it("should edit an existing player", async () => {
    (mockGetPlayers as jest.Mock).mockResolvedValue([
      { name: "John", gender: "male", power: 10, level: 1 }
    ]);
    const editedPlayer = { name: "John", gender: "male", power: 20, level: 2 };

    const { getByText } = renderWithProviders(
      <RoomContext.Consumer>
        {({ editPlayer }) => (
          <TouchableOpacity onPress={() => editPlayer(editedPlayer)}>
            <Text>Edit Player</Text>
          </TouchableOpacity>
        )}
      </RoomContext.Consumer>
    );

    fireEvent.press(getByText("Edit Player"));

    await waitFor(() => {
      expect(mockEditPlayer).toHaveBeenCalledWith(editedPlayer);
      expect(mockGetPlayers).toHaveBeenCalled();
    });
  });

  it("should delete a player by name", async () => {
    (mockGetPlayers as jest.Mock).mockResolvedValue([
      { name: "John", gender: "male", power: 10, level: 1 }
    ]);

    const { getByText } = renderWithProviders(
      <RoomContext.Consumer>
        {({ deletePlayer }) => (
          <TouchableOpacity onPress={() => deletePlayer("John")}>
            <Text>Delete Player</Text>
          </TouchableOpacity>
        )}
      </RoomContext.Consumer>
    );

    fireEvent.press(getByText("Delete Player"));

    await waitFor(() => {
      expect(mockDeletePlayerByName).toHaveBeenCalledWith("John");
      expect(mockGetPlayers).toHaveBeenCalled();
    });
  });

  it("should handle socket events", async () => {
    renderWithProviders(<Text>Test</Text>);
    await act(async () => {});
    await waitFor(() => {
      expect(mockSocketContextValue.channel.on).toHaveBeenCalledWith(
        "create_player",
        expect.any(Function)
      );
      expect(mockSocketContextValue.channel.on).toHaveBeenCalledWith(
        "edited_player",
        expect.any(Function)
      );
      expect(mockSocketContextValue.channel.on).toHaveBeenCalledWith(
        "deleted_player",
        expect.any(Function)
      );
      expect(mockSocketContextValue.channel.on).toHaveBeenCalledWith(
        "synchronize",
        expect.any(Function)
      );
    });
  });

  it("should clean up socket events on unmount", () => {
    const { unmount } = renderWithProviders(<Text>Test</Text>);
    unmount();

    expect(mockSocketContextValue.channel.off).toHaveBeenCalledWith(
      "create_player"
    );
    expect(mockSocketContextValue.channel.off).toHaveBeenCalledWith(
      "edited_player"
    );
    expect(mockSocketContextValue.channel.off).toHaveBeenCalledWith(
      "deleted_player"
    );
    expect(mockSocketContextValue.channel.off).toHaveBeenCalledWith(
      "synchronize"
    );
  });
});
