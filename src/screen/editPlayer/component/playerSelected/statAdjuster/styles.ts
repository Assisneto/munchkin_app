import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

export const Icons = styled(MaterialIcons)`
  color: ${(props) => props.theme.colors.iconColor};
`;

export const SubTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
  padding-top: 10px;
`;

export const SubNumber = styled.Text`
  font-size: 40px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.text};
  padding-top: 20px;
  padding-bottom: 10px;
`;

export const ColumnContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const IconContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
