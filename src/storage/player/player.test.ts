import {
  savePlayer,
  getPlayers,
  deletePlayerByName,
  editPlayer,
  savePlayers
} from ".";

import { saveToLocalStorage, loadFromLocalStorage } from "../localStorage";

jest.mock("../localStorage");

describe("Player utility functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should validate player name and throw error if empty", async () => {
    await expect(
      savePlayer({
        name: "",
        gender: "male",
        power: 10,
        level: 1
      })
    ).rejects.toThrow("O nome do jogador não pode ser vazio!");
  });

  it("should not save duplicate players", async () => {
    (loadFromLocalStorage as jest.Mock).mockResolvedValue([
      {
        name: "John",
        gender: "male",
        power: 10,
        level: 1
      }
    ]);

    await expect(
      savePlayer({
        name: "John",
        gender: "male",
        power: 20,
        level: 2
      })
    ).rejects.toThrow("Um jogador com o nome John já existe!");
  });

  it("should save a new player", async () => {
    (loadFromLocalStorage as jest.Mock).mockResolvedValue([]);
    await savePlayer({
      name: "John",
      gender: "male",
      power: 10,
      level: 1
    });
    expect(saveToLocalStorage).toHaveBeenCalledWith("player", [
      {
        name: "John",
        gender: "male",
        power: 10,
        level: 1
      }
    ]);
  });

  it("should retrieve all players", async () => {
    (loadFromLocalStorage as jest.Mock).mockResolvedValue([
      {
        name: "John",
        gender: "male",
        power: 10,
        level: 1
      }
    ]);
    const players = await getPlayers();
    expect(players).toEqual([
      {
        name: "John",
        gender: "male",
        power: 10,
        level: 1
      }
    ]);
  });

  it("should delete a player by name if they exist", async () => {
    (loadFromLocalStorage as jest.Mock).mockResolvedValue([
      { name: "John", gender: "male", power: 10, level: 1 },
      { name: "Jane", gender: "female", power: 20, level: 2 }
    ]);

    await deletePlayerByName("John");

    expect(saveToLocalStorage).toHaveBeenCalledWith("player", [
      { name: "Jane", gender: "female", power: 20, level: 2 }
    ]);
  });

  it("should not change the list of players if the specified name is not found", async () => {
    (loadFromLocalStorage as jest.Mock).mockResolvedValue([
      { name: "Jane", gender: "female", power: 20, level: 2 }
    ]);

    await deletePlayerByName("John");

    expect(saveToLocalStorage).toHaveBeenCalledWith("player", [
      { name: "Jane", gender: "female", power: 20, level: 2 }
    ]);
  });

  it("should edit an existing player", async () => {
    (loadFromLocalStorage as jest.Mock).mockResolvedValue([
      { name: "John", gender: "male", power: 10, level: 1 }
    ]);

    await editPlayer({
      name: "John",
      gender: "male",
      power: 20,
      level: 2
    });

    expect(saveToLocalStorage).toHaveBeenCalledWith("player", [
      { name: "John", gender: "male", power: 20, level: 2 }
    ]);
  });

  it("should throw an error if player's level is less than 1", async () => {
    await expect(
      editPlayer({
        name: "John",
        gender: "male",
        power: 10,
        level: 0
      })
    ).rejects.toThrow("O nível do jogador não pode ser menor do que 1!");
  });

  it("should throw an error if player's power is less than 0", async () => {
    await expect(
      editPlayer({
        name: "John",
        gender: "male",
        power: -1,
        level: 1
      })
    ).rejects.toThrow("O nível do jogador não pode ser menor do que 1!"); // You might want to correct the error message in your actual function.
  });

  it("should not change players if the name of the player to be edited is not found", async () => {
    (loadFromLocalStorage as jest.Mock).mockResolvedValue([
      { name: "Jane", gender: "female", power: 15, level: 2 }
    ]);

    await editPlayer({
      name: "John",
      gender: "male",
      power: 20,
      level: 2
    });

    expect(saveToLocalStorage).toHaveBeenCalledWith("player", [
      { name: "Jane", gender: "female", power: 15, level: 2 }
    ]);
  });

  it("should save multiple players", async () => {
    const newPlayers = [
      { name: "John", gender: "male", power: 10, level: 1 },
      { name: "Jane", gender: "female", power: 20, level: 2 }
    ];

    await savePlayers(newPlayers);

    expect(saveToLocalStorage).toHaveBeenCalledWith("player", newPlayers);
  });

  it("should overwrite existing players", async () => {
    (loadFromLocalStorage as jest.Mock).mockResolvedValue([
      { name: "Doe", gender: "male", power: 5, level: 1 }
    ]);

    const newPlayers = [
      { name: "John", gender: "male", power: 10, level: 1 },
      { name: "Jane", gender: "female", power: 20, level: 2 }
    ];

    await savePlayers(newPlayers);

    expect(saveToLocalStorage).toHaveBeenCalledWith("player", newPlayers);
  });

  it("should clear all players if given an empty array", async () => {
    await savePlayers([]);

    expect(saveToLocalStorage).toHaveBeenCalledWith("player", []);
  });
});
