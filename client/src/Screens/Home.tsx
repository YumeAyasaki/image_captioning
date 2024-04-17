import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../Constants/ScreenTypes';
import {TextStl} from '../Constants/Style';
import Button from '../Components/Button';
import {useUser} from '../Hooks/user';
import {removeUser, removeToken, getToken} from '../Utils/user';
import UserAPI from '../Services/userAPI';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  welcomeText: {
    ...TextStl.h2,
    textAlign: 'center',
  },
});

export function Home({navigation}: Props) {
  const {status, user} = useUser();

  const handleLogout = async () => {
    removeUser();
    removeToken();
    const token = await getToken();
    if (token !== null) {
      await UserAPI.logout(token);
    }
    navigation.replace('Home');
    return;
  };
  return (
    <View style={styles.container}>
      {/* Title app */}
      <View style={styles.titleContainer}>
        <Text style={TextStl.h1}>Image captioning</Text>
      </View>
      <View style={styles.contentContainer}>
        {user === null && (
          <View>
            <Button
              onPress={() => navigation.navigate('Login')}
              text={'Đăng nhập'}
            />
            <Button
              onPress={() => navigation.navigate('Register')}
              text={'Đăng ký'}
            />
          </View>
        )}
        {user !== null && (
          <View>
            <Text style={styles.welcomeText}>Chào mừng {user.username}.</Text>
            <Button text="Đăng xuất" onPress={handleLogout} />
          </View>
        )}
      </View>
    </View>
  );
}

export type HomeProps = Props;
