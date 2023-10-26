import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const ModalBackground = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.View`
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.header};
  border-radius: 10px;
`;

export const Icons = styled(MaterialCommunityIcons).attrs({
  size: 100
})`
  color: ${(props) => props.theme.colors.iconColor};
`;
