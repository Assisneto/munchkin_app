import { useCallback, useContext, useEffect, useState } from "react";
import { Circle, Container, SwitchWrapper } from "./styles";
import { throttle } from "lodash";

import {
  AppState,
  AppStateStatus,
  Button,
  FlatList,
  Platform
} from "react-native";
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
import { Switch } from "react-native-gesture-handler";

export const Home = () => {
  const { setSpecificTheme, theme } = useContext(ThemeContext);
  const { socketState } = useContext(SocketContext);
  const navigation = useNavigation();
  const { channel } = useSocket("room:lobby");
  const [players, setPlayers] = useState<playerType[] | []>();
  const [isModalVisible, setModalVisible] = useState(false);

  const nextThemeMap = {
    [ThemeType.dark]: ThemeType.light,
    [ThemeType.light]: ThemeType.default,
    [ThemeType.default]: ThemeType.dark
  };

  const handleNewPlayer = () => {
    navigation.navigate("newPlayer");
  };

  const fetchPlayer = async () => {
    const players = await getPlayers();
    return setPlayers(players);
  };

  const onCreatePlayer = async (player: playerType) => {
    await handleSavePlayer(player);
  };
  const onCreatePlayers = async ({ players }: { players: playerType[] }) => {
    await handleSavePlayers(players);
  };

  const onEditedPlayer = async (editedPlayer: playerType) => {
    await editPlayer(editedPlayer);
    await fetchPlayer();
  };

  const resetAllPlayersNotify = async (): Promise<void> => {
    await channel?.push("reset_all_players", {});
  };

  const deletePlayerLocal = async (name: string) => {
    await deletePlayerByName(name);
    fetchPlayer();
  };

  const deletePlayerAndNotify = async (name: string) => {
    await deletePlayerLocal(name);
    channel?.push("delete_player", { name });
  };

  const onDeletedPlayer = async ({
    name: deletedPlayerName
  }: {
    name: string;
  }) => {
    await deletePlayerLocal(deletedPlayerName);
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

  const handlerAppState = useCallback(
    throttle(async (state: AppStateStatus) => {
      if (state === "active") {
        await channel?.push("request_sync", {});
      }
    }, 1000),
    [channel]
  );

  useEffect(() => {
    const subscription = AppState.addEventListener("change", handlerAppState);
    return () => {
      subscription.remove();
    };
  }, [handlerAppState]);

  useEffect(() => {
    channel?.on("create_player", onCreatePlayer);
    channel?.on("edited_player", onEditedPlayer);
    channel?.on("deleted_player", onDeletedPlayer);
    channel?.on("synchronize", onCreatePlayers);

    return () => {
      channel?.off("create_player");
      channel?.off("edited_player");
      channel?.off("deleted_player");
      channel?.off("synchronize");
    };
  }, [channel]);

  useFocusEffect(
    useCallback(() => {
      fetchPlayer();
    }, [])
  );

  useEffect(() => {
    (async () => await channel?.push("request_sync", {}))();
  }, [channel]);

  return (
    <>
      <Header
        players={players}
        reloadStateFunction={fetchPlayer}
        resetAllPlayersNotify={resetAllPlayersNotify}
      />
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
                deletePlayer={deletePlayerAndNotify}
              />
            );
          }}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={<></>}
        />
        <Circle
          position="right"
          onPress={handleNewPlayer}
          testID="navigateNewPlayerButton"
        >
          <Icons name="plus-thick" size={26} />
        </Circle>
        <Circle
          position="left"
          onPress={handlerModal}
          testID="toggleModalButton"
        >
          <Icons name="party-popper" size={26} />
        </Circle>
        {isModalVisible && (
          <PartyModal isModalVisible hideModal={handlerModal} />
        )}
        <SwitchWrapper>
          <Icons
            name="theme-light-dark"
            size={34}
            onPress={() => setSpecificTheme(nextThemeMap[theme])}
            testID="theme-switch-icon"
          />
        </SwitchWrapper>
      </Container>
    </>
  );
};
