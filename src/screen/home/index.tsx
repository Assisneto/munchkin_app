import { useCallback, useContext, useEffect, useState } from "react";
import {
  Circle,
  Container,
  RoomID,
  RoomIDContainer,
  Icons,
  RoomIDWrapper
} from "./styles";

import { FlatList } from "react-native";

import { Header } from "./components/header";
import { Player } from "../../components/player";
import { RoomModal } from "./components/room";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { deletePlayerByName } from "../../storage/player";

import { SocketContext } from "../../socket/socket";
import { ModalRoomIcons } from "./components/modalRoomIcons";
import { LeaveRoomConfirmation } from "./components/room/components/leaveRoom";
import { RoomContext } from "../../context/room";

export const Home = () => {
  const navigation = useNavigation();
  const { channel, roomID } = useContext(SocketContext);
  const { players } = useContext(RoomContext);
  const [isRoomModalVisible, setRoomModalVisible] = useState(false);
  const [isLeaveRoomModalVisible, setLeaveRoomModalVisible] = useState(false);

  const handleNewPlayer = () => navigation.navigate("newPlayer");

  const resetAllPlayersNotify = async (): Promise<void> => {
    await channel?.push("reset_all_players", {});
  };

  const deletePlayerLocal = async (name: string) =>
    await deletePlayerByName(name);

  const deletePlayerAndNotify = async (name: string) => {
    await deletePlayerLocal(name);
    channel?.push("delete_player", { name });
  };

  const handlerRoomModal = (
    modalState: boolean,
    setModalState: (state: boolean) => void
  ) => setModalState(!modalState);

  useEffect(() => {
    (async () => await channel?.push("request_sync", {}))();
  }, [channel]);

  return (
    <>
      <Header players={players} resetAllPlayersNotify={resetAllPlayersNotify} />
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
