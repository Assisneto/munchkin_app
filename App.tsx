import { Home } from "./src/screen/home/home";
import { ThemeProvider } from "./src/theme/theme";
export default function App() {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
}
