import { useContext } from "react";

import { Gender } from "../../../../components/gender";

import { Circle, Container, Icons, Letter, Name, NameSexContainer, Point, RowContainer, Wrapper } from "./styles";

type Props = {
  name: string;
  gender: string;
  power: number;
  level: number;
}

const firstLetter = (name: string): string => name.charAt(0).toUpperCase()

export const Player = ({ gender, level, name, power }: Props) => {
  return (<Container >
    <RowContainer>
      <Circle >
        <Letter>{firstLetter(name)}</Letter>
      </Circle>
      <NameSexContainer>
        <Name>{name}</Name>
        <Gender gender={gender} />
      </NameSexContainer>
    </RowContainer>
    <RowContainer>
      <Point>{level}</Point>
      <Icons name="chevron-up" size={28} />
      <Wrapper>
        <Point>{power}</Point>
        <Icons name="sword" size={28} />
      </Wrapper>
    </RowContainer>
  </Container>
  )
}
