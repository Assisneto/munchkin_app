import React, { useContext } from "react";

import { Circle, Icons } from "../../styles";
import { SocketContext } from "../../../../socket/socket";
import { saveRoomID } from "../../../../storage/room";

interface ModalRoomProps {
  handlerRoomModal: () => void;
}

export const ModalRoomIcons: React.FC<ModalRoomProps> = ({
  handlerRoomModal
}) => {
  const { roomID, setRoomID } = useContext(SocketContext);
  const leftRoom = async () => {
    setRoomID(null);
    await saveRoomID(null);
  };
  return (
    <>
      {roomID === null ? (
        <Circle
          position="left"
          onPress={handlerRoomModal}
          testID="toggleModalButton"
        >
          <Icons name="party-popper" size={26} />
        </Circle>
      ) : (
        <Circle
          position="left"
          onPress={() => leftRoom()}
          testID="toggleModalButton"
        >
          <Icons name="arrow-left-bold" size={26} />
        </Circle>
      )}
    </>
  );
};
