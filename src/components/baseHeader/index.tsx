import React from "react";
import { TouchableOpacity } from "react-native";
import { Container, Icons, AlignWrapper, Title } from "./styles";
import { OfflineNotice } from "../offlineNotice";
import type { MaterialCommunityIcons as IconSet } from "@expo/vector-icons";

type IconNameType = keyof typeof IconSet.glyphMap;

export interface BaseHeaderProps {
  title?: string;
  leftIconName?: IconNameType;
  onLeftIconPress?: () => void;
  rightIconName?: IconNameType;
  onRightIconPress?: () => void;
  additionalRightIcons?: React.ReactNode;
  children?: React.ReactNode;
}

export const BaseHeader = ({
  title,
  leftIconName,
  onLeftIconPress,
  rightIconName,
  onRightIconPress,
  additionalRightIcons,
  children
}: BaseHeaderProps) => {
  return (
    <>
      <Container>
        <AlignWrapper>
          {leftIconName && (
            <Icons name={leftIconName} size={34} onPress={onLeftIconPress} />
          )}
          {title && <Title>{title}</Title>}
        </AlignWrapper>

        {children}
        {rightIconName && (
          <TouchableOpacity onPress={onRightIconPress}>
            <Icons name={rightIconName} size={26} />
          </TouchableOpacity>
        )}
        {additionalRightIcons}
      </Container>
      <OfflineNotice />
    </>
  );
};
