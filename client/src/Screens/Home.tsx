import * as React from 'react';
import {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../Constants/ScreenTypes';
import {TextStl} from '../Constants/Style';
import Button from '../Components/Button';
import {useUser} from '../Hooks/user';
import {removeUser, removeToken, getToken} from '../Utils/user';
import UserAPI from '../Services/userAPI';
import UploadMethodModal from '../Components/UploadMethod';

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
  const {user} = useUser();
  const [onStore, setOnStore] = useState<Boolean>(false);
  const [onCaptioning, setOnCaptioning] = useState<Boolean>(false);
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
        <Text style={TextStl.h1}>Chú thích hình ảnh</Text>
      </View>
      <View style={styles.contentContainer}>
        <View>
          <Button
            onPress={() => setOnCaptioning(true)}
            text={'Chú thích hình ảnh'}
          />
          <Button
            text="Xem ảnh trong dữ liệu"
            onPress={() => navigation.navigate('Database')}
          />
          {user !== null && (
            <View>
              <Button onPress={() => setOnStore(true)} text="Lưu ảnh" />
              <Text style={styles.welcomeText}>Chào mừng {user.username}.</Text>
              <Button text="Đăng xuất" onPress={handleLogout} />
            </View>
          )}
        </View>
      </View>
      {onStore && (
        <UploadMethodModal
          navigation={navigation}
          to="Store"
          useStateThing={setOnStore}
        />
      )}
      {onCaptioning && (
        <UploadMethodModal
          navigation={navigation}
          to="Captioning"
          useStateThing={setOnCaptioning}
        />
      )}
    </View>
  );
}

export type HomeProps = Props;
