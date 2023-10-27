import { saveTheme, loadTheme } from ".";
import { saveToLocalStorage, loadFromLocalStorage } from "../localStorage";
import { ThemeType } from "../../theme/theme";

jest.mock("../localStorage");

describe("Theme utility functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should save the theme to local storage", async () => {
    await saveTheme(ThemeType.dark);

    expect(saveToLocalStorage).toHaveBeenCalledWith("theme", ThemeType.dark);
  });

  it("should get the theme from local storage", async () => {
    (loadFromLocalStorage as jest.Mock).mockResolvedValue(ThemeType.light);

    const result = await loadTheme();

    expect(loadFromLocalStorage).toHaveBeenCalledWith("theme");
    expect(result).toEqual(ThemeType.light);
  });

  it("should return null if theme is not in local storage", async () => {
    (loadFromLocalStorage as jest.Mock).mockResolvedValue(null);

    const result = await loadTheme();

    expect(loadFromLocalStorage).toHaveBeenCalledWith("theme");
    expect(result).toBeNull();
  });
});
