import React, { ReactNode } from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { PlayerSelected } from ".";
import { ThemeProvider } from "styled-components/native";
import { themes } from "../../../../theme/theme";
import { RoomEvent, SocketContext } from "../../../../socket/socket";
import { RoomContext } from "../../../../context/room";
import * as PhoenixMocks from "phoenix";

const { Channel: MockedChannel } = PhoenixMocks;

jest.mock("../../../../storage/player", () => ({
  editPlayer: jest.fn()
}));
jest.mock("phoenix");
jest.mock("../../../../socket/socket");

const dummyPlayers = [
  { name: "John", gender: "male", power: 5, level: 10 },
  { name: "Jane", gender: "female", power: 7, level: 10 }
];

const mockRoomContextValue = {
  players: dummyPlayers,
  savePlayer: jest.fn(),
  editPlayer: jest.fn(),
  deletePlayer: jest.fn()
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
          {children}
        </RoomContext.Provider>
      </SocketContext.Provider>
    </ThemeProvider>
  );
};

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
    const { getByText } = renderWithProviders(
      <PlayerSelected initialPlayer={initialProps} />
    );
    expect(getByText("John")).toBeTruthy();
    expect(getByText("Força")).toBeTruthy();
    expect(getByText("15")).toBeTruthy();
  });

  it("displays the correct gender icon based on player gender", () => {
    const { getByTestId } = renderWithProviders(
      <PlayerSelected initialPlayer={initialProps} />
    );
    expect(getByTestId("gender-male-icon")).toBeTruthy();
  });

  it("calls editPlayer and updates the socket channel on player stats change", async () => {
    const mockEditPlayer = require("../../../../storage/player").editPlayer;
    const { getByTestId } = renderWithProviders(
      <PlayerSelected initialPlayer={initialProps} />
    );

    const levelUpArrow = getByTestId("level-increment-button");
    fireEvent.press(levelUpArrow);

    await waitFor(() => {
      expect(mockRoomContextValue.editPlayer).toHaveBeenCalledWith({
        ...initialProps,
        level: initialProps.level + 1
      });
      expect(mockSocketContextValue.channel.push).toHaveBeenCalledWith(
        "edit_player",
        {
          ...initialProps,
          level: initialProps.level + 1
        }
      );
    });
  });

  it("updates player stats when initialPlayer prop changes", () => {
    const { rerender, getByText } = renderWithProviders(
      <PlayerSelected initialPlayer={initialProps} />
    );

    const updatedProps = { ...initialProps, name: "Jane", power: 7 };
    rerender(
      <ThemeProvider theme={themes.dark}>
        <PlayerSelected initialPlayer={updatedProps} />
      </ThemeProvider>
    );

    expect(getByText("Jane")).toBeTruthy();
    expect(getByText("17")).toBeTruthy();
  });
});
