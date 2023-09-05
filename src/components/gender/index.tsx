import React from "react";

import { Icons } from "./styles";
import { StyleProp, TextStyle, ViewStyle } from "react-native";

type Props = {
  gender: string;
  style?: StyleProp<ViewStyle | TextStyle>;
  size?: number;
};

export const Gender = ({ gender, style, size }: Props) => {
  const iconSize = size ? size : 18;
  if (gender === "male")
    return <Icons name="gender-male" size={iconSize} style={style} />;
  return <Icons name="gender-female" size={iconSize} style={style} />;
};
