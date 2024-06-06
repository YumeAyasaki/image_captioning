import * as React from 'react';
import {View, StyleSheet, TextInput, Text, Alert} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../Constants/ScreenTypes';
import {TextStl, InputStl, theme} from '../Constants/Style';
import Button from '../Components/Button';
import UserAPI from '../Services/userAPI';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

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

export function Register({navigation}: Props) {
  var formData = {
    username: '',
    password: '',
    rePassword: '',
    email: '',
  };

  const handleRegister = async () => {
    try {
      await UserAPI.register(formData);
    } catch (err) {
      console.log(err);
      if (typeof err === 'string') {
        Alert.alert('Đăng ký thất bại', err);
      } else {
        Alert.alert('Đăng ký thất bại');
      }
      console.log(err);
      return;
    }
    Alert.alert('Đăng ký thành công', 'Vui lòng đăng nhập để tiếp tục', [
      {text: 'OK', onPress: () => navigation.navigate('Login')},
    ]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={TextStl.h1}>Đăng ký</Text>
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
          onChangeText={text => {
            formData.password = text;
          }}
          secureTextEntry={true}
        />
        <TextInput
          style={[InputStl.container, TextStl.base]}
          placeholderTextColor={theme.darkGrey}
          placeholder="Nhập lại mật khẩu"
          onChangeText={text => {
            formData.rePassword = text;
          }}
          secureTextEntry={true}
        />
        <TextInput
          style={[InputStl.container, TextStl.base]}
          placeholderTextColor={theme.darkGrey}
          placeholder="Email"
          onChangeText={text => {
            formData.email = text;
          }}
        />
        <Button text={'Đăng ký'} onPress={() => handleRegister()} />
      </View>
    </View>
  );
}

export type RegisterProps = Props;
