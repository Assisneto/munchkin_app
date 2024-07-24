import React, { ReactNode } from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import { RoomModal } from ".";
import { ThemeProvider } from "styled-components/native";
import { themes } from "../../../../theme/theme";

const renderWithProviders = (children: ReactNode) => {
  return render(<ThemeProvider theme={themes.dark}>{children}</ThemeProvider>);
};

describe("<RoomModal />", () => {
  const hideModalMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly when visible", () => {
    const { getByTestId } = renderWithProviders(
      <RoomModal isModalVisible={true} hideModal={hideModalMock} />
    );

    expect(getByTestId("roomModal")).toBeTruthy();
  });

  it("hides when clicking outside", () => {
    const { getByTestId } = renderWithProviders(
      <RoomModal isModalVisible={true} hideModal={hideModalMock} />
    );

    fireEvent.press(getByTestId("modalBackground"));

    expect(hideModalMock).toHaveBeenCalled();
  });

  it("renders EnterRoom view when currentView is ENTER_ROOM", () => {
    const { getByText } = renderWithProviders(
      <RoomModal isModalVisible={true} hideModal={hideModalMock} />
    );

    act(() => {
      fireEvent.press(getByText("Entrar em uma sala"));
    });

    expect(getByText("Insira o código da Sala")).toBeTruthy();
  });

  it("renders CreateRoom view when currentView is CREATE_ROOM", async () => {
    const { getByText } = renderWithProviders(
      <RoomModal isModalVisible={true} hideModal={hideModalMock} />
    );

    await act(async () => {
      fireEvent.press(getByText("Criar uma sala"));
    });

    expect(getByText("A Sala foi Criada")).toBeTruthy();
  });

  it("renders ShowRoom view by default", () => {
    const { getByText } = renderWithProviders(
      <RoomModal isModalVisible={true} hideModal={hideModalMock} />
    );

    expect(getByText("Criar uma sala")).toBeTruthy();
    expect(getByText("Entrar em uma sala")).toBeTruthy();
  });
});
