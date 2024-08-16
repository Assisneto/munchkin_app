import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Dice } from "./../../../../components/dice";
import { BaseHeader } from "../../../../components/baseHeader";
import { Icons, Options } from "./styles";

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

  return (
    <>
      <BaseHeader
        leftIconName="chevron-left"
        onLeftIconPress={navigation.goBack}
        additionalRightIcons={
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
        }
      />
      <Dice
        visible={showDiceModal}
        diceNumber={diceRoll}
        onClose={closeModal}
        onRoll={rollDice}
      />
    </>
  );
};
