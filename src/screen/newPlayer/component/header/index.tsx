import { Container, Icons, Options, Title, AlignWrapper } from "./styles";

import { TouchableOpacity } from "react-native";

export const Header = () => {
  return (<>
    <Container>
      <AlignWrapper>
        <Icons name="chevron-left" size={34} />
        <Title>Novo Munchkin</Title>
      </AlignWrapper>
      <Options>
        <TouchableOpacity>
          <Icons name="check" size={30} />
        </TouchableOpacity>
      </Options>
    </Container>
  </>
  )
}
