import * as React from 'react';
import {StyleSheet, View, TextInput, Text, Alert} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {RootStackParamList} from '../Constants/ScreenTypes';
import Button from '../Components/Button';
import {TextStl, InputStl, theme} from '../Constants/Style';
import UserAPI from '../Services/userAPI';
import {getUser} from '../Utils/user';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

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
  formContainer: {
    flex: 1,
    marginTop: 75,
  },
});

export function Login({navigation}: Props) {
  var formData = {
    username: '',
    password: '',
  };

  const handleLogin = async () => {
    let res = null;
    try {
      res = await UserAPI.login(formData);
    } catch (err) {
      console.log(err);
      if (typeof err === 'string') {
        Alert.alert('Đăng nhập thất bại', err);
      } else {
        Alert.alert('Đăng nhập thất bại');
      }
      console.log(err);
      return;
    }

    try {
      await AsyncStorage.setItem('token', res.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(res.data.user));

      const user = await getUser();

      Alert.alert('Đăng nhập thành công', 'Xin chào ' + user.username + '.', [
        {
          text: 'OK',
          onPress: () => navigation.replace('Home'),
        },
      ]);
    } catch (err) {
      console.log(err);
      Alert.alert('Đăng nhập thất bại');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={TextStl.h1}>Đăng nhập</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={[InputStl.container, TextStl.base]}
          placeholderTextColor={theme.darkGrey}
          placeholder="Tài khoản"
          onChangeText={text => {
            formData.username = text;
          }}
        />
        <TextInput
          style={[InputStl.container, TextStl.base]}
          placeholderTextColor={theme.darkGrey}
          placeholder="Mật khẩu"
          secureTextEntry={true}
          onChangeText={text => {
            formData.password = text;
          }}
        />
        <Button text={'Đăng nhập'} onPress={() => handleLogin()} />
      </View>
    </View>
  );
}

export type LoginProps = Props;
