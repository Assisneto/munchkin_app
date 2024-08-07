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
import { SocketContext } from "../../socket/socket";
import { useNavigation } from "@react-navigation/native";
import { RoomContext } from "../../context/room";

const MALE = "male";
const FEMALE = "female";

export const NewPlayer = () => {
  const [gender, setGender] = useState<string>(MALE);
  const [name, setName] = useState<string>("");
  const { channel } = useContext(SocketContext);
  const [showError, setShowError] = useState<string>("");
  const navigation = useNavigation();
  const { savePlayer } = useContext(RoomContext);

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
      channel?.push("new_player", playerData);
      backToHome();
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
          value={name}
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
