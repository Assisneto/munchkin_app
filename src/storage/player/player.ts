import { saveToLocalStorage, loadFromLocalStorage } from "./../localStorage";

type playerType = {
  name: string;
  gender: string;
  power: number;
  level: number;
};

async function savePlayer(player: playerType) {
  const players = await getPlayers();

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
  const players = await getPlayers();

  const updatedPlayers = players.map((player) =>
    player.name === updatedPlayer.name ? updatedPlayer : player
  );

  await saveToLocalStorage("player", updatedPlayers);
}

export { savePlayer, getPlayers, deletePlayerByName, editPlayer, playerType };
