import { useContext } from "react";
import { Container, Title } from "./styles";

import { FlatList, Switch, TouchableOpacity, useColorScheme } from "react-native";
import { ThemeContext, ThemeType } from "../../theme/theme";

import { Header } from "./components/header/Header";
import { Player } from "./components/player/Player";


export const Home = () => {
  const { toggleTheme, theme } = useContext(ThemeContext)
  const ICONSIZE = 26
  const isDarkMode = theme === ThemeType.dark
  // const theme = useColorScheme()
  return (<>
    <Header />
    <Container>
      <FlatList
        data={[1, 2, 3, 4, 5]}
        renderItem={() => <Player />}

      />

      {/* <Switch value={isDarkMode} onValueChange={toggleTheme} />
      <Title>Munchkin</Title> */}
    </Container>
  </>
  )
}
