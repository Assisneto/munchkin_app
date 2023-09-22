import React, { createContext, useState } from "react";

export enum SocketType {
  HOST = "host",
  CLIENT = "client",
}

export const SocketContext = createContext({
  socketState: SocketType.CLIENT,
  setSocketState: (value: SocketType) => {},
});

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socketState, setSocketState] = useState(SocketType.CLIENT);

  const toggleSocketState = (value: SocketType) => {
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
