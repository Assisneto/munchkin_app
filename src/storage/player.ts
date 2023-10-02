import { saveToLocalStorage, loadFromLocalStorage } from "./localStorage";

type playerType = {
  name: string;
  gender: string;
  power: number;
  level: number;
};

async function validatePlayerName(playerName: string) {
  if (!playerName.trim()) {
    throw new Error("O nome do jogador não pode ser vazio!");
  }
}

async function isPlayerDuplicate(
  newPlayer: playerType,
  existingPlayers: playerType[]
) {
  if (existingPlayers.some((player) => player.name === newPlayer.name)) {
    throw new Error(`Um jogador com o nome ${newPlayer.name} já existe!`);
  }
}

async function savePlayer(player: playerType) {
  const players = await getPlayers();
  await validatePlayerName(player.name);
  await isPlayerDuplicate(player, players); // We still want to validate duplicates for a single player
  await saveToLocalStorage("player", [...players, player]);
}

async function savePlayers(newPlayers: playerType[]) {
  await saveToLocalStorage("player", newPlayers);
}

async function getPlayers(): Promise<playerType[]> {
  return (await loadFromLocalStorage<playerType[]>("player")) || [];
}

async function deletePlayerByName(name: string) {
  const players = await getPlayers();

  const updatedPlayers = players.filter((player) => player.name !== name);

  await saveToLocalStorage("player", updatedPlayers);
}

async function editPlayer(updatedPlayer: playerType) {
  if (updatedPlayer.level < 1) {
    throw new Error("O nível do jogador não pode ser menor do que 1!");
  }
  if (updatedPlayer.power < 0) {
    throw new Error("O nível do jogador não pode ser menor do que 1!");
  }

  const players = await getPlayers();

  const updatedPlayers = players.map((player) =>
    player.name === updatedPlayer.name ? updatedPlayer : player
  );

  await saveToLocalStorage("player", updatedPlayers);
}

export {
  savePlayer,
  getPlayers,
  deletePlayerByName,
  editPlayer,
  savePlayers,
  playerType,
};
