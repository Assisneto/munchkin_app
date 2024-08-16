import React from "react";
import { render } from "@testing-library/react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { OfflineNotice } from ".";

jest.mock("@react-native-community/netinfo", () => ({
  useNetInfo: jest.fn()
}));

describe("<OfflineNotice />", () => {
  const mockUseNetInfo = useNetInfo as jest.Mock;

  it("does not render when online", () => {
    mockUseNetInfo.mockReturnValue({ isConnected: true });

    const { queryByText } = render(<OfflineNotice />);

    expect(queryByText("No Internet Connection")).toBeNull();
  });

  it("renders when offline", () => {
    mockUseNetInfo.mockReturnValue({ isConnected: false });

    const { getByText } = render(<OfflineNotice />);

    expect(getByText("No Internet Connection")).toBeTruthy();
  });

  it("renders with correct width", () => {
    mockUseNetInfo.mockReturnValue({ isConnected: false });

    const { getByTestId } = render(<OfflineNotice />);

    const offlineContainer = getByTestId("offline-container");
    expect(offlineContainer.props.style[1].width).toBeDefined();
  });
});
