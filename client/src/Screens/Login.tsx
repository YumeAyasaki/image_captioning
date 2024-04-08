import * as React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Input, Text} from '@rneui/themed';
import {Input as BaseInput, Button} from '@rneui/base';

import {RootStackParamList} from '../Constants/ScreenTypes';

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
  const formRef = {
    // https://github.com/react-native-elements/react-native-elements/issues/3202#issuecomment-1367369969
    username: React.createRef<TextInput & BaseInput>(),
    password: React.createRef<TextInput & BaseInput>(),
  };
  console.log(navigation);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text h1>Đăng nhập</Text>
      </View>
      <View style={styles.formContainer}>
        <Input ref={formRef.username} placeholder="Tài khoản" />
        <Input ref={formRef.password} placeholder="Mật khẩu" />
        <Button>Đăng nhập</Button>
      </View>
    </View>
  );
}

export type LoginProps = Props;
