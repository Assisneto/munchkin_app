import { renderHook } from "@testing-library/react-native";
import { useSocket } from "./useSocket";
import { Socket } from "phoenix";

jest.mock("phoenix");

describe("useSocket hook", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize a socket and channel", () => {
    const channelName = "room:123";
    const endPoint = "ws://6e07-189-70-64-212.ngrok-free.app/socket";

    renderHook(() => useSocket(channelName));

    expect(Socket).toHaveBeenCalledWith(endPoint, expect.anything());
    expect(new Socket(endPoint).channel).toHaveBeenCalledWith(channelName, {});
  });

  it("should console log on various socket events", () => {
    console.log = jest.fn();
    const endPoint = "ws://6e07-189-70-64-212.ngrok-free.app/socket";

    renderHook(() => useSocket("room:123"));

    new Socket(endPoint).onOpen(() => {});
  });
});
