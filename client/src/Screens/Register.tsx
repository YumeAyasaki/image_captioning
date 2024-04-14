import * as React from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../Constants/ScreenTypes';
import {TextStl, InputStl, theme} from '../Constants/Style';
import Button from '../Components/Button';

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
  console.log(navigation);
  const formRef = {
    // https://github.com/react-native-elements/react-native-elements/issues/3202#issuecomment-1367369969
    username: React.createRef<TextInput>(),
    password: React.createRef<TextInput>(),
    rePassword: React.createRef<TextInput>(),
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={TextStl.h1}>Đăng ký</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          ref={formRef.username}
          style={[InputStl.container, TextStl.base]}
          placeholderTextColor={theme.darkGrey}
          placeholder="Tài khoản"
        />
        <TextInput
          ref={formRef.password}
          style={[InputStl.container, TextStl.base]}
          placeholderTextColor={theme.darkGrey}
          placeholder="Mật khẩu"
        />
        <TextInput
          ref={formRef.rePassword}
          style={[InputStl.container, TextStl.base]}
          placeholderTextColor={theme.darkGrey}
          placeholder="Nhập lại mật khẩu"
        />
        <Button text={'Đăng ký'} />
      </View>
    </View>
  );
}

export type RegisterProps = Props;
