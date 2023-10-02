import { saveToLocalStorage, loadFromLocalStorage } from "./localStorage";

type playerType = {
  name: string;
  gender: string;
  power: number;
  level: number;
};

async function validatePlayers(newPlayers: playerType[]) {
  const players = await getPlayers();

  for (let newPlayer of newPlayers) {
    if (!newPlayer.name.trim()) {
      throw new Error("O nome do jogador não pode ser vazio!");
    }

    if (
      players.some((existingPlayer) => existingPlayer.name === newPlayer.name)
    ) {
      throw new Error(`Um jogador com o nome ${newPlayer.name} já existe!`);
    }
  }
}

async function savePlayer(player: playerType) {
  await validatePlayers([player]);
  await saveToLocalStorage("player", [...(await getPlayers()), player]);
}

async function savePlayers(newPlayers: playerType[]) {
  await validatePlayers(newPlayers);
  await saveToLocalStorage("player", [...(await getPlayers()), ...newPlayers]);
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
