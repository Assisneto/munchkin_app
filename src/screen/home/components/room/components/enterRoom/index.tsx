import React, { useContext, useState } from "react";

import { InputRoomContainer, InputRoomName, InputRoomText } from "../../styles";

import { SocketContext } from "../../../../../../socket/socket";
import { saveRoomID } from "../../../../../../storage/room";

interface EnterRoomProps {
  hideModal: () => void;
}

export const EnterRoom: React.FC<EnterRoomProps> = ({ hideModal }) => {
  const [roomCode, setRoomCode] = useState("");
  const { setRoomID } = useContext(SocketContext);
  const handleRoomCodeChange = (text: string) => {
    setRoomCode(text);

    if (text.length === 5) {
      handleRoomCodeSubmit(text);
    }
  };

  const handleRoomCodeSubmit = async (roomID: string) => {
    setRoomID(roomID);
    saveRoomID(roomID);
    hideModal();
  };

  return (
    <InputRoomContainer>
      <InputRoomText>Insira o código da Sala</InputRoomText>
      <InputRoomName value={roomCode} onChangeText={handleRoomCodeChange} />
    </InputRoomContainer>
  );
};
