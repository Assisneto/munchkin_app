import { render, fireEvent } from "@testing-library/react-native";
import { ThemeProvider, ThemeContext, ThemeType, themes } from "./theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "react-native";

describe("ThemeProvider", () => {
  it("should change theme on setSpecificTheme call", () => {
    const { getByText, getByTestId } = render(
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

    fireEvent.press(textComponent);
    expect(textComponent.children[0]).toBe(lightThemeColor);
  });
});
