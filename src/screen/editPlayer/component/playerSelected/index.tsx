import React, { useContext, useEffect, useState } from "react";

import { Container, Name, Title, Number, RowContainer } from "./styles";
import { Gender } from "../../../../components/gender";

import { editPlayer, playerType } from "../../../../storage/player";
import { StatAdjuster } from "./statAdjuster";

import { SocketContext } from "../../../../socket/socket";

type Props = {
  initialPlayer: playerType;
};
type PointKey = "level" | "power";

export const PlayerSelected = ({ initialPlayer }: Props) => {
  const [player, setPlayer] = useState<playerType>(initialPlayer);
  const { channel } = useContext(SocketContext);

  useEffect(() => {
    setPlayer(initialPlayer);
  }, [initialPlayer]);

  const handlerEdit = async (key: PointKey, amount: number) => {
    const updatedPlayer = {
      ...player,
      [key]: player[key] + amount
    };
    try {
      await editPlayer(updatedPlayer);
      setPlayer(updatedPlayer);

      if (channel) {
        channel.push("edit_player", updatedPlayer);
      }
    } catch (error) {
      return;
    }
  };

  return (
    <Container>
      <Name testID="playerSelectedName">{player.name}</Name>
      <Title>Força</Title>
      <Number>{player.level + player.power}</Number>
      <Gender gender={player.gender} size={30} />
      <RowContainer>
        <StatAdjuster
          title="Nível"
          value={player.level}
          adjustValue={handlerEdit}
          keyName="level"
        />
        <StatAdjuster
          title="Equip"
          value={player.power}
          adjustValue={handlerEdit}
          keyName="power"
        />
      </RowContainer>
    </Container>
  );
};
