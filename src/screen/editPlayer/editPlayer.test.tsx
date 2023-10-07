import React, { ReactNode } from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";
import { EditPlayer } from ".";
import { ThemeProvider } from "styled-components/native";
import { themes } from "../../theme/theme";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { getPlayers, deletePlayerByName } from "../../storage/player";

import * as playerStorage from "../../storage/player";

const mockUseFocusEffectCallback = jest.fn();

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useRoute: jest.fn(),
  useFocusEffect: jest.fn((cb) =>
    mockUseFocusEffectCallback.mockImplementation(cb)
  ),
  useNavigation: jest.fn(),
  NavigationContainer: ({ children }: { children: ReactNode }) => children
}));

jest.mock("../../storage/player", () => ({
  getPlayers: jest.fn(),
  deletePlayerByName: jest.fn()
}));

jest.mock("../../storage/player");

describe("<EditPlayer />", () => {
  const mockGoBack = jest.fn();
  const mockNavigate = jest.fn();
  const dummyPlayers = [
    { name: "John", gender: "male", level: 5, power: 2 },
    { name: "Jane", gender: "female", level: 10, power: 7 }
  ];
  (playerStorage.getPlayers as jest.Mock).mockResolvedValue(dummyPlayers);
  (playerStorage.deletePlayerByName as jest.Mock).mockResolvedValue(true);

  const routeMock = {
    params: {
      name: "John"
    }
  };

  beforeEach(() => {
    (useRoute as jest.Mock).mockReturnValue(routeMock);
    (getPlayers as jest.Mock).mockResolvedValue(dummyPlayers);
    (deletePlayerByName as jest.Mock).mockResolvedValue(true);
    require("@react-navigation/native").useNavigation.mockReturnValue({
      goBack: mockGoBack,
      navigate: mockNavigate
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    render(
      <ThemeProvider theme={themes.dark}>
        <NavigationContainer>
          <EditPlayer />
        </NavigationContainer>
      </ThemeProvider>
    );
  });

  it("fetches and sets players on focus", async () => {
    render(
      <ThemeProvider theme={themes.dark}>
        <NavigationContainer>
          <EditPlayer />
        </NavigationContainer>
      </ThemeProvider>
    );

    act(() => {
      mockUseFocusEffectCallback();
    });

    await waitFor(() => {
      expect(getPlayers).toHaveBeenCalled();
    });
  });

  it("renders and shows the selected player correct", async () => {
    const { getByTestId } = render(
      <ThemeProvider theme={themes.dark}>
        <EditPlayer />
      </ThemeProvider>
    );
    act(() => {
      mockUseFocusEffectCallback();
    });

    const playerName = await waitFor(() => getByTestId("playerSelectedName"));
    expect(playerName).toBeTruthy();
    expect(playerName.props.children).toBe(routeMock.params.name);
  });

  it("deletes a player when delete action is pressed", async () => {
    const { getByTestId, getByText } = render(
      <ThemeProvider theme={themes.dark}>
        <NavigationContainer>
          <EditPlayer />
        </NavigationContainer>
      </ThemeProvider>
    );

    await act(async () => {
      mockUseFocusEffectCallback();
      await waitFor(() => getByText("Deletar"));
    });

    await act(async () => {
      const deleteButton = getByText("Deletar");
      fireEvent.press(deleteButton);
      await waitFor(() => {
        expect(deletePlayerByName).toHaveBeenCalledWith("Jane");
      });
    });
  });

  it("navigates to editPlayer route with selected player's name when another player is selected", async () => {
    const { getByTestId, findByTestId } = render(
      <ThemeProvider theme={themes.dark}>
        <NavigationContainer>
          <EditPlayer />
        </NavigationContainer>
      </ThemeProvider>
    );

    act(() => {
      mockUseFocusEffectCallback();
    });

    const janePlayer = await findByTestId("playerContainer");

    await act(async () => {
      fireEvent.press(janePlayer);
    });

    await act(async () => {
      expect(mockNavigate).toHaveBeenCalledWith("editPlayer", { name: "Jane" });
    });
  });
});
