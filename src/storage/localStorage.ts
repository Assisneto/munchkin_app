import AsyncStorage from "@react-native-async-storage/async-storage";

type player = {
  name: string;
  gender: string;
  power: number;
  level: number;
};

type SaveFunction = (key: string, data: object) => Promise<void>;
type LoadFunction = (key: string) => Promise<[player]>;

const saveToLocalStorage: SaveFunction = async (key, data) => {
  const stringifiedData = JSON.stringify(data);
  await AsyncStorage.setItem(key, stringifiedData);
};

const loadFromLocalStorage: LoadFunction = async (key) => {
  const dataString = (await AsyncStorage.getItem(key)) || "[]";
  return JSON.parse(dataString);
};

export { saveToLocalStorage, loadFromLocalStorage };
