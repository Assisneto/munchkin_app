import React, { createContext, useState, useEffect } from "react";
import {
  saveSocketType,
  getSocketType,
  SocketType,
} from "../storage/socket/socket";

export const SocketContext = createContext({
  socketState: SocketType.CLIENT,
  setSocketState: (value: SocketType) => {},
});

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socketState, setSocketState] = useState(SocketType.CLIENT);

  useEffect(() => {
    (async () => {
      const storedSocketType = await getSocketType();
      if (storedSocketType) {
        setSocketState(storedSocketType);
      }
    })();
  }, []);

  const toggleSocketState = async (value: SocketType) => {
    await saveSocketType(value);
    setSocketState(value);
  };

  return (
    <SocketContext.Provider
      value={{ socketState, setSocketState: toggleSocketState }}
    >
      {children}
    </SocketContext.Provider>
  );
};
