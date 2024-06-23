import { ThemeProvider } from "./src/theme/theme";
import { SocketProvider } from "./src/socket/socket";
import { Routes } from "./src/routes";
import { RoomProvider } from "./src/context/room";

export default function App() {
  return (
    <ThemeProvider>
      <SocketProvider>
        <RoomProvider>
          <Routes />
        </RoomProvider>
      </SocketProvider>
    </ThemeProvider>
  );
}
