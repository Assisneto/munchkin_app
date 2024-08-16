import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { MaterialCommunityIcons as IconSet } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

type IconNameType = keyof typeof IconSet.glyphMap;

export const Container = styled(SafeAreaView).attrs({
  edges: { top: "additive" }
})`
  width: 100%;
  background-color: ${(props) => props.theme.colors.header};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px;
`;

export const Title = styled.Text`
  padding-left: 20px;
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.headerText};
`;

export const Icons = styled(MaterialCommunityIcons).attrs(
  (props: { name: IconNameType }) => ({
    name: props.name
  })
)`
  color: ${(props) => props.theme.colors.iconColor};
`;

export const AlignWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
