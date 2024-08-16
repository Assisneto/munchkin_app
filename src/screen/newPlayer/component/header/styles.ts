import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const Options = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const Icons = styled(MaterialCommunityIcons)`
  color: ${(props) => props.theme.colors.iconColor};
  background-color: ${(props) => props.theme.colors.header};
`;
