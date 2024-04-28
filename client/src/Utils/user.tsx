import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUser = async () => {
  const user = await AsyncStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

export const setUser = async (user: any) => {
  await AsyncStorage.setItem('user', JSON.stringify(user));
};

export const removeUser = async () => {
  await AsyncStorage.removeItem('user');
};

export const setToken = async (token: string) => {
  await AsyncStorage.setItem('token', token);
};

export const getToken = async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    return token;
  }
  return '';
};

export const removeToken = async () => {
  await AsyncStorage.removeItem('token');
};
