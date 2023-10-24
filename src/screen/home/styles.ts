import styled from "styled-components/native";
import { TouchableOpacityProps } from "react-native";
interface CircleProps extends TouchableOpacityProps {
  position?: "left" | "right";
}

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  padding: 0 15px;
`;

export const SwitchWrapper = styled.Text`
  padding-bottom: 10px;
  position: absolute;
  bottom: 2%;
  left: 50%;
`;
export const Circle = styled.TouchableOpacity<CircleProps>`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${(props) => props.theme.colors.header};
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  ${(props) => (props.position === "right" ? "right: 0;" : "left: 0;")}
  margin: 20px;
`;
