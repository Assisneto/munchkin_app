import { useCallback, useContext, useEffect, useState } from "react";
import { Circle, Container, Title } from "./styles";

import { FlatList } from "react-native";
import { ThemeContext, ThemeType } from "../../theme/theme";

import { Header } from "./components/header";
import { Player } from "../../components/player";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  deletePlayerByName,
  editPlayer,
  getPlayers,
  playerType,
  savePlayer,
} from "../../storage/player/player";
import { useSocket } from "../../hooks/useSocket";
import { Icons } from "./components/header/styles";
import { PartyModal } from "./components/partyModal";
import { SocketContext, SocketType } from "../../socket/socket";
import { executeBySocketType } from "../../utils/typeSocketHandle";

export const Home = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);
  const { socketState } = useContext(SocketContext);
  const navigation = useNavigation();
  const { channel } = useSocket("room:lobby");
  const [players, setPlayers] = useState<playerType[] | []>();
  const [isModalVisible, setModalVisible] = useState(false);

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

  const handleSavePlayer = async (player: playerType) => {
    try {
      try {
        await savePlayer(player);
      } catch {}
      await fetchPlayer();
    } catch (error) {
      console.error("Error saving player:", error);
    }
  };

  const handlerModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    executeBySocketType(socketState, SocketType.CLIENT, () => {
      if (channel) {
        channel.on("create_player", (player) => {
          handleSavePlayer(player);
        });
        channel.on("edited_player", async (editedPlayer) => {
          await editPlayer(editedPlayer);
          await fetchPlayer();
        });
      }
    });
  }, [channel]);

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
        <Circle position="right" onPress={handleNewPlayer}>
          <Icons name="plus-thick" size={26} />
        </Circle>
        <Circle position="left" onPress={handlerModal}>
          <Icons name="party-popper" size={26} />
        </Circle>
        {isModalVisible && (
          <PartyModal isModalVisible hideModal={handlerModal} />
        )}
        <Title>{socketState}</Title>
        {/* <Switch value={isDarkMode} onValueChange={toggleTheme} />
         */}
      </Container>
    </>
  );
};
