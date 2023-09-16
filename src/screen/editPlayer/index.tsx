import React, { useCallback, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Container } from "./styles";
import { Header } from "./component/header";
import {
  deletePlayerByName,
  getPlayers,
  playerType,
} from "../../storage/player/player";
import { Player } from "../../components/player";
import { FlatList } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import { PlayerSelected } from "./component/playerSelected";

type RouteParams = {
  name: string;
};

const filterPlayersByName = (players: playerType[], name: string) =>
  players.reduce(
    (acc, player) => {
      if (player.name !== name) {
        acc.filteredPlayers.push(player);
      } else {
        acc.remainingPlayers.push(player);
      }
      return acc;
    },
    {
      filteredPlayers: [] as playerType[],
      remainingPlayers: [] as playerType[],
    }
  );

export const EditPlayer = () => {
  const [players, setPlayers] = useState<playerType[] | []>();
  const [player, setPlayer] = useState<playerType>({
    name: "",
    gender: "",
    level: 0,
    power: 0,
  });

  const route = useRoute();
  const { name } = route.params as RouteParams;

  const showPlayers = async () => {
    const players = await getPlayers();
    const { filteredPlayers, remainingPlayers } = filterPlayersByName(
      players,
      name
    );
    setPlayer(remainingPlayers[0]);
    setPlayers(filteredPlayers);
  };

  const deletePlayer = async (name: string) => {
    await deletePlayerByName(name);
    const players = await getPlayers();
    return setPlayers(players);
  };

  useFocusEffect(
    useCallback(() => {
      showPlayers();
    }, [])
  );

  return (
    <>
      <Header />
      <Container>
        <PlayerSelected player={player} />
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
          inverted
          ListEmptyComponent={<></>}
        />
      </Container>
    </>
  );
};
