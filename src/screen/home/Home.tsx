import { useContext } from "react";
import { Container, Title } from "./styles";

import { Switch, TouchableOpacity, useColorScheme } from "react-native";
import { ThemeContext, ThemeType } from "../../theme/theme";

import { Header } from "./components/header/Header";


export const Home = () => {
  const { toggleTheme, theme } = useContext(ThemeContext)
  const ICONSIZE = 26
  const isDarkMode = theme === ThemeType.dark
  // const theme = useColorScheme()
  return (<>
    <Header />
    <Container>
      <Switch value={isDarkMode} onValueChange={toggleTheme} />
      <Title>Munchkin</Title>
    </Container>
  </>
  )
}
