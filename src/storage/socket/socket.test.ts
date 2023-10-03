import { saveSocketType, getSocketType, SocketType } from "./socket";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "../localStorage/localStorage";

jest.mock("./localStorage/localStorage");

describe("SocketType utility functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should save the SocketType to local storage", async () => {
    await saveSocketType(SocketType.HOST);

    expect(saveToLocalStorage).toHaveBeenCalledWith(
      "socketType",
      SocketType.HOST
    );
  });

  it("should get the SocketType from local storage", async () => {
    (loadFromLocalStorage as jest.Mock).mockResolvedValue(SocketType.CLIENT);

    const result = await getSocketType();

    expect(loadFromLocalStorage).toHaveBeenCalledWith("socketType");
    expect(result).toEqual(SocketType.CLIENT);
  });

  it("should return null if SocketType is not in local storage", async () => {
    (loadFromLocalStorage as jest.Mock).mockResolvedValue(null);

    const result = await getSocketType();

    expect(loadFromLocalStorage).toHaveBeenCalledWith("socketType");
    expect(result).toBeNull();
  });
});
