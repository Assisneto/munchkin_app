import { editPlayers, playerType } from "../../../../storage/player";
import { Container, Icons, Options, Title } from "./styles";

import { TouchableOpacity } from "react-native";

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
  const ICONSIZE = 26;

  const resetAllPlayers = async () => {
    if (players && players.length > 0) {
      await editPlayers(players, { level: 1, power: 0 });
      await reloadStateFunction();
      await resetAllPlayersNotify();
    }
  };

  return (
    <>
      <Container>
        <Title>Munchkins</Title>
        <Title></Title>
        <Options>
          <TouchableOpacity onPress={() => resetAllPlayers()}>
            <Icons name="backup-restore" size={ICONSIZE} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icons name="pencil" size={ICONSIZE} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icons name="dice-multiple" size={ICONSIZE} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icons name="cog" size={ICONSIZE} />
          </TouchableOpacity>
        </Options>
      </Container>
    </>
  );
};
