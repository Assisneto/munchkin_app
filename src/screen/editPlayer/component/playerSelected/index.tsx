import React from "react";

import {
  Container,
  Name,
  Title,
  Number,
  RowContainer,
  SubNumber,
  ColumnContainer,
  SubTitle,
  Icons,
  IconContainer,
} from "./styles";
import { Gender } from "../../../../components/gender";
import { TouchableOpacity } from "react-native-gesture-handler";

import { playerType } from "../../../../storage/player/player";

const ICONSIZE = 56;

type Props = {
  player: playerType;
};

export const PlayerSelected = ({ player }: Props) => {
  return (
    <Container>
      <Name>{player?.name}</Name>
      <Title>Força</Title>
      <Number>{player.level + player.power}</Number>
      <Gender gender={player.gender} size={30} />
      <RowContainer>
        <ColumnContainer>
          <SubTitle>Nível</SubTitle>
          <SubNumber>{player.level}</SubNumber>
          <IconContainer>
            <TouchableOpacity
              onPress={() => {
                /* Adicione a ação desejada aqui */
              }}
            >
              <Icons name="arrow-drop-down" size={ICONSIZE} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                /* Adicione a ação desejada aqui */
              }}
            >
              <Icons name="arrow-drop-up" size={ICONSIZE} />
            </TouchableOpacity>
          </IconContainer>
        </ColumnContainer>
        <ColumnContainer>
          <SubTitle>Equip</SubTitle>
          <SubNumber>{player.power}</SubNumber>
          <IconContainer>
            <TouchableOpacity
              onPress={() => {
                /* Adicione a ação desejada aqui */
              }}
            >
              <Icons name="arrow-drop-down" size={ICONSIZE} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                /* Adicione a ação desejada aqui */
              }}
            >
              <Icons name="arrow-drop-up" size={ICONSIZE} />
            </TouchableOpacity>
          </IconContainer>
        </ColumnContainer>
      </RowContainer>
    </Container>
  );
};
