import React, { ReactNode } from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";
import { LeaveRoomConfirmation } from ".";
import { ThemeProvider } from "styled-components/native";
import { RoomEvent, SocketContext } from "../../../../../../socket/socket";
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
  return render(<ThemeProvider theme={themes.dark}>{children}</ThemeProvider>);
};

describe("<LeaveRoomConfirmation />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly when visible", () => {
    const { getByText, getByTestId } = renderWithProviders(
      <SocketContext.Provider value={mockSocketContextValue}>
        <LeaveRoomConfirmation
          isModalVisible={true}
          hideModal={hideModalMock}
        />
      </SocketContext.Provider>
    );

    expect(getByTestId("leaveRoomModal")).toBeTruthy();
    expect(
      getByText("Tem certeza de que deseja sair desta sala?")
    ).toBeTruthy();
  });

  it("calls hideModal when 'Não' is pressed", () => {
    const { getByText } = renderWithProviders(
      <SocketContext.Provider value={mockSocketContextValue}>
        <LeaveRoomConfirmation
          isModalVisible={true}
          hideModal={hideModalMock}
        />
      </SocketContext.Provider>
    );

    const noButton = getByText("Não");
    fireEvent.press(noButton);

    expect(hideModalMock).toHaveBeenCalled();
  });

  it("calls setRoomID and saveRoomID when 'Sim' is pressed", async () => {
    const { getByText } = renderWithProviders(
      <SocketContext.Provider value={mockSocketContextValue}>
        <LeaveRoomConfirmation
          isModalVisible={true}
          hideModal={hideModalMock}
        />
      </SocketContext.Provider>
    );

    const yesButton = getByText("Sim");
    await act(async () => {
      fireEvent.press(yesButton);
    });

    expect(setRoomIDMock).toHaveBeenCalledWith(null);
    expect(saveRoomID).toHaveBeenCalledWith(null);
    expect(hideModalMock).toHaveBeenCalled();
  });

  it("does not render when isModalVisible is false", async () => {
    const { queryByTestId } = renderWithProviders(
      <SocketContext.Provider value={mockSocketContextValue}>
        <LeaveRoomConfirmation
          isModalVisible={false}
          hideModal={hideModalMock}
        />
      </SocketContext.Provider>
    );
    await waitFor(() => expect(queryByTestId("leaveRoomModal")).toBeNull());
  });
});
