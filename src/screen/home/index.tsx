import { useCallback, useContext, useEffect, useState } from "react";
import {
  Circle,
  Container,
  RoomID,
  RoomIDContainer,
  Icons,
  RoomIDWrapper
} from "./styles";
import { throttle } from "lodash";

import { AppState, AppStateStatus, FlatList, Platform } from "react-native";

import { Header } from "./components/header";
import { Player } from "../../components/player";
import { RoomModal } from "./components/room";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  deletePlayerByName,
  editPlayer,
  getPlayers,
  playerType,
  savePlayer,
  savePlayers
} from "../../storage/player";

import { SocketContext } from "../../socket/socket";
import { ModalRoomIcons } from "./components/modalRoomIcons";
import { LeaveRoomConfirmation } from "./components/room/components/leaveRoom";

export const Home = () => {
  const navigation = useNavigation();
  const { channel, roomID } = useContext(SocketContext);
  const [players, setPlayers] = useState<playerType[] | []>();
  const [isRoomModalVisible, setRoomModalVisible] = useState(false);
  const [isLeaveRoomModalVisible, setLeaveRoomModalVisible] = useState(false);

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

  const handlerAppState = useCallback(
    throttle(async (state: AppStateStatus) => {
      if (state === "active") {
        await channel?.push("request_sync", {});
      }
    }, 500),
    [channel]
  );

  const handlerRoomModal = (
    modalState: boolean,
    setModalState: (state: boolean) => void
  ) => {
    setModalState(!modalState);
  };

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
        <ModalRoomIcons
          handlerRoomModal={() =>
            handlerRoomModal(isRoomModalVisible, setRoomModalVisible)
          }
          handlerLeaveRoomModal={() =>
            handlerRoomModal(isLeaveRoomModalVisible, setLeaveRoomModalVisible)
          }
        />
        {roomID && (
          <RoomIDContainer>
            <RoomIDWrapper>
              <RoomID>{`Sala: ${roomID}`}</RoomID>
            </RoomIDWrapper>
          </RoomIDContainer>
        )}
        {isRoomModalVisible && (
          <RoomModal
            isModalVisible={isRoomModalVisible}
            hideModal={() =>
              handlerRoomModal(isRoomModalVisible, setRoomModalVisible)
            }
          />
        )}
        {isLeaveRoomModalVisible && (
          <LeaveRoomConfirmation
            isModalVisible={isLeaveRoomModalVisible}
            hideModal={() =>
              handlerRoomModal(
                isLeaveRoomModalVisible,
                setLeaveRoomModalVisible
              )
            }
          />
        )}
      </Container>
    </>
  );
};
