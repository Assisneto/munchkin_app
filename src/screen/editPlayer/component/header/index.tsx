import { useState } from "react";
import { Container, Icons, Options, AlignWrapper } from "./styles";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Dice } from "./../../../../components/dice";

const ICONSIZE = 26;

export const Header = () => {
  const navigation = useNavigation();
  const [showDiceModal, setShowDiceModal] = useState<boolean>(false);
  const [diceRoll, setDiceRoll] = useState<number>(1);

  const rollDice = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(roll);
  };

  const closeModal = () => {
    setShowDiceModal(false);
  };

  const backToHome = () => {
    navigation.goBack();
  };

  return (
    <Container testID="header-container">
      <AlignWrapper>
        <Icons
          name="chevron-left"
          size={34}
          onPress={backToHome}
          testID="back-icon"
        />
      </AlignWrapper>
      <Options>
        <TouchableOpacity
          onPress={() => {
            rollDice();
            setShowDiceModal(!showDiceModal);
          }}
        >
          <Icons name="dice-multiple" size={ICONSIZE} />
        </TouchableOpacity>
      </Options>
      <Dice
        visible={showDiceModal}
        diceNumber={diceRoll}
        onClose={closeModal}
        onRoll={rollDice}
      />
    </Container>
  );
};
