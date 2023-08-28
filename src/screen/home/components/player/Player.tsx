import { useContext } from "react";

// import { TouchableOpacity } from "react-native";

import { Circle, Container, Icons, Letter, Name, NameSexContainer, Point, RowContainer, Wrapper } from "./styles";



export const Player = () => {

  return (<Container >
    <RowContainer>
      <Circle >
        <Letter>A</Letter>
      </Circle>
      <NameSexContainer>
        <Name>Assis</Name>
        <Icons name="gender-male" size={18} />
      </NameSexContainer>
    </RowContainer>
    <RowContainer>
      <Point>1</Point>
      <Icons name="chevron-up" size={28} />
      <Wrapper>
        <Point>1</Point>
        <Icons name="sword" size={28} />
      </Wrapper>
    </RowContainer>
  </Container>
  )
}
