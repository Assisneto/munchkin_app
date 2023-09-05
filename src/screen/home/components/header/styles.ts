import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const Container = styled.View`
  width: 100%;
  height: 100px;
  background-color: ${(props) => props.theme.colors.header};
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-around;
`;
export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.text};
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
