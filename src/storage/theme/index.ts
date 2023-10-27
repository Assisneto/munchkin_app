import { saveToLocalStorage, loadFromLocalStorage } from "../localStorage";
import { ThemeType } from "../../theme/theme";

export async function saveTheme(theme: ThemeType) {
  await saveToLocalStorage<ThemeType>("theme", theme);
}

export async function loadTheme(): Promise<ThemeType | null> {
  return await loadFromLocalStorage<ThemeType>("theme");
}
