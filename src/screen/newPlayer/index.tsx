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
  ErrorText
} from "./styles";
import { savePlayer } from "../../storage/player";
import { useSocket } from "../../hooks/useSocket";
import { SocketContext } from "../../socket/socket";
import { executeBySocketType } from "../../utils/executeBySocketType";
import { useNavigation } from "@react-navigation/native";
import { SocketType } from "../../storage/socket";

const MALE = "male";
const FEMALE = "female";

export const NewPlayer = () => {
  const [gender, setGender] = useState<string>(MALE);
  const [name, setName] = useState<string>("");
  const { socketState } = useContext(SocketContext);
  const [showError, setShowError] = useState<string>("");
  const { channel } = useSocket("room:lobby");
  const navigation = useNavigation();

  const backToHome = () => {
    navigation.goBack();
  };

  const newPlayer = async () => {
    const playerData = {
      gender,
      name,
      level: 1,
      power: 0
    };

    try {
      await savePlayer(playerData);
      backToHome();
      if (channel) {
        executeBySocketType(socketState, SocketType.HOST, () => {
          channel.push("new_player", playerData);
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        setShowError(error.message);
      } else {
        setShowError("Ocorreu um erro ao salvar o novo jogador.");
      }
    }
  };

  return (
    <Container>
      <Header savePlayer={newPlayer} />
      <Body>
        <Name
          testID="nameInput"
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
            testID="radio-male"
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
            testID="radio-female"
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
