import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";
import { useTheme } from "styled-components/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export function Routes() {
  const { colors } = useTheme();
  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
