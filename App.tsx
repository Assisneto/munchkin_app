import { ThemeProvider } from "./src/theme/theme";
import { SocketProvider } from "./src/socket/socket";
import { Routes } from "./src/routes";

export default function App() {
  return (
    <ThemeProvider>
      <SocketProvider>
        <Routes />
      </SocketProvider>
    </ThemeProvider>
  );
}
