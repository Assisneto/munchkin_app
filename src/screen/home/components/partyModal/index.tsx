import { Modal, Button, TouchableWithoutFeedback } from "react-native";
import { ModalBackground, ModalContainer, ModalText } from "./styles";
import { SocketContext } from "../../../../socket/socket";
import { useContext } from "react";
import { SocketType } from "../../../../storage/socket";

interface PartyModalProps {
  isModalVisible: boolean;
  hideModal: () => void;
}

export const PartyModal: React.FC<PartyModalProps> = ({
  isModalVisible,
  hideModal
}) => {
  const { setSocketState } = useContext(SocketContext);

  const handlerModalChoice = (type: SocketType) => {
    setSocketState(type);
    hideModal();
  };

  return (
    <Modal
      testID="partyModal"
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={hideModal}
    >
      <TouchableWithoutFeedback onPress={hideModal}>
        <ModalBackground>
          <TouchableWithoutFeedback onPress={() => {}}>
            <ModalContainer>
              <ModalText>Select Role</ModalText>
              <Button title="Host" onPress={() => hideModal()} />
              <Button title="Guest" onPress={() => hideModal()} />
            </ModalContainer>
          </TouchableWithoutFeedback>
        </ModalBackground>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
