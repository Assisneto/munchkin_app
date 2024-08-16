import React from "react";
import { Dimensions } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { OfflineContainer, OfflineText } from "./styles";

export const OfflineNotice = () => {
  const { width } = Dimensions.get("window");
  const { isConnected } = useNetInfo();

  if (isConnected) {
    return null;
  }

  return (
    <OfflineContainer style={{ width }}>
      <OfflineText>No Internet Connection</OfflineText>
    </OfflineContainer>
  );
};
