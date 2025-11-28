import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@clean_todo:todos';

export class LocalTodoDataSource {
  async getAll() {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return parsed;
    } catch (e) {
      console.warn('erro parse storage', e);
      return [];
    }
  }

  async saveAll(list) {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }
}
