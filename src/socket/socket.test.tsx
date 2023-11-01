import React from "react";
import { render, act, fireEvent, waitFor } from "@testing-library/react-native";
import { SocketProvider, SocketContext } from "./socket";
import { TouchableOpacity, Text } from "react-native";
import * as roomStorage from "../storage/room";

jest.mock("../storage/room");

const mockedGetRoomID = roomStorage.getRoomID as jest.MockedFunction<
  typeof roomStorage.getRoomID
>;

beforeEach(() => {
  mockedGetRoomID.mockImplementation(() => Promise.resolve(null));
});

describe("SocketProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render with default roomID and be able to toggle", async () => {
    mockedGetRoomID.mockResolvedValueOnce("room1");

    const { getByText, getByTestId } = render(
      <SocketProvider>
        <SocketContext.Consumer>
          {({ roomID, setRoomID }) => (
            <TouchableOpacity onPress={() => setRoomID("room2")}>
              <Text testID="roomText">{roomID}</Text>
            </TouchableOpacity>
          )}
        </SocketContext.Consumer>
      </SocketProvider>
    );
    await act(async () => {});
    await act(async () => {
      fireEvent.press(getByTestId("roomText"));
    });

    await waitFor(() => {
      expect(getByText("room2")).toBeTruthy();
    });
  });

  it("should use default roomID if getRoomID does not return value", async () => {
    const { getByText } = render(
      <SocketProvider>
        <SocketContext.Consumer>
          {({ roomID }) => <Text testID="roomText">{roomID}</Text>}
        </SocketContext.Consumer>
      </SocketProvider>
    );

    expect(getByText("")).toBeTruthy();
  });
});
