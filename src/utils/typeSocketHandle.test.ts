import { executeBySocketType } from "./executeBySocketType";
import { SocketType } from "../storage/socket/socket";

jest.mock("@react-native-async-storage/async-storage");

describe("executeBySocketType function tests", () => {
  const mockFn = jest.fn();

  beforeEach(() => {
    mockFn.mockClear();
  });

  test("Should execute the function when socketType matches targetSocketType", () => {
    executeBySocketType(SocketType.HOST, SocketType.HOST, mockFn);

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test("Should NOT execute the function when socketType doesn't match targetSocketType", () => {
    executeBySocketType(SocketType.HOST, SocketType.CLIENT, mockFn);

    expect(mockFn).not.toHaveBeenCalled();
  });
});
