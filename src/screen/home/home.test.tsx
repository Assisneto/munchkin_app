import React, { ReactNode } from "react";
import { render, act, fireEvent } from "@testing-library/react-native";
import { Home } from ".";
import { ThemeProvider } from "styled-components/native";
import { themes } from "../../theme/theme";
import * as playerStorage from "../../storage/player";
import { NavigationContainer } from "@react-navigation/native";
import { SocketContext } from "../../socket/socket";
import * as PhoenixMocks from "phoenix";
import { SocketType } from "../../storage/socket";

const { Socket: MockedSocket } = PhoenixMocks;
const mockUseFocusEffectCallback = jest.fn();
const mockSocketInstance = new MockedSocket("");
const mockChannelInstance = mockSocketInstance.channel("");

jest.mock("../../storage/player");

jest.mock("phoenix");
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn()
};

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useRoute: jest.fn(),
  useFocusEffect: jest.fn((cb) =>
    mockUseFocusEffectCallback.mockImplementation(cb)
  ),
  useNavigation: () => mockNavigation,
  NavigationContainer: ({ children }: { children: ReactNode }) => children
}));

jest.mock("../../hooks/useSocket", () => ({
  useSocket: () => ({ channel: mockChannelInstance })
}));
const mockSocketContextValue = {
  socketState: SocketType.HOST,
  setSocketState: jest.fn()
};
const renderWithProviders = (children: ReactNode) => {
  return render(
    <ThemeProvider theme={themes.dark}>
      <SocketContext.Provider value={mockSocketContextValue}>
        <NavigationContainer>{children}</NavigationContainer>
      </SocketContext.Provider>
    </ThemeProvider>
  );
};

describe("<Home />", () => {
  const dummyPlayers = [
    { name: "John", gender: "male", level: 5, power: 2 },
    { name: "Jane", gender: "female", level: 10, power: 7 }
  ];

  beforeEach(() => {
    (playerStorage.getPlayers as jest.Mock).mockResolvedValue(dummyPlayers);
  });

  it("renders correctly", () => {
    act(() => {
      mockUseFocusEffectCallback();
    });

    renderWithProviders(<Home />);
  });

  it("displays fetched players", async () => {
    const { findByText } = renderWithProviders(<Home />);
    act(() => {
      mockUseFocusEffectCallback();
    });
    const johnText = await findByText("John");
    expect(johnText).toBeTruthy();
  });

  it("navigates to new player screen upon pressing the new player button", async () => {
    const { findByTestId } = renderWithProviders(<Home />);
    act(() => {
      mockUseFocusEffectCallback();
    });

    const player = await findByTestId("playerContainer-John");
    await act(async () => {
      fireEvent.press(player);
    });
    await act(async () => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith("editPlayer", {
        name: "John"
      });
    });
  });

  // it("toggles the visibility of the modal", () => {
  //   const { getByTestId, queryByTestId } = renderWithProviders(<Home />);

  //   // Assuming the button related to "handlerModal" has a testID of "toggleModalButton"
  //   // and the modal has a testID of "partyModal"
  //   expect(queryByTestId("partyModal")).toBeNull();
  //   fireEvent.press(getByTestId("toggleModalButton"));
  //   expect(getByTestId("partyModal")).toBeTruthy();
  // });
});
