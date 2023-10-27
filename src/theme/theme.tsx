import React, { createContext, useEffect, useState } from "react";
import { ThemeProvider as ThemeProviderStyled } from "styled-components/native";
import { darkTheme } from "./darkTheme";
import { lightTheme } from "./lightTheme";
import { defaultTheme } from "./defaultTheme";
import { loadTheme, saveTheme } from "../storage/theme";

export enum ThemeType {
  light = "light",
  dark = "dark",
  default = "default"
}

export const themes = {
  dark: darkTheme,
  light: lightTheme,
  default: defaultTheme
};

export const ThemeContext = createContext({
  theme: ThemeType.default,
  setSpecificTheme: (theme: ThemeType) => {}
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [theme, setTheme] = useState<ThemeType>(ThemeType.default);

  useEffect(() => {
    async function loadThemeOfStorage() {
      const storedTheme = await loadTheme();
      if (storedTheme) {
        setTheme(storedTheme);
      }
    }
    loadThemeOfStorage();
  }, []);

  const setSpecificTheme = (selectedTheme: ThemeType) => {
    setTheme(selectedTheme);
    saveTheme(selectedTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setSpecificTheme }}>
      <ThemeProviderStyled theme={themes[theme]}>
        {children}
      </ThemeProviderStyled>
    </ThemeContext.Provider>
  );
};
