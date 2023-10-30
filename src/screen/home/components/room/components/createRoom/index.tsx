import React, { useEffect, useState } from "react";

import {
  InputRoomContainer,
  InputRoomName,
  InputRoomText,
  InputRoomTextTitle
} from "../../styles";
import { createRoomID } from "../../../../../../storage/room";

interface CreateRoomProps {
  hideModal: () => void;
}

export const CreateRoom: React.FC<CreateRoomProps> = ({ hideModal }) => {
  const [roomCode, setRoomCode] = useState("");

  useEffect(() => {
    const fetchRoomID = async () => {
      const roomID = await createRoomID();
      setRoomCode(roomID);
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
