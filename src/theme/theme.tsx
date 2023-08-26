import React, { createContext, useState } from "react";
import { ThemeProvider as ThemeProviderStyled } from 'styled-components/native';
import { darkTheme } from "./darkTheme";
import { lightTheme } from "./lightTheme";

export enum ThemeType {
  light = `light`,
  dark = 'dark'
}

const themes = {
  dark: darkTheme,
  light: lightTheme
}

export const ThemeContext = createContext({
  theme: ThemeType.light,
  toggleTheme: () => { }
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [theme, setTheme] = useState(ThemeType.dark)

  const toggleTheme = () => {
    if (theme === ThemeType.light) {
      return setTheme(ThemeType.dark)
    }
    return setTheme(ThemeType.light)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProviderStyled theme={themes[theme]}>
        {children}
      </ThemeProviderStyled>
    </ThemeContext.Provider>
  )
}
