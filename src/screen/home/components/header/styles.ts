import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export const Container = styled(SafeAreaView).attrs({
  edges: { top: "additive" }
})`
  width: 100%;
  background-color: ${(props) => props.theme.colors.header};
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.headerText};
  padding-bottom: 10px;
`;

export const Options = styled.View`
  flex: 0.55;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  padding-bottom: 10px;
`;
export const Icons = styled(MaterialCommunityIcons)`
  color: ${(props) => props.theme.colors.iconColor};
`;
