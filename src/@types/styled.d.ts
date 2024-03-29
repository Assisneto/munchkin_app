import "styled-components/native";

declare module "styled-components/native" {
  export interface DefaultTheme {
    colors: {
      background: string;
      text: string;
      headerText: string;
      header: string;
      iconColor: string;
    };
  }
}
