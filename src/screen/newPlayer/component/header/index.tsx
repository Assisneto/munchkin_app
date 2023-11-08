import { Container, Icons, Options, Title, AlignWrapper } from "./styles";

import { TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";

export const Header = ({ savePlayer }: { savePlayer: () => Promise<void> }) => {
  const navigation = useNavigation();

  return (
    <Container>
      <AlignWrapper>
        <Icons
          name="chevron-left"
          testID="back-button"
          size={34}
          onPress={navigation.goBack}
        />
        <Title>Novo Munchkin</Title>
      </AlignWrapper>
      <Options>
        <TouchableOpacity onPress={savePlayer} testID="savePlayerButton">
          <Icons name="check" testID="save-button" size={30} />
        </TouchableOpacity>
      </Options>
    </Container>
  );
};
