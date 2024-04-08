import * as React from 'react';
import {View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../Constants/ScreenTypes';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function Login({navigation}: Props) {
  console.log(navigation);
  return <View />;
}

export type LoginProps = Props;
