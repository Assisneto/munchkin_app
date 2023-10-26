import React from "react";
import { Modal, TouchableOpacity } from "react-native";
import { ModalBackground, ModalContainer, Icons } from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface DiceProps {
  visible: boolean;
  diceNumber: number;
  onClose: () => void;
  onRoll: () => void;
}

export const Dice: React.FC<DiceProps> = ({
  visible,
  diceNumber,
  onClose,
  onRoll
}) => {
  const iconName: keyof typeof MaterialCommunityIcons.glyphMap =
    `dice-${diceNumber}` as keyof typeof MaterialCommunityIcons.glyphMap;
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      testID="diceModal"
    >
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={onClose}
        testID="backgroundTouchable"
      >
        <ModalBackground>
          <ModalContainer>
            <TouchableOpacity onPress={onRoll} testID="diceIconTouchable">
              <Icons name={iconName} size={100} testID="diceIcon" />
            </TouchableOpacity>
          </ModalContainer>
        </ModalBackground>
      </TouchableOpacity>
    </Modal>
  );
};
