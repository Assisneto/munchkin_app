import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const Container = styled.View`
  width: 100%;
  height: 50px;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 18px;
`;

export const Circle = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: green;
  align-items: center;
  justify-content: center;
`;
export const Letter = styled.Text`
  font-size: 30px;
  color: ${(props) => props.theme.colors.text};
  font-weight: 300;
`;

export const Name = styled.Text`
  font-size: 20px;
  color: ${(props) => props.theme.colors.text};
`;
export const RowContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;
export const NameSexContainer = styled.View`
  padding-left: 10px;
  justify-content: center;
`;
export const Icons = styled(MaterialCommunityIcons)`
  color: ${(props) => props.theme.colors.iconColor};
`;
export const Point = styled.Text`
  font-size: 28px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.text};
  padding-right: 5px;
`;
export const Wrapper = styled.View`
  padding-left: 28px;
  flex-direction: row;
  align-items: center;
`;

export const DeleteContainer = styled.TouchableOpacity`
  background-color: red;
  justify-content: center;
  margin-top: 18px;
  border-radius: 10px;
  margin-left: 5px;
`;

export const DeleteText = styled.Text`
  font-size: 20px;
  color: ${(props) => props.theme.colors.text};
  font-weight: 400;
  padding: 0 10px;
`;
