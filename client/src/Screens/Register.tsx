import * as React from 'react';
import {View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../Constants/ScreenTypes';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export function Register({navigation}: Props) {
  console.log(navigation);
  return <View />;
}

export type RegisterProps = Props;
