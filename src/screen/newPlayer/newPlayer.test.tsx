import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import { NewPlayer } from "./index";
import { ThemeProvider } from "styled-components/native";
import { themes } from "../../theme/theme";
import {
  savePlayer as originalSavePlayer,
  playerType
} from "../../storage/player";

import * as PhoenixMocks from "phoenix";

const { Socket: MockedSocket } = PhoenixMocks;

const mockNavigation = {
  goBack: jest.fn()
};

jest.mock("../../storage/socket");

jest.mock("phoenix");

const mockSocketInstance = new MockedSocket("");
const mockChannelInstance = mockSocketInstance.channel("");

const savePlayer = originalSavePlayer as unknown as jest.MockedFunction<
  (player: playerType) => Promise<boolean>
>;
const mockedSavePlayer = savePlayer;

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => mockNavigation
}));

jest.mock("../../storage/player");

describe("<NewPlayer />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(mockChannelInstance, "push");
  });

  it("renders correctly", () => {
    render(
      <ThemeProvider theme={themes.dark}>
        <NewPlayer />
      </ThemeProvider>
    );
  });

  it("calls savePlayer and backToHome on successful player creation", async () => {
    mockedSavePlayer.mockResolvedValue(true);

    const { getByTestId } = render(
      <ThemeProvider theme={themes.dark}>
        <NewPlayer />
      </ThemeProvider>
    );

    const nameInput = getByTestId("nameInput");
    fireEvent.changeText(nameInput, "John");

    const saveButton = getByTestId("save-button");
    fireEvent.press(saveButton);

    expect(savePlayer).toHaveBeenCalledWith({
      gender: "male",
      name: "John",
      level: 1,
      power: 0
    });
    await waitFor(() => {
      expect(mockNavigation.goBack).toHaveBeenCalled();
    });
  });

  it("sets the error message on error", async () => {
    mockedSavePlayer.mockRejectedValueOnce(new Error("Test error"));

    const { getByTestId, getByText } = render(
      <ThemeProvider theme={themes.dark}>
        <NewPlayer />
      </ThemeProvider>
    );

    const saveButton = getByTestId("save-button");
    fireEvent.press(saveButton);

    await waitFor(() => {
      expect(getByText("Test error")).toBeTruthy();
    });
  });

  it("sets the name state when text is entered", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={themes.dark}>
        <NewPlayer />
      </ThemeProvider>
    );

    const nameInput = getByTestId("nameInput");
    fireEvent.changeText(nameInput, "John");
  });

  it("clears the error message when a name is entered", () => {
    const { getByPlaceholderText, queryByText } = render(
      <ThemeProvider theme={themes.dark}>
        <NewPlayer />
      </ThemeProvider>
    );

    const nameInput = getByPlaceholderText("Nome");
    fireEvent.changeText(nameInput, "John");

    expect(queryByText("Ocorreu um erro ao salvar o novo jogador.")).toBeNull();
  });

  it("sets gender to female when female icon button is pressed", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={themes.dark}>
        <NewPlayer />
      </ThemeProvider>
    );

    const femaleIcon = getByTestId("gender-female-icon");
    fireEvent.press(femaleIcon);

    expect(getByTestId("gender-female-icon")).toBeTruthy();
  });

  it("calls savePlayer when saving a new player", async () => {
    mockedSavePlayer.mockResolvedValue(true);

    const { getByTestId } = render(
      <ThemeProvider theme={themes.dark}>
        <NewPlayer />
      </ThemeProvider>
    );

    const saveButton = getByTestId("save-button");
    fireEvent.press(saveButton);

    expect(mockedSavePlayer).toHaveBeenCalled();
  });

  it("sets gender to male when male radio button is pressed", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={themes.dark}>
        <NewPlayer />
      </ThemeProvider>
    );

    const maleRadio = getByTestId("radio-male");
    fireEvent.press(maleRadio);

    expect(getByTestId("radio-male").props.accessibilityState.checked).toBe(
      true
    );

    expect(getByTestId("radio-female").props.accessibilityState.checked).toBe(
      false
    );
  });

  it("sets gender to female when female radio button is pressed", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={themes.dark}>
        <NewPlayer />
      </ThemeProvider>
    );

    const femaleRadio = getByTestId("radio-female");
    fireEvent.press(femaleRadio);

    expect(getByTestId("radio-female").props.accessibilityState.checked).toBe(
      true
    );
    expect(getByTestId("radio-male").props.accessibilityState.checked).toBe(
      false
    );
  });
  it("changes gender to female, then back to male and saves", async () => {
    mockedSavePlayer.mockResolvedValue(true);

    const { getByTestId } = render(
      <ThemeProvider theme={themes.dark}>
        <NewPlayer />
      </ThemeProvider>
    );

    const femaleRadio = getByTestId("radio-female");
    fireEvent.press(femaleRadio);
    expect(getByTestId("radio-female").props.accessibilityState.checked).toBe(
      true
    );

    const maleRadio = getByTestId("radio-male");
    fireEvent.press(maleRadio);
    expect(getByTestId("radio-male").props.accessibilityState.checked).toBe(
      true
    );

    const saveButton = getByTestId("save-button");
    fireEvent.press(saveButton);

    expect(mockedSavePlayer).toHaveBeenCalled();
  });
});
