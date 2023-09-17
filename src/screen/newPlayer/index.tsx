import React, { useEffect, useState } from "react";
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

const MALE = "male";
const FEMALE = "female";

export const NewPlayer = () => {
  const [gender, setGender] = useState<string>(MALE);
  const [name, setName] = useState<string>("");
  const [showError, setShowError] = useState<string>("");

  const newPlayer = async () => {
    await savePlayer({
      gender,
      name,
      level: 0,
      power: 0,
    });
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
