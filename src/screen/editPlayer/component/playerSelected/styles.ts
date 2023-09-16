import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

export const Name = styled.Text`
  font-size: 20px;
  font-weight: 500;
  padding-top: 30px;
  color: ${(props) => props.theme.colors.text};
`;
export const CircleTitle = styled.Text`
  font-size: 20px;
  position: absolute;
`;
export const Icons = styled(MaterialIcons)`
  color: ${(props) => props.theme.colors.iconColor};
`;

export const Container = styled.View`
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
`;

export const Title = styled.Text`
  font-size: 23px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
  padding-top: 30px;
`;

export const SubTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
  padding-top: 10px;
`;

export const Number = styled.Text`
  font-size: 60px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.text};
  padding-top: 20px;
  padding-bottom: 10px;
`;

export const SubNumber = styled.Text`
  font-size: 40px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.text};
  padding-top: 20px;
  padding-bottom: 10px;
`;

export const RowContainer = styled.View`
  flex-direction: row;
  width: 100%;
  padding: 0 15px;
  justify-content: space-between;
`;

export const ColumnContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const IconContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
