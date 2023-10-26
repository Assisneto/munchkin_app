import { editPlayers, playerType } from "../../../../storage/player";
import { Container, Icons, Options, Title } from "./styles";
import { Dice } from "./../../../../components/dice";

import { TouchableOpacity } from "react-native";
import { useState } from "react";
const ICONSIZE = 26;
interface HeaderProps {
  players: playerType[] | undefined;
  reloadStateFunction: () => Promise<void>;
  resetAllPlayersNotify: () => Promise<void>;
}

export const Header = ({
  players,
  reloadStateFunction,
  resetAllPlayersNotify
}: HeaderProps) => {
  const [showDiceModal, setShowDiceModal] = useState<boolean>(false);
  const [diceRoll, setDiceRoll] = useState<number>(1);

  const resetAllPlayers = async () => {
    if (players && players.length > 0) {
      await editPlayers(players, { level: 1, power: 0 });
      await reloadStateFunction();
      await resetAllPlayersNotify();
    }
  };
  const rollDice = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(roll);
  };

  const closeModal = () => {
    setShowDiceModal(false);
  };

  return (
    <>
      <Container testID="headerContainer">
        <Title>Munchkins</Title>
        <Title></Title>
        <Options>
          <TouchableOpacity
            testID="resetButton"
            onPress={() => resetAllPlayers()}
          >
            <Icons name="backup-restore" size={ICONSIZE} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icons name="pencil" size={ICONSIZE} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              rollDice();
              setShowDiceModal(!showDiceModal);
            }}
          >
            <Icons name="dice-multiple" size={ICONSIZE} testID="diceIcon" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icons name="cog" size={ICONSIZE} />
          </TouchableOpacity>
        </Options>
        <Dice
          visible={showDiceModal}
          diceNumber={diceRoll}
          onClose={closeModal}
          onRoll={rollDice}
        />
      </Container>
    </>
  );
};
