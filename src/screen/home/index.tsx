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
  savePlayers
} from "../../storage/player";
import { useSocket } from "../../hooks/useSocket";
import { Icons } from "./components/header/styles";
import { PartyModal } from "./components/partyModal";
import { SocketContext } from "../../socket/socket";
import { executeBySocketType } from "../../utils/executeBySocketType";
import { SocketType } from "../../storage/socket";

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
    executeBySocketType(socketState, SocketType.HOST, async () => {
      await channel?.push("delete_player", { name });
    });
    return fetchPlayer();
  };

  const onCreatePlayer = async (player: playerType) => {
    await handleSavePlayer(player);
  };
  const onCreatePlayers = async ({ players }: { players: playerType[] }) => {
    await handleSavePlayers(players);
  };

  const onSyncPlayers = async () => {
    const players = await getPlayers();
    await channel?.push("syncing", { players });
  };

  const onEditedPlayer = async (editedPlayer: playerType) => {
    await editPlayer(editedPlayer);
    await fetchPlayer();
  };

  const onDeletedPlayer = async ({
    name: deletedPlayerName
  }: {
    name: string;
  }) => {
    await deletePlayer(deletedPlayerName);
  };

  const handleSavePlayer = async (player: playerType) => {
    try {
      await savePlayer(player);
      await fetchPlayer();
    } catch (error) {
      console.error("Error saving player:", error);
    }
  };

  const handleSavePlayers = async (players: playerType[]) => {
    try {
      await savePlayers(players);
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
      channel?.on("create_player", onCreatePlayer);
      channel?.on("edited_player", onEditedPlayer);
      channel?.on("deleted_player", onDeletedPlayer);
      channel?.on("synchronize", onCreatePlayers);
    });
    executeBySocketType(socketState, SocketType.HOST, () => {
      channel?.on("sync", onSyncPlayers);
    });

    return () => {
      channel?.off("create_player");
      channel?.off("edited_player");
      channel?.off("deleted_player");
      channel?.off("synchronize");
    };
  }, [channel, socketState]);

  useFocusEffect(
    useCallback(() => {
      fetchPlayer();
    }, [])
  );

  useEffect(() => {
    executeBySocketType(socketState, SocketType.CLIENT, async () => {
      await channel?.push("request_sync", {});
    });
  }, [channel, socketState]);

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
