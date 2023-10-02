import React from "react";

import { Icons } from "./styles";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
type Props = {
  gender: string;
  style?: StyleProp<ViewStyle | TextStyle>;
  size?: number;
};

export const Gender: React.FC<Props> = ({ gender, style, size }) => {
  const iconSize = size ? size : 18;

  if (gender === "male")
    return (
      <Icons
        testID="gender-male-icon"
        name="gender-male"
        size={iconSize}
        style={style}
      />
    );
  return (
    <Icons
      testID="gender-female-icon"
      name="gender-female"
      size={iconSize}
      style={style}
    />
  );
};
