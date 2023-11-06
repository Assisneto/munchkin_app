import React, { useContext } from "react";

import { Circle, Icons } from "../../styles";
import { SocketContext } from "../../../../socket/socket";

interface ModalRoomProps {
  handlerRoomModal: () => void;
  handlerLeaveRoomModal: () => void;
}

export const ModalRoomIcons: React.FC<ModalRoomProps> = ({
  handlerRoomModal,
  handlerLeaveRoomModal
}) => {
  const { roomID } = useContext(SocketContext);

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
          onPress={handlerLeaveRoomModal}
          testID="toggleModalButton"
        >
          <Icons name="arrow-left-bold" size={26} />
        </Circle>
      )}
    </>
  );
};
