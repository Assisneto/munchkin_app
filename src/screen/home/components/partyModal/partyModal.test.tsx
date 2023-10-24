import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import { PartyModal } from ".";
import { SocketProvider, SocketContext } from "../../../../socket/socket";
import { SocketType } from "../../../../storage/socket";
import { ThemeProvider } from "styled-components/native";
import { themes } from "../../../../theme/theme";

describe.skip("<PartyModal />", () => {
  let hideModalMock: jest.Mock;
  beforeEach(() => {
    hideModalMock = jest.fn();
  });
  it("renders correctly when modal is visible", () => {
    const { getByText } = render(
      <ThemeProvider theme={themes.dark}>
        <PartyModal isModalVisible={true} hideModal={hideModalMock} />
      </ThemeProvider>,
      {
        wrapper: SocketProvider
      }
    );
    expect(getByText("Select Role")).toBeTruthy();
    expect(getByText("Host")).toBeTruthy();
    expect(getByText("Guest")).toBeTruthy();
  });
  it("does not render when modal is not visible", () => {
    const { queryByText } = render(
      <ThemeProvider theme={themes.dark}>
        <PartyModal isModalVisible={false} hideModal={hideModalMock} />
      </ThemeProvider>,
      {
        wrapper: SocketProvider
      }
    );
    expect(queryByText("Select Role")).toBeNull();
  });
  it("sets the socket state based on the button pressed and closes the modal", async () => {
    const setSocketStateMock = jest.fn();
    const { getByText, findByText } = render(
      <ThemeProvider theme={themes.dark}>
        <SocketContext.Provider
          value={{
            socketState: SocketType.CLIENT,
            setSocketState: setSocketStateMock
          }}
        >
          <PartyModal isModalVisible={true} hideModal={hideModalMock} />
        </SocketContext.Provider>
      </ThemeProvider>
    );
    fireEvent.press(getByText("Host"));
    await act(async () => {
      await findByText("Host");
    });
    expect(setSocketStateMock).toHaveBeenCalledWith(SocketType.HOST);
    expect(hideModalMock).toHaveBeenCalled();
    setSocketStateMock.mockClear();
    hideModalMock.mockClear();
    fireEvent.press(getByText("Guest"));
    await act(async () => {
      await findByText("Guest");
    });
    expect(setSocketStateMock).toHaveBeenCalledWith(SocketType.CLIENT);
    expect(hideModalMock).toHaveBeenCalled();
  });
});
