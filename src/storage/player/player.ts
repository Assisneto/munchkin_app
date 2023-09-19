import { saveToLocalStorage, loadFromLocalStorage } from "./../localStorage";

type playerType = {
  name: string;
  gender: string;
  power: number;
  level: number;
};

async function savePlayer(player: playerType) {
  const players = await getPlayers();
  if (!player.name.trim()) {
    throw new Error("O nome do jogador não pode ser vazio!");
  }

  if (players.some((existingPlayer) => existingPlayer.name === player.name)) {
    throw new Error("Um jogador com esse nome já existe!");
  }

  await saveToLocalStorage("player", [...players, player]);
}

async function getPlayers(): Promise<playerType[]> {
  return await loadFromLocalStorage("player");
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
  if (updatedPlayer.power < 1) {
    throw new Error("O nível do jogador não pode ser menor do que 1!");
  }

  const players = await getPlayers();

  const updatedPlayers = players.map((player) =>
    player.name === updatedPlayer.name ? updatedPlayer : player
  );

  await saveToLocalStorage("player", updatedPlayers);
}

export { savePlayer, getPlayers, deletePlayerByName, editPlayer, playerType };
