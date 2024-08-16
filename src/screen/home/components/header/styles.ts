import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
