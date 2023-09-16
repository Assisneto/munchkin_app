import React, { useEffect, useState } from "react";

import { Container, Name, Title, Number, RowContainer } from "./styles";
import { Gender } from "../../../../components/gender";

import { editPlayer, playerType } from "../../../../storage/player/player";
import { StatAdjuster } from "./statAdjuster";

type Props = {
  initialPlayer: playerType;
};
type PointKey = "level" | "power";

export const PlayerSelected = ({ initialPlayer }: Props) => {
  const [player, setPlayer] = useState<playerType>(initialPlayer);

  useEffect(() => {
    setPlayer(initialPlayer);
  }, [initialPlayer]);

  const addPoint = async (key: PointKey, amount: number) => {
    const updatedPlayer = {
      ...player,
      [key]: player[key] + amount,
    };

    await editPlayer(updatedPlayer);
    setPlayer(updatedPlayer);
  };

  return (
    <Container>
      <Name>{player.name}</Name>
      <Title>Força</Title>
      <Number>{player.level + player.power}</Number>
      <Gender gender={player.gender} size={30} />
      <RowContainer>
        <StatAdjuster
          title="Nível"
          value={player.level}
          adjustValue={addPoint}
          keyName="level"
        />
        <StatAdjuster
          title="Equip"
          value={player.power}
          adjustValue={addPoint}
          keyName="power"
        />
      </RowContainer>
    </Container>
  );
};
