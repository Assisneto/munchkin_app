import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Container } from "./styles";
import { Header } from "./component/header";
import { playerType } from "../../storage/player";
import { Player } from "../../components/player";
import { FlatList } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import { PlayerSelected } from "./component/playerSelected";
import { RoomContext } from "../../context/room";
import { SocketContext } from "../../socket/socket";

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
      remainingPlayers: [] as playerType[]
    }
  );

export const EditPlayer = () => {
  const { players: playerSaved, deletePlayer } = useContext(RoomContext);
  const navigation = useNavigation();
  const { channel } = useContext(SocketContext);
  const [players, setPlayers] = useState<playerType[] | []>();
  const [player, setPlayer] = useState<playerType>({
    name: "",
    gender: "",
    level: 1,
    power: 0
  });

  const route = useRoute();
  const { name } = route.params as RouteParams;

  const showPlayers = async () => {
    const { filteredPlayers, remainingPlayers } = filterPlayersByName(
      playerSaved,
      name
    );

    if (remainingPlayers.length === 0) {
      navigation.navigate("home");
    }

    setPlayer(remainingPlayers[0]);
    setPlayers(filteredPlayers);
  };

  const onDeletePlayer = async (name: string) => {
    deletePlayer(name);
    channel?.push("delete_player", { name });
  };

  useFocusEffect(
    useCallback(() => {
      showPlayers();
    }, [name])
  );
  useEffect(() => {
    showPlayers();
  }, [playerSaved]);
  return (
    <>
      <Header />
      <Container>
        <PlayerSelected initialPlayer={player} />
        <FlatList
          data={players}
          renderItem={({ item }) => {
            return (
              <Player
                gender={item.gender}
                level={item.level}
                name={item.name}
                power={item.power}
                deletePlayer={onDeletePlayer}
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
