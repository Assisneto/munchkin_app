import { saveToLocalStorage, loadFromLocalStorage } from "../localStorage";

export enum SocketType {
  HOST = "host",
  CLIENT = "client"
}

async function saveSocketType(type: SocketType) {
  await saveToLocalStorage<SocketType>("socketType", type);
}

async function getSocketType(): Promise<SocketType | null> {
  return await loadFromLocalStorage<SocketType>("socketType");
}

export { saveSocketType, getSocketType };
