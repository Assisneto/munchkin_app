import React from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";
import { ThemeProvider, ThemeContext, ThemeType, themes } from "./theme";
import { TouchableOpacity, Text } from "react-native";

const saveThemeSpy = jest.spyOn(require("../storage/theme"), "saveTheme");
const loadThemeSpy = jest.spyOn(require("../storage/theme"), "loadTheme");

describe("ThemeProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should change theme on setSpecificTheme call and save it to local storage", async () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ theme, setSpecificTheme }) => (
            <TouchableOpacity onPress={() => setSpecificTheme(ThemeType.light)}>
              <Text testID="themeText">{themes[theme].colors.background}</Text>
            </TouchableOpacity>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    const initialThemeColor = themes[ThemeType.default].colors.background;
    const lightThemeColor = themes[ThemeType.light].colors.background;
    const textComponent = getByTestId("themeText");

    expect(textComponent.children[0]).toBe(initialThemeColor);

    await act(async () => {
      fireEvent.press(textComponent);
    });

    expect(textComponent.children[0]).toBe(lightThemeColor);
    expect(saveThemeSpy).toHaveBeenCalledWith(ThemeType.light);
  });

  it("should load theme from local storage and then change on setSpecificTheme call", async () => {
    loadThemeSpy.mockResolvedValueOnce(ThemeType.dark);

    const { getByTestId } = render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ theme, setSpecificTheme }) => (
            <TouchableOpacity onPress={() => setSpecificTheme(ThemeType.light)}>
              <Text testID="themeText">{themes[theme].colors.background}</Text>
            </TouchableOpacity>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(loadThemeSpy).toHaveBeenCalled();
    });

    const darkThemeColor = themes[ThemeType.dark].colors.background;
    let textComponent = getByTestId("themeText");

    expect(textComponent.children[0]).toBe(darkThemeColor);

    const lightThemeColor = themes[ThemeType.light].colors.background;

    await act(async () => {
      fireEvent.press(textComponent);
    });

    textComponent = getByTestId("themeText");
    expect(textComponent.children[0]).toBe(lightThemeColor);
    expect(saveThemeSpy).toHaveBeenCalledWith(ThemeType.light);
  });
});
