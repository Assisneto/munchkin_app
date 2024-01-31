import React, { createContext, useEffect, useRef, useState } from "react";
import { Channel, Socket } from "phoenix";
import { getRoomID, saveRoomID } from "../storage/room";
import { useNetInfo } from "@react-native-community/netinfo";
import { Alert, AppState, AppStateStatus, Platform } from "react-native";

export enum RoomEvent {
  Enter = "enter",
  Create = "create",
  Connect = "connect"
}

interface SocketContextType {
  socket: Socket | null;
  channel: Channel | null;
  setRoomID: (newRoomID: string | null) => void;
  roomID: string | null;
  setRoomEvent: (newRoomType: RoomEvent) => void;
  roomEvent: RoomEvent;
}

export const SocketContext = createContext<SocketContextType>({
  socket: null,
  channel: null,
  setRoomID: () => {},
  roomID: null,
  setRoomEvent: () => {},
  roomEvent: RoomEvent.Connect
});

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const socketRef = useRef<Socket | null>(null);
  const channelRef = useRef<Channel | null>(null);
  const reconnectIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [_, setRender] = useState(false);
  const [roomID, setRoomIDState] = useState<string | null>(null);
  const { isConnected } = useNetInfo();
  const [rerender, setRerender] = useState(false);
  const [roomEvent, setRoomEvent] = useState<RoomEvent>(RoomEvent.Connect);

  const setRoomID = (newRoomID: string | null) => {
    setRoomIDState(newRoomID);
  };

  const handlerAppState = (state: AppStateStatus) => {
    if (state === "active") {
      setRoomEvent(RoomEvent.Connect);
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

    ws.onOpen(() => {
      console.warn("Connected.", Platform.OS);

      if (reconnectIntervalRef.current) {
        clearInterval(reconnectIntervalRef.current);
      }
    });
    ws.onError((event) => console.log("Cannot connect.", event));
    ws.onClose((event) => {
      console.warn("Goodbye.", event, Platform.OS);
      reconnectIntervalRef.current = setInterval(() => {
        setRerender(!rerender);
      }, 1000);
    });
    ws.connect();
    socketRef.current = ws;

    const ch = ws.channel(`room:${roomID}`, { roomEvent });

    ch.join()
      .receive("ok", (resp) => {
        console.log("Joined successfully", resp, Platform.OS);
      })
      .receive("error", (resp) => {
        console.log("Unable to join", resp);
        setRoomID(null);
        saveRoomID(null);
        Alert.alert(
          "Aviso",
          "Desculpe, a sala que você está tentando entrar não existe. Por favor, verifique o ID da sala e tente novamente."
        );
      });

    channelRef.current = ch;

    setRender((prevState) => !prevState);

    return () => {
      ch.leave();
      if (ws) {
        ws.disconnect();
      }
      if (reconnectIntervalRef.current) {
        clearInterval(reconnectIntervalRef.current);
      }
    };
  }, [roomID, rerender, roomEvent]);

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        channel: channelRef.current,
        setRoomID,
        roomID,
        setRoomEvent,
        roomEvent
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
