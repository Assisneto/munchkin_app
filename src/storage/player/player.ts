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

export { savePlayer, getPlayers, playerType };
