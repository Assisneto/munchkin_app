import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const Options = styled.View`
  flex-direction: row-reverse;
  align-items: flex-end;
  justify-content: space-between;
  padding-bottom: 10px;
  padding-left: 20px;
  flex: 0.2;
`;
export const Icons = styled(MaterialCommunityIcons)`
  color: ${(props) => props.theme.colors.iconColor};
  background-color: ${(props) => props.theme.colors.header};
`;
