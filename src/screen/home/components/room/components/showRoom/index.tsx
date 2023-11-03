import React from "react";
import { TouchableOpacity } from "react-native";
import { ButtonText, ButtonView, Line } from "../../styles";
import { ModalView } from "../ModalViewTypes";

interface ShowRoomProps {
  setCurrentView: (view: ModalView) => void;
}

export const ShowRoom: React.FC<ShowRoomProps> = ({ setCurrentView }) => {
  return (
    <ButtonView direction="column">
      <TouchableOpacity onPress={() => setCurrentView(ModalView.CREATE_ROOM)}>
        <ButtonText>Criar uma sala</ButtonText>
      </TouchableOpacity>
      <Line />
      <TouchableOpacity onPress={() => setCurrentView(ModalView.ENTER_ROOM)}>
        <ButtonText>Entrar em uma sala</ButtonText>
      </TouchableOpacity>
    </ButtonView>
  );
};
