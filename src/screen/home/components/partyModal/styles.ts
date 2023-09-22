import styled from "styled-components/native";

export const ModalBackground = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.View`
  width: 300px;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 10px;
  align-items: center;
`;

export const ModalText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.text};
  padding-bottom: 10px;
`;
