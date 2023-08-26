import { useContext } from "react";
import { Container, Title } from "./styles";

import { Switch, useColorScheme } from "react-native";
import { ThemeContext, ThemeType } from "../../theme/theme";

export const Home = () => {
  const { toggleTheme, theme } = useContext(ThemeContext)

  const isDarkMode = theme === ThemeType.dark
  // const theme = useColorScheme()
  return (
    <Container>
      <Switch value={isDarkMode} onValueChange={toggleTheme} />
      <Title>Munchkin</Title>
    </Container>
  )
}
