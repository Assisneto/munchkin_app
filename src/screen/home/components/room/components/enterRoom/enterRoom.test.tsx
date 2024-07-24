import React, { ReactNode } from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import { EnterRoom } from ".";
import { ThemeProvider } from "styled-components/native";
import { SocketContext, RoomEvent } from "../../../../../../socket/socket";
import { saveRoomID } from "../../../../../../storage/room";
import { themes } from "../../../../../../theme/theme";
import * as PhoenixMocks from "phoenix";

jest.mock("../../../../../../storage/room", () => ({
  saveRoomID: jest.fn()
}));

const { Channel: MockedChannel } = PhoenixMocks;
const hideModalMock = jest.fn();
const setRoomIDMock = jest.fn();
const setRoomEventMock = jest.fn();

const mockSocketContextValue = {
  socket: new PhoenixMocks.Socket(""),
  channel: new MockedChannel(""),
  roomID: "null",
  setRoomID: setRoomIDMock,
  setRoomEvent: setRoomEventMock,
  roomEvent: RoomEvent.Connect
};

const renderWithProviders = (children: ReactNode) => {
  return render(
    <SocketContext.Provider value={mockSocketContextValue}>
      <ThemeProvider theme={themes.dark}>{children}</ThemeProvider>{" "}
    </SocketContext.Provider>
  );
};

describe("<EnterRoom />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByText, getByPlaceholderText } = renderWithProviders(
      <EnterRoom hideModal={hideModalMock} />
    );

    expect(getByText("Insira o código da Sala")).toBeTruthy();
    expect(getByPlaceholderText("Código da Sala")).toBeTruthy();
  });

  it("handles room code change", () => {
    const { getByPlaceholderText } = renderWithProviders(
      <EnterRoom hideModal={hideModalMock} />
    );

    const input = getByPlaceholderText("Código da Sala");

    act(() => {
      fireEvent.changeText(input, "12345");
    });

    expect(input.props.value).toBe("12345");
  });

  it("submits room code when length is 5", async () => {
    const { getByPlaceholderText } = renderWithProviders(
      <EnterRoom hideModal={hideModalMock} />
    );

    const input = getByPlaceholderText("Código da Sala");

    await act(async () => {
      fireEvent.changeText(input, "12345");
    });

    expect(setRoomEventMock).toHaveBeenCalledWith(RoomEvent.Enter);
    expect(setRoomIDMock).toHaveBeenCalledWith("12345");
    expect(saveRoomID).toHaveBeenCalledWith("12345");
    expect(hideModalMock).toHaveBeenCalled();
  });

  it("does not submit room code when length is less than 5", () => {
    const { getByPlaceholderText } = renderWithProviders(
      <EnterRoom hideModal={hideModalMock} />
    );

    const input = getByPlaceholderText("Código da Sala");

    act(() => {
      fireEvent.changeText(input, "1234");
    });

    expect(setRoomEventMock).not.toHaveBeenCalled();
    expect(setRoomIDMock).not.toHaveBeenCalled();
    expect(saveRoomID).not.toHaveBeenCalled();
    expect(hideModalMock).not.toHaveBeenCalled();
  });
});
