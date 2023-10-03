import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveToLocalStorage, loadFromLocalStorage } from "./localStorage";

describe("AsyncStorage utility functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should save data to AsyncStorage", async () => {
    const testKey = "testKey";
    const testData = { foo: "bar" };

    await saveToLocalStorage(testKey, testData);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      testKey,
      JSON.stringify(testData)
    );
  });

  it("should load data from AsyncStorage", async () => {
    const testKey = "testKey";
    const testData = { foo: "bar" };

    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify(testData)
    );

    const result = await loadFromLocalStorage(testKey);

    expect(result).toEqual(testData);
  });

  it("should return null if no data is found in AsyncStorage", async () => {
    const testKey = "nonexistentKey";

    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    const result = await loadFromLocalStorage(testKey);

    expect(result).toBeNull();
  });
});
