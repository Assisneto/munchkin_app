import AsyncStorage from "@react-native-async-storage/async-storage";

const saveToLocalStorage = async <T>(key: string, data: T): Promise<void> => {
  const stringifiedData = JSON.stringify(data);
  await AsyncStorage.setItem(key, stringifiedData);
};

const loadFromLocalStorage = async <T>(key: string): Promise<T | null> => {
  const dataString = await AsyncStorage.getItem(key);
  if (!dataString) return null;
  return JSON.parse(dataString) as T;
};

export function removeFromLocalStorage(key: string): void {
  AsyncStorage.removeItem(key);
}

export { saveToLocalStorage, loadFromLocalStorage };
