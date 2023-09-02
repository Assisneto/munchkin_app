import { useContext } from "react";
import { Circle, CircleTitle, Container } from "./styles";

import { FlatList, Switch, TouchableOpacity, useColorScheme } from "react-native";
import { ThemeContext, ThemeType } from "../../theme/theme";

import { Header } from "./components/header";
import { Player } from "./components/player";

const player = {
  name: "assisneto",
  gender: "male",
  power: 1,
  level: 1
}

const player2 = {
  name: "maria",
  gender: "female",
  power: 10,
  level: 8
}

export const Home = () => {
  const { toggleTheme, theme } = useContext(ThemeContext)
  return (<>
    <Header />
    <Container>
      <FlatList
        data={[player, player2, player, player2, player]}
        renderItem={({ item }) => <Player gender={item.gender} level={item.level} name={item.name} power={item.power} />}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      <Circle >
        <CircleTitle>+</CircleTitle>
      </Circle>
      {/* <Switch value={isDarkMode} onValueChange={toggleTheme} />
      <Title>Munchkin</Title> */}
    </Container>
  </>
  )
}
