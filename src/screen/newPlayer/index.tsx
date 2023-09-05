import React, { useState } from "react";
import { Header } from "./component/header";
import {
  Container,
  Body,
  Name,
  GenderIcon,
  BodyText,
  GenderContainer,
  RadioButton,
} from "./styles";

const MALE = "male";
const FEMALE = "female";

export const NewPlayer = () => {
  const [sex, setSex] = useState<string>(FEMALE);
  const [name, setName] = useState<string>();
  return (
    <Container>
      <Header />
      <Body>
        <Name
          placeholder="Nome"
          onSubmitEditing={(value) => setName(value.nativeEvent.text)}
        />
        <BodyText>Genero</BodyText>
        <GenderContainer
          onPress={() => {
            setSex(MALE);
          }}
        >
          <GenderIcon gender={MALE} size={30} />
          <RadioButton
            value={MALE}
            status={sex === MALE ? "checked" : "unchecked"}
            onPress={() => {
              setSex(MALE);
            }}
          />
        </GenderContainer>
        <GenderContainer
          onPress={() => {
            setSex(FEMALE);
          }}
        >
          <GenderIcon gender={FEMALE} size={30} />
          <RadioButton
            value={FEMALE}
            status={sex === FEMALE ? "checked" : "unchecked"}
            onPress={() => {
              setSex(FEMALE);
            }}
          />
        </GenderContainer>
      </Body>
    </Container>
  );
};
