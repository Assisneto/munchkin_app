import React, { useContext, useEffect, useState } from "react";

import { Container, Name, Title, Number, RowContainer } from "./styles";
import { Gender } from "../../../../components/gender";

import { editPlayer, playerType } from "../../../../storage/player";
import { StatAdjuster } from "./statAdjuster";
import { useSocket } from "../../../../hooks/useSocket";
import { executeBySocketType } from "../../../../utils/executeBySocketType";
import { SocketContext } from "../../../../socket/socket";
import { SocketType } from "../../../../storage/socket";

type Props = {
  initialPlayer: playerType;
};
type PointKey = "level" | "power";

export const PlayerSelected = ({ initialPlayer }: Props) => {
  const [player, setPlayer] = useState<playerType>(initialPlayer);
  const { channel } = useSocket("room:lobby");
  const { socketState } = useContext(SocketContext);

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
        executeBySocketType(socketState, SocketType.HOST, () => {
          channel.push("edit_player", updatedPlayer);
        });
      }
    } catch (error) {
      return;
    }
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
