import styled from "styled-components/native";
import { TouchableOpacityProps } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
interface CircleProps extends TouchableOpacityProps {
  position?: "left" | "right";
}

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  padding: 0 15px;
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

export const RoomIDContainer = styled.View`
  position: absolute;
  bottom: 5%;
  right: 40%;
  left: 40%;
  border-width: 2px;
  border-color: ${(props) => props.theme.colors.header};
  border-radius: 20px;
`;

export const RoomIDWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-self: center;
  padding: 5px 5px;
`;

export const RoomID = styled.Text`
  font-weight: bold;
  color: ${(props) => props.theme.colors.iconColor};
`;

export const Icons = styled(MaterialCommunityIcons)`
  color: ${(props) => props.theme.colors.iconColor};
`;
