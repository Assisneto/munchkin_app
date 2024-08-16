import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BaseHeader } from "../../../../components/baseHeader";
import { Icons, Options } from "./styles";

export const Header = ({ savePlayer }: { savePlayer: () => Promise<void> }) => {
  const navigation = useNavigation();

  return (
    <BaseHeader
      title="Novo Munchkin"
      leftIconName="chevron-left"
      onLeftIconPress={navigation.goBack}
      additionalRightIcons={
        <Options>
          <TouchableOpacity onPress={savePlayer} testID="savePlayerButton">
            <Icons name="check" size={30} testID="save-button" />
          </TouchableOpacity>
        </Options>
      }
    />
  );
};
