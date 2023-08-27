import { useContext } from "react";
import { Container, Header, Options, Title } from "./styles";
import { AntDesign } from '@expo/vector-icons';

import { Switch, useColorScheme } from "react-native";
import { ThemeContext, ThemeType } from "../../theme/theme";

export const Home = () => {
  const { toggleTheme, theme } = useContext(ThemeContext)

  const isDarkMode = theme === ThemeType.dark
  // const theme = useColorScheme()
  return (<>
    <Header>
      <Title>Munchkins</Title>
      <Title></Title>
      <Options>
        <AntDesign name="retweet" size={24} color="black" />
        <AntDesign name="retweet" size={24} color="black" />
        <AntDesign name="retweet" size={24} color="black" />
        <AntDesign name="retweet" size={24} color="black" />
      </Options>
    </Header>
    <Container>
      <Switch value={isDarkMode} onValueChange={toggleTheme} />
      <Title>Munchkin</Title>
    </Container>
  </>
  )
}
