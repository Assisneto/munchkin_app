import styled from "styled-components/native";

export const ModalBackground = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.View`
  width: 300px;
  height: 150px;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.header};
  border-radius: 10px;
`;

export const ButtonText = styled.Text`
  color: ${(props) => props.theme.colors.headerText};
  font-size: 20px;
`;

export const ButtonView = styled.View`
  flex: 1;
  justify-content: space-around;
  align-items: center;
`;

export const Line = styled.View`
  background-color: ${(props) => props.theme.colors.background};
  width: 100%;
  height: 1px;
  border-radius: 1px;
`;
export const InputRoomContainer = styled.View`
  justify-content: space-around;
`;
export const InputRoomText = styled.Text`
  font-size: 20px;
  color: ${(props) => props.theme.colors.headerText};
  padding-bottom: 10px;
`;
export const InputRoomTextTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.headerText};
  padding-bottom: 10px;
`;

export const InputRoomName = styled.TextInput.attrs((props) => ({
  placeholderTextColor: `${props.theme.colors.headerText}`,
  autoFocus: true,
  autoCapitalize: "none",
  maxLength: 5
}))`
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.headerText};
  margin-top: 20px;
  height: 65px;
  border-radius: 10px;
  width: 100%;
  padding-left: 15px;
  color: ${(props) => props.theme.colors.text};
  font-size: 17px;
`;
