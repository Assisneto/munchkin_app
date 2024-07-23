import React, { ReactNode } from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { NewPlayer } from "./index";
import { ThemeProvider } from "styled-components/native";
import { themes } from "../../theme/theme";
import { RoomContext } from "../../context/room";
import { RoomEvent, SocketContext } from "../../socket/socket";
import * as PhoenixMocks from "phoenix";

const { Channel: MockedChannel, Socket: MockedSocket } = PhoenixMocks;

jest.mock("../../storage/player");

const mockNavigation = {
  goBack: jest.fn()
};

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => mockNavigation
}));

const dummyPlayers = [
  { name: "John", gender: "male", level: 5, power: 2 },
  { name: "Jane", gender: "female", level: 10, power: 7 }
];

const mockRoomContextValue = {
  players: dummyPlayers,
  savePlayer: jest.fn().mockResolvedValue(true),
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

describe("<NewPlayer />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(mockSocketContextValue.channel, "push");
  });

  it("renders correctly", () => {
    renderWithProviders(<NewPlayer />);
  });

  it("calls savePlayer and backToHome on successful player creation", async () => {
    const { getByTestId } = renderWithProviders(<NewPlayer />);

    const nameInput = getByTestId("nameInput");
    fireEvent.changeText(nameInput, "John");

    const saveButton = getByTestId("save-button");
    fireEvent.press(saveButton);

    expect(mockRoomContextValue.savePlayer).toHaveBeenCalledWith({
      gender: "male",
      name: "John",
      level: 1,
      power: 0
    });
    await waitFor(() => {
      expect(mockNavigation.goBack).toHaveBeenCalled();
    });
  });

  it("sets the error message on error", async () => {
    mockRoomContextValue.savePlayer.mockRejectedValueOnce(
      new Error("Test error")
    );

    const { getByTestId, getByText } = renderWithProviders(<NewPlayer />);

    const saveButton = getByTestId("save-button");
    fireEvent.press(saveButton);

    await waitFor(() => {
      expect(getByText("Test error")).toBeTruthy();
    });
  });

  it("sets the name state when text is entered", async () => {
    const { getByTestId } = renderWithProviders(<NewPlayer />);

    const nameInput = getByTestId("nameInput");
    fireEvent.changeText(nameInput, "John");

    await waitFor(() => {
      expect(getByTestId("nameInput").props.value).toBe("John");
    });
  });

  it("clears the error message when a name is entered", () => {
    const { getByPlaceholderText, queryByText } = renderWithProviders(
      <NewPlayer />
    );

    const nameInput = getByPlaceholderText("Nome");
    fireEvent.changeText(nameInput, "John");

    expect(queryByText("Ocorreu um erro ao salvar o novo jogador.")).toBeNull();
  });

  it("sets gender to female when female icon button is pressed", () => {
    const { getByTestId } = renderWithProviders(<NewPlayer />);

    const femaleIcon = getByTestId("gender-female-icon");
    fireEvent.press(femaleIcon);

    expect(getByTestId("radio-female").props.accessibilityState.checked).toBe(
      true
    );
    expect(getByTestId("radio-male").props.accessibilityState.checked).toBe(
      false
    );
  });

  it("calls savePlayer when saving a new player", async () => {
    const { getByTestId } = renderWithProviders(<NewPlayer />);

    const saveButton = getByTestId("save-button");
    fireEvent.press(saveButton);

    await waitFor(() => {
      expect(mockRoomContextValue.savePlayer).toHaveBeenCalled();
    });
  });

  it("sets gender to male when male radio button is pressed", () => {
    const { getByTestId } = renderWithProviders(<NewPlayer />);

    const maleRadio = getByTestId("radio-male");
    fireEvent.press(maleRadio);

    expect(getByTestId("radio-male").props.accessibilityState.checked).toBe(
      true
    );
    expect(getByTestId("radio-female").props.accessibilityState.checked).toBe(
      false
    );
  });

  it("sets gender to female when female radio button is pressed", () => {
    const { getByTestId } = renderWithProviders(<NewPlayer />);

    const femaleRadio = getByTestId("radio-female");
    fireEvent.press(femaleRadio);

    expect(getByTestId("radio-female").props.accessibilityState.checked).toBe(
      true
    );
    expect(getByTestId("radio-male").props.accessibilityState.checked).toBe(
      false
    );
  });

  it("changes gender to female, then back to male and saves", async () => {
    const { getByTestId } = renderWithProviders(<NewPlayer />);

    const femaleRadio = getByTestId("radio-female");
    fireEvent.press(femaleRadio);
    expect(getByTestId("radio-female").props.accessibilityState.checked).toBe(
      true
    );

    const maleRadio = getByTestId("radio-male");
    fireEvent.press(maleRadio);
    expect(getByTestId("radio-male").props.accessibilityState.checked).toBe(
      true
    );

    const saveButton = getByTestId("save-button");
    fireEvent.press(saveButton);

    await waitFor(() => {
      expect(mockRoomContextValue.savePlayer).toHaveBeenCalled();
    });
  });
});
