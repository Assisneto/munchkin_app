import { Container, Icons, Options, Title, AlignWrapper } from "./styles";

import { TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";

export const Header = () => {
  const navigation = useNavigation();
  const backToHome = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <AlignWrapper>
        <Icons name="chevron-left" size={34} onPress={backToHome} />
      </AlignWrapper>
      <Options>
        <TouchableOpacity>
          <Icons name="dice-multiple" size={26} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icons name="cog" size={26} />
        </TouchableOpacity>
      </Options>
    </Container>
  );
};
