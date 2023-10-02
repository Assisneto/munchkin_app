import { SocketType } from "../storage/socket";

type ExecuteFunction = () => void;

export const executeBySocketType = (
  socketType: SocketType,
  targetSocketType: SocketType,
  executeFn: ExecuteFunction
) => {
  if (socketType === targetSocketType) {
    executeFn();
  }
};
