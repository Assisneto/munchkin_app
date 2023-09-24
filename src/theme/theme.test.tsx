import { render, fireEvent } from "@testing-library/react-native";
import { ThemeProvider, ThemeContext, ThemeType, themes } from "./theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "react-native";

describe("ThemeProvider", () => {
  it("should toggle theme on toggleTheme call", () => {
    const { getByText, getByTestId } = render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ theme, toggleTheme }) => (
            <TouchableOpacity onPress={toggleTheme}>
              <Text testID="themeText">{themes[theme].colors.background}</Text>
            </TouchableOpacity>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    const button = getByText(themes[ThemeType.dark].colors.background);
    const textComponent = getByTestId("themeText");

    fireEvent.press(button);
    expect(textComponent.children[0]).toBe(
      themes[ThemeType.light].colors.background
    );

    fireEvent.press(button);
    expect(textComponent.children[0]).toBe(
      themes[ThemeType.dark].colors.background
    );
  });
});
