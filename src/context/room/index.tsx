import React, { createContext, useContext, useEffect, useState } from "react";
import { SocketContext } from "../../socket/socket";
import {
  deletePlayerByName,
  editPlayer,
  getPlayers,
  playerType,
  savePlayer,
  savePlayers
} from "../../storage/player";

interface RoomContextType {
  players: playerType[];
  savePlayer: (player: playerType) => void;
}

export const RoomContext = createContext<RoomContextType>({
  players: [],
  savePlayer: () => {}
});

export const RoomProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const { channel } = useContext(SocketContext);
  const [players, setPlayers] = useState<playerType[]>([]);

  const fetchPlayers = async () => {
    const players = await getPlayers();
    setPlayers(players);
  };

  const savePlayerAndUpdate = async (player: playerType) => {
    try {
      await savePlayer(player);
      await fetchPlayers();
    } catch (error) {
      console.error("Error saving player:", error);
    }
  };

  const handleCreatePlayer = async (player: playerType) => {
    await savePlayerAndUpdate(player);
  };

  const handleEditPlayer = async (editedPlayer: playerType) => {
    await editPlayer(editedPlayer);
    await fetchPlayers();
  };

  const handleDeletePlayer = async (name: string) => {
    await deletePlayerByName(name);
    await fetchPlayers();
  };
  const onCreatePlayers = async ({ players }: { players: playerType[] }) => {
    await savePlayerAndUpdates(players);
  };

  const savePlayerAndUpdates = async (players: playerType[]) => {
    try {
      await savePlayers(players);
      await fetchPlayers();
    } catch (error) {
      console.error("Error saving player:", error);
    }
  };
  const onDeletedPlayer = async ({
    name: deletedPlayerName
  }: {
    name: string;
  }) => {
    await handleDeletePlayer(deletedPlayerName);
  };

  useEffect(() => {
    channel?.on("create_player", handleCreatePlayer);
    channel?.on("edited_player", handleEditPlayer);
    channel?.on("deleted_player", onDeletedPlayer);
    channel?.on("synchronize", onCreatePlayers);

    return () => {
      channel?.off("create_player");
      channel?.off("edited_player");
      channel?.off("deleted_player");
      channel?.off("synchronize");
    };
  }, [channel]);

  useEffect(() => {
    (async () => {
      await fetchPlayers();
    })();
  }, []);

  return (
    <RoomContext.Provider value={{ players, savePlayer: savePlayerAndUpdate }}>
      {children}
    </RoomContext.Provider>
  );
};
