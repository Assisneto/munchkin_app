import { useCallback, useContext, useState } from "react";
import { Circle, CircleTitle, Container } from "./styles";

import { FlatList } from "react-native";
import { ThemeContext, ThemeType } from "../../theme/theme";

import { Header } from "./components/header";
import { Player } from "../../components/player";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  deletePlayerByName,
  getPlayers,
  playerType,
} from "../../storage/player/player";

export const Home = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);
  const navigation = useNavigation();
  const [players, setPlayers] = useState<playerType[] | []>();
  const handleNewPlayer = () => {
    navigation.navigate("newPlayer");
  };
  const fetchPlayer = async () => {
    const players = await getPlayers();
    return setPlayers(players);
  };

  const deletePlayer = async (name: string) => {
    await deletePlayerByName(name);
    const players = await getPlayers();
    return setPlayers(players);
  };

  useFocusEffect(
    useCallback(() => {
      fetchPlayer();
    }, [])
  );

  return (
    <>
      <Header />
      <Container>
        <FlatList
          data={players}
          renderItem={({ item }) => {
            return (
              <Player
                gender={item.gender}
                level={item.level}
                name={item.name}
                power={item.power}
                deletePlayer={deletePlayer}
              />
            );
          }}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={<></>}
        />
        <Circle onPress={handleNewPlayer}>
          <CircleTitle>+</CircleTitle>
        </Circle>
        {/* <Switch value={isDarkMode} onValueChange={toggleTheme} />
      <Title>Munchkin</Title> */}
      </Container>
    </>
  );
};
