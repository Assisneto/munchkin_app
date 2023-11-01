import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
  removeFromLocalStorage
} from "../localStorage";

async function generateID(): Promise<string> {
  return uuidv4().slice(0, 5);
}

async function saveRoomID(id: string | null): Promise<void> {
  await saveToLocalStorage("roomID", id);
}

async function getRoomID(): Promise<string | null> {
  let roomID = await loadFromLocalStorage<string>("roomID");

  return roomID;
}

async function createRoomID(): Promise<string> {
  const roomID = await generateID();
  await saveRoomID(roomID);
  return roomID;
}

async function deleteRoomID(): Promise<void> {
  await removeFromLocalStorage("roomID");
}

export { getRoomID, deleteRoomID, saveRoomID, createRoomID };
