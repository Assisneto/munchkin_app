import React, { useContext, useEffect, useState } from "react";

import {
  InputRoomContainer,
  InputRoomName,
  InputRoomText,
  InputRoomTextTitle
} from "../../styles";
import { createRoomID } from "../../../../../../storage/room";
import { RoomEvent, SocketContext } from "../../../../../../socket/socket";

interface CreateRoomProps {
  hideModal: () => void;
}

export const CreateRoom: React.FC<CreateRoomProps> = ({ hideModal }) => {
  const [roomCode, setRoomCode] = useState("");
  const { setRoomID, setRoomEvent } = useContext(SocketContext);

  useEffect(() => {
    const fetchRoomID = async () => {
      const roomID = await createRoomID();
      setRoomEvent(RoomEvent.Connect);
      setRoomCode(roomID);
      setRoomID(roomID);
    };

    fetchRoomID();
  }, []);

  return (
    <InputRoomContainer>
      <InputRoomTextTitle>A Sala foi Criada</InputRoomTextTitle>
      <InputRoomText>{`Codigo da Sala: ${roomCode}`}</InputRoomText>
    </InputRoomContainer>
  );
};
