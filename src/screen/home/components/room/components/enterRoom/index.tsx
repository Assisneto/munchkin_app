import React, { useState } from "react";

import { InputRoomContainer, InputRoomName, InputRoomText } from "../../styles";
import { saveRoomID } from "../../../../../../storage/room";

interface EnterRoomProps {
  hideModal: () => void;
}

export const EnterRoom: React.FC<EnterRoomProps> = ({ hideModal }) => {
  const [roomCode, setRoomCode] = useState("");

  const handleRoomCodeChange = (text: string) => {
    setRoomCode(text);
  };

  const handleRoomCodeSubmit = async () => {
    await saveRoomID(roomCode);
    hideModal();
  };

  return (
    <InputRoomContainer>
      <InputRoomText>Insira o codigo da Sala</InputRoomText>
      <InputRoomName
        value={roomCode}
        onChangeText={handleRoomCodeChange}
        onSubmitEditing={handleRoomCodeSubmit}
      />
    </InputRoomContainer>
  );
};
