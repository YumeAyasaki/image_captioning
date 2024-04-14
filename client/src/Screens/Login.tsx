import * as React from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../Constants/ScreenTypes';
import Button from '../Components/Button';
import {TextStl, InputStl, theme} from '../Constants/Style';

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
    username: React.createRef<TextInput>(),
    password: React.createRef<TextInput>(),
  };
  console.log(navigation);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={TextStl.h1}>Đăng nhập</Text>
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
        <Button text={'Đăng nhập'} />
      </View>
    </View>
  );
}

export type LoginProps = Props;
