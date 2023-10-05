import { TouchableOpacity } from "react-native-gesture-handler";
import {
  SubNumber,
  ColumnContainer,
  SubTitle,
  Icons,
  IconContainer
} from "./styles";
type PointKey = "level" | "power";

const ICONSIZE = 56;

type StatAdjusterProps = {
  title: string;
  value: number;
  adjustValue: (key: PointKey, amount: number) => void;
  keyName: PointKey;
};

export const StatAdjuster = ({
  title,
  value,
  adjustValue,
  keyName
}: StatAdjusterProps) => (
  <ColumnContainer>
    <SubTitle>{title}</SubTitle>
    <SubNumber>{value}</SubNumber>
    <IconContainer>
      <TouchableOpacity onPress={() => adjustValue(keyName, -1)}>
        <Icons name="arrow-drop-down" size={ICONSIZE} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => adjustValue(keyName, 1)}>
        <Icons name="arrow-drop-up" size={ICONSIZE} />
      </TouchableOpacity>
    </IconContainer>
  </ColumnContainer>
);
