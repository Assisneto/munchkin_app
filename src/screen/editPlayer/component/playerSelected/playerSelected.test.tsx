import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { PlayerSelected } from ".";
import { ThemeProvider } from "styled-components/native";
import { themes } from "../../../../theme/theme";
import { SocketContext } from "../../../../socket/socket";
import * as PhoenixMocks from "phoenix";

const { Channel: MockedChannel } = PhoenixMocks;

jest.mock("../../../../storage/player", () => ({
  editPlayer: jest.fn()
}));
jest.mock("phoenix");
jest.mock("../../../../socket/socket");

describe("<PlayerSelected />", () => {
  const initialProps = {
    name: "John",
    gender: "male",
    power: 5,
    level: 10
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with given initialPlayer props", () => {
    const { getByText } = render(
      <ThemeProvider theme={themes.dark}>
        <PlayerSelected initialPlayer={initialProps} />
      </ThemeProvider>
    );
    expect(getByText("John")).toBeTruthy();
    expect(getByText("Força")).toBeTruthy();
    expect(getByText("15")).toBeTruthy();
  });

  it("displays the correct gender icon based on player gender", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={themes.dark}>
        <PlayerSelected initialPlayer={initialProps} />
      </ThemeProvider>
    );
    expect(getByTestId("gender-male-icon")).toBeTruthy();
  });

  it("calls editPlayer and updates the socket channel on player stats change", async () => {
    const mockEditPlayer = require("../../../../storage/player").editPlayer;
    const mockPush = jest.fn();
    const mockChannel = { push: mockPush };
    const MockedChannelInstance = new MockedChannel("");

    const { getByTestId } = render(
      <SocketContext.Provider value={{ channel: MockedChannelInstance }}>
        <ThemeProvider theme={themes.dark}>
          <PlayerSelected initialPlayer={initialProps} />
        </ThemeProvider>
      </SocketContext.Provider>
    );

    const levelUpArrow = getByTestId("level-increment-button");
    fireEvent.press(levelUpArrow);

    await waitFor(() => {
      expect(mockEditPlayer).toHaveBeenCalledWith({
        ...initialProps,
        level: initialProps.level + 1
      });
      expect(MockedChannelInstance.push).toHaveBeenCalledWith("edit_player", {
        ...initialProps,
        level: initialProps.level + 1
      });
    });
  });

  it("updates player stats when initialPlayer prop changes", () => {
    const { rerender, getByText } = render(
      <ThemeProvider theme={themes.dark}>
        <PlayerSelected initialPlayer={initialProps} />
      </ThemeProvider>
    );

    const updatedProps = { ...initialProps, name: "Jane", power: 7 };
    rerender(
      <ThemeProvider theme={themes.dark}>
        <PlayerSelected initialPlayer={updatedProps} />
      </ThemeProvider>
    );

    expect(getByText("Jane")).toBeTruthy();
    expect(getByText("17")).toBeTruthy();
  });
});
