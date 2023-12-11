import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { Channel, Socket } from "phoenix";
import { getRoomID } from "../storage/room";
import { useNetInfo } from "@react-native-community/netinfo";
import { AppState, AppStateStatus, Platform } from "react-native";
import { throttle } from "lodash";

interface SocketContextType {
  socket: Socket | null;
  channel: Channel | null;
  setRoomID: (newRoomID: string | null) => void;
  roomID: string | null;
}

export const SocketContext = createContext<SocketContextType>({
  socket: null,
  channel: null,
  setRoomID: () => {},
  roomID: null
});

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const socketRef = useRef<Socket | null>(null);
  const channelRef = useRef<Channel | null>(null);
  const [_, setRender] = useState(false);
  const [roomID, setRoomIDState] = useState<string | null>(null);
  const { isConnected } = useNetInfo();
  const [rerender, setRerender] = useState(false);

  const setRoomID = (newRoomID: string | null) => {
    setRoomIDState(newRoomID);
  };

  const handlerAppState = (state: AppStateStatus) => {
    console.log(state);

    if (state === "active") {
      setRerender(!rerender);
    }
  };

  useEffect(() => {
    if (isConnected === true) setRerender(!rerender);
  }, [isConnected]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", handlerAppState);
    return () => {
      subscription.remove();
    };
  }, [handlerAppState]);

  useEffect(() => {
    const fetchRoomID = async () => {
      const id = await getRoomID();
      setRoomIDState(id);
    };

    fetchRoomID();
  }, []);

  useEffect(() => {
    if (roomID === null) {
      return;
    }
    const ws = new Socket(
      `ws://${process.env.EXPO_PUBLIC_SOCKET_URL}/socket` || "",
      {}
    );

    ws.onOpen(() => console.warn("Connected."));
    ws.onError((event) => console.log("Cannot connect.", event));
    ws.onClose((event) => console.warn("Goodbye.", event, Platform.OS));
    ws.connect();
    socketRef.current = ws;

    const ch = ws.channel(`room:${roomID}`, {});

    ch.join()
      .receive("ok", (resp) => {
        console.log("Joined successfully", resp);
      })
      .receive("error", (resp) => {
        console.log("Unable to join", resp);
      });

    channelRef.current = ch;

    setRender((prevState) => !prevState);

    return () => {
      ch.leave();
      if (ws) {
        ws.disconnect();
      }
    };
  }, [roomID, rerender]);

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        channel: channelRef.current,
        setRoomID,
        roomID
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
