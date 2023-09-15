import { Gender } from "../gender";
import { Swipeable } from "react-native-gesture-handler";
import {
  Circle,
  Container,
  Icons,
  Letter,
  Name,
  NameSexContainer,
  Point,
  RowContainer,
  Wrapper,
  DeleteContainer,
  DeleteText,
} from "./styles";
import { useNavigation } from "@react-navigation/native";

type Props = {
  name: string;
  gender: string;
  power: number;
  level: number;
  deletePlayer: (name: string) => void;
};

const firstLetter = (name: string): string => name.charAt(0).toUpperCase();

const deleteComponent = (
  deletePlayer: (name: string) => void,
  name: string
) => {
  return (
    <DeleteContainer onPress={async () => await deletePlayer(name)}>
      <DeleteText>Deletar</DeleteText>
    </DeleteContainer>
  );
};

export const Player = ({ gender, level, name, power, deletePlayer }: Props) => {
  const navigation = useNavigation();

  const handleEditPlayer = () => {
    navigation.navigate("editPlayer");
  };

  return (
    <Swipeable renderRightActions={() => deleteComponent(deletePlayer, name)}>
      <Container>
        <RowContainer onPress={handleEditPlayer}>
          <Circle>
            <Letter>{firstLetter(name)}</Letter>
          </Circle>
          <NameSexContainer>
            <Name>{name}</Name>
            <Gender gender={gender} />
          </NameSexContainer>
        </RowContainer>
        <RowContainer onPress={handleEditPlayer}>
          <Point>{level}</Point>
          <Icons name="chevron-up" size={28} />
          <Wrapper>
            <Point>{power}</Point>
            <Icons name="sword" size={28} />
          </Wrapper>
        </RowContainer>
      </Container>
    </Swipeable>
  );
};
