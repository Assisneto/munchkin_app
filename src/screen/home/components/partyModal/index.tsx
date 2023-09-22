import { Modal, Button, TouchableWithoutFeedback } from "react-native";
import { ModalBackground, ModalContainer, ModalText } from "./styles";
import { SocketContext, SocketType } from "../../../../socket/socket";
import { useContext } from "react";

interface PartyModalProps {
  isModalVisible: boolean;
  hideModal: () => void;
}

export const PartyModal: React.FC<PartyModalProps> = ({
  isModalVisible,
  hideModal,
}) => {
  const { setSocketState } = useContext(SocketContext);

  const handlerModalChoice = (type: SocketType) => {
    setSocketState(type);
    hideModal();
  };

  return (
    <Modal
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
              <Button
                title="Host"
                onPress={() => handlerModalChoice(SocketType.HOST)}
              />
              <Button
                title="Guest"
                onPress={() => handlerModalChoice(SocketType.CLIENT)}
              />
            </ModalContainer>
          </TouchableWithoutFeedback>
        </ModalBackground>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
