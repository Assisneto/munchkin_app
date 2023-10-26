import React, { ReactNode } from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Dice } from ".";
import { ThemeProvider } from "styled-components/native";
import { themes } from "../../theme/theme";

const renderWithTheme = (component: ReactNode) => {
  return render(<ThemeProvider theme={themes.dark}>{component}</ThemeProvider>);
};

describe("<Dice />", () => {
  let mockOnClose: jest.Mock;
  let mockOnRoll: jest.Mock;

  beforeEach(() => {
    mockOnClose = jest.fn();
    mockOnRoll = jest.fn();
  });

  it("renders correctly", () => {
    const { getByTestId } = renderWithTheme(
      <Dice
        visible={true}
        diceNumber={3}
        onClose={mockOnClose}
        onRoll={mockOnRoll}
      />
    );

    expect(getByTestId("diceModal")).toBeTruthy();
  });

  it("triggers onClose when the background is pressed", () => {
    const { getByTestId } = renderWithTheme(
      <Dice
        visible={true}
        diceNumber={3}
        onClose={mockOnClose}
        onRoll={mockOnRoll}
      />
    );

    const background = getByTestId("backgroundTouchable"); // Consider adding `testID="backgroundTouchable"` to the outer TouchableOpacity for this to work
    fireEvent.press(background);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("triggers onRoll when the dice icon is pressed", () => {
    const { getByTestId } = renderWithTheme(
      <Dice
        visible={true}
        diceNumber={3}
        onClose={mockOnClose}
        onRoll={mockOnRoll}
      />
    );

    const diceIconTouchable = getByTestId("diceIconTouchable"); // Consider adding `testID="diceIconTouchable"` to the TouchableOpacity wrapping the dice icon
    fireEvent.press(diceIconTouchable);
    expect(mockOnRoll).toHaveBeenCalledTimes(1);
  });
});
