import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screen/home";
import { NewPlayer } from "../screen/newPlayer";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="newPlayer" component={NewPlayer} />
    </Navigator>
  );
}
