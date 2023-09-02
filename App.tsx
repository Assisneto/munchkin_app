import { Home } from "./src/screen/home";
import { ThemeProvider } from "./src/theme/theme";
export default function App() {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
}
