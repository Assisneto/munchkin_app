import styled from "styled-components/native";
import { Gender } from "../../components/gender";
import { RadioButton as RadioButtonPaper } from "react-native-paper";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export const Body = styled.View`
  padding: 0 20px;
`;

export const Name = styled.TextInput.attrs((props) => ({
  placeholderTextColor: `${props.theme.colors.headerText}`,
}))`
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.header};
  margin-top: 20px;
  height: 65px;
  border-radius: 10px;
  width: 100%;
  padding-left: 15px;
  color: ${(props) => props.theme.colors.text};
  font-size: 17px;
`;

export const GenderContainer = styled.TouchableOpacity`
  padding-top: 15px;
  flex-direction: row;
`;

export const BodyText = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-size: 20px;
  padding-top: 15px;
`;

export const GenderIcon = styled(Gender)`
  padding-right: 15px;
`;

export const RadioButton = styled(RadioButtonPaper).attrs((props) => ({
  color: `${props.theme.colors.header}`,
  uncheckedColor: `${props.theme.colors.headerText}`,
}))``;

export const ErrorText = styled.Text`
  color: red;
  font-size: 15px;
  padding-top: 15px;
`;
