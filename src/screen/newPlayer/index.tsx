import React, { useContext, useEffect, useState } from "react";
import { Header } from "./component/header";
import {
  Container,
  Body,
  Name,
  GenderIcon,
  BodyText,
  GenderContainer,
  RadioButton,
  ErrorText,
} from "./styles";
import { savePlayer } from "../../storage/player/player";
import { useSocket } from "../../hooks/useSocket";
import { SocketContext, SocketType } from "../../socket/socket";
import { executeBySocketType } from "../../utils/typeSocketHandle";

const MALE = "male";
const FEMALE = "female";

export const NewPlayer = () => {
  const [gender, setGender] = useState<string>(MALE);
  const [name, setName] = useState<string>("");
  const { socketState } = useContext(SocketContext);
  const [showError, setShowError] = useState<string>("");
  const { channel } = useSocket("room:lobby");
  const newPlayer = async () => {
    const playerData = {
      gender,
      name,
      level: 1,
      power: 0,
    };
    try {
      await savePlayer(playerData);

      if (channel) {
        executeBySocketType(socketState, SocketType.HOST, () => {
          channel.push("new_player", playerData);
        });
      }
    } catch (error) {
      console.error("Error saving new player:", error);
      setShowError("Ocorreu um erro ao salvar o novo jogador.");
    }
  };

  return (
    <Container>
      <Header savePlayer={newPlayer} showError={setShowError} />
      <Body>
        <Name
          placeholder="Nome"
          onChangeText={(value) => {
            setName(value);
            showError ? setShowError("") : "";
          }}
        />
        {showError && <ErrorText>{showError}</ErrorText>}
        <BodyText>Genero</BodyText>
        <GenderContainer
          onPress={() => {
            setGender(MALE);
          }}
        >
          <GenderIcon gender={MALE} size={30} />
          <RadioButton
            value={MALE}
            status={gender === MALE ? "checked" : "unchecked"}
            onPress={() => {
              setGender(MALE);
            }}
          />
        </GenderContainer>
        <GenderContainer
          onPress={() => {
            setGender(FEMALE);
          }}
        >
          <GenderIcon gender={FEMALE} size={30} />
          <RadioButton
            value={FEMALE}
            status={gender === FEMALE ? "checked" : "unchecked"}
            onPress={() => {
              setGender(FEMALE);
            }}
          />
        </GenderContainer>
      </Body>
    </Container>
  );
};
