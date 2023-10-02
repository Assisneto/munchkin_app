import { Container, Icons, Options, Title, AlignWrapper } from "./styles";

import { TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";

export const Header = ({
  savePlayer,
  showError,
}: {
  savePlayer: () => Promise<void>;
  showError: (error: string) => void;
}) => {
  const navigation = useNavigation();

  return (
    <>
      <Container>
        <AlignWrapper>
          <Icons name="chevron-left" size={34} onPress={navigation.goBack} />
          <Title>Novo Munchkin</Title>
        </AlignWrapper>
        <Options>
          <TouchableOpacity onPress={savePlayer}>
            <Icons name="check" size={30} />
          </TouchableOpacity>
        </Options>
      </Container>
    </>
  );
};
