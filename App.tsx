import { Home } from "./src/screen/home";
import { ThemeProvider } from "./src/theme/theme";
import { Routes } from "./src/routes";
export default function App() {
  return (
    <ThemeProvider>
      <Routes />
    </ThemeProvider>
  );
}
