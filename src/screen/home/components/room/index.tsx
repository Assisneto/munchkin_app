import { Modal, TouchableWithoutFeedback } from "react-native";
import { ModalBackground, ModalContainer } from "./styles";

import { useState } from "react";
import { EnterRoom } from "./components/enterRoom";
import { CreateRoom } from "./components/createRoom";
import { ShowRoom } from "./components/showRoom";

import { ModalView } from "./components/ModalViewTypes";

interface RoomModalProps {
  isModalVisible: boolean;
  hideModal: () => void;
}

export const RoomModal: React.FC<RoomModalProps> = ({
  isModalVisible,
  hideModal
}) => {
  const [currentView, setCurrentView] = useState(ModalView.SHOW_ROOM);

  const getContentByView = (view: ModalView) => {
    const componentsMap = {
      [ModalView.ENTER_ROOM]: <EnterRoom hideModal={hideModal} />,
      [ModalView.CREATE_ROOM]: <CreateRoom hideModal={hideModal} />,
      [ModalView.SHOW_ROOM]: <ShowRoom setCurrentView={setCurrentView} />
    };

    return componentsMap[view] || componentsMap[ModalView.SHOW_ROOM];
  };

  const content = getContentByView(currentView);
  return (
    <Modal
      testID="roomModal"
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={hideModal}
    >
      <TouchableWithoutFeedback onPress={hideModal} testID="modalBackground">
        <ModalBackground>
          <TouchableWithoutFeedback>
            <ModalContainer>{content}</ModalContainer>
          </TouchableWithoutFeedback>
        </ModalBackground>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
