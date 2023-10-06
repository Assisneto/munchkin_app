import React from "react";
import { render, act, fireEvent } from "@testing-library/react-native";
import { SocketProvider, SocketContext } from "./socket";
import { TouchableOpacity, Text } from "react-native";
import * as socketStorage from "../storage/socket";

jest.mock("../storage/socket");

const mockedGetSocketType = socketStorage.getSocketType as jest.MockedFunction<
  typeof socketStorage.getSocketType
>;
const mockedSaveSocketType =
  socketStorage.saveSocketType as jest.MockedFunction<
    typeof socketStorage.saveSocketType
  >;

beforeEach(() => {
  mockedGetSocketType.mockImplementation(() =>
    Promise.resolve(socketStorage.SocketType.CLIENT)
  );
  mockedSaveSocketType.mockImplementation(() => Promise.resolve());
});

describe("SocketProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render with default socketState and be able to toggle", async () => {
    mockedGetSocketType.mockResolvedValueOnce(socketStorage.SocketType.CLIENT);

    const { getByText, getByTestId } = render(
      <SocketProvider>
        <SocketContext.Consumer>
          {({ socketState, setSocketState }) => (
            <TouchableOpacity
              onPress={() => setSocketState(socketStorage.SocketType.HOST)}
            >
              <Text testID="socketText">{socketState}</Text>
            </TouchableOpacity>
          )}
        </SocketContext.Consumer>
      </SocketProvider>
    );

    expect(getByText(socketStorage.SocketType.CLIENT)).toBeTruthy();

    const button = getByTestId("socketText");
    await act(async () => {
      fireEvent.press(button);
    });

    expect(getByText(socketStorage.SocketType.HOST)).toBeTruthy();
    expect(mockedSaveSocketType).toHaveBeenCalledWith(
      socketStorage.SocketType.HOST
    );
  });

  it("should use default socketState if getSocketType does not return value", async () => {
    mockedGetSocketType.mockResolvedValueOnce(null);

    const { getByText } = render(
      <SocketProvider>
        <SocketContext.Consumer>
          {({ socketState }) => <Text testID="socketText">{socketState}</Text>}
        </SocketContext.Consumer>
      </SocketProvider>
    );

    expect(getByText(socketStorage.SocketType.CLIENT)).toBeTruthy();
  });
});
