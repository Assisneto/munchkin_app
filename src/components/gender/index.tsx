import React from "react";

import { Icons } from "./styles";

type Props = {
  gender: string;
};

export const Gender = ({ gender }: Props) => {
  if (gender === "male") return <Icons name="gender-male" size={18} />;
  return <Icons name="gender-female" size={18} />;
};
