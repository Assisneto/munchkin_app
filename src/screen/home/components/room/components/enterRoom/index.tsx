import React, { useContext, useState } from "react";

import { InputRoomContainer, InputRoomName, InputRoomText } from "../../styles";

import { SocketContext } from "../../../../../../socket/socket";

interface EnterRoomProps {
  hideModal: () => void;
}

export const EnterRoom: React.FC<EnterRoomProps> = ({ hideModal }) => {
  const [roomCode, setRoomCode] = useState("");
  const { setRoomID } = useContext(SocketContext);

  const handleRoomCodeChange = (text: string) => {
    setRoomCode(text);
  };

  const handleRoomCodeSubmit = async () => {
    setRoomID(roomCode);
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
