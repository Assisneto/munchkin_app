import React, { useContext } from "react";
import {
  ButtonText,
  ButtonView,
  LeaveRoomButton,
  LeaveRoomText,
  ModalBackground,
  ModalContainer
} from "../../styles";

import { TouchableWithoutFeedback, Modal } from "react-native";
import { SocketContext } from "../../../../../../socket/socket";
import { saveRoomID } from "../../../../../../storage/room";

interface LeaveRoomConfirmationProps {
  isModalVisible: boolean;
  hideModal: () => void;
}

export const LeaveRoomConfirmation: React.FC<LeaveRoomConfirmationProps> = ({
  isModalVisible,
  hideModal
}) => {
  const { setRoomID } = useContext(SocketContext);
  const leftRoom = async () => {
    setRoomID(null);
    await saveRoomID(null);
  };

  return (
    <Modal
      testID="leaveRoomModal"
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={hideModal}
    >
      <TouchableWithoutFeedback onPress={hideModal}>
        <ModalBackground>
          <TouchableWithoutFeedback>
            <ModalContainer>
              <LeaveRoomText>
                Tem certeza de que deseja sair desta sala?
              </LeaveRoomText>
              <ButtonView direction="row">
                <LeaveRoomButton
                  onPress={async () => {
                    await leftRoom();
                    hideModal();
                  }}
                >
                  <ButtonText>Sim</ButtonText>
                </LeaveRoomButton>
                <LeaveRoomButton onPress={hideModal}>
                  <ButtonText>Não</ButtonText>
                </LeaveRoomButton>
              </ButtonView>
            </ModalContainer>
          </TouchableWithoutFeedback>
        </ModalBackground>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
