import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { OfflineContainer, OfflineText } from "./styles";

export const OfflineNotice = () => {
  const [isOffline, setIsOffline] = useState(false);
  const { width } = Dimensions.get("window");

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOffline(!state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (!isOffline) {
    return null;
  }

  return (
    <OfflineContainer style={{ width }}>
      <OfflineText>No Internet Connection</OfflineText>
    </OfflineContainer>
  );
};
