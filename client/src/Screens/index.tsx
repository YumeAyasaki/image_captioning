import * as React from 'react';
import {View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../Constants/ScreenTypes';

type Props = {
  navigation: NativeStackScreenProps<RootStackParamList, 'Home'>;
  children: React.ReactNode;
};

const Screen = ({navigation, children}: Props) => {
  return (
    <View style={{display: 'flex', flex: 1}}>
      {React.cloneElement(children as React.ReactElement, {navigation})}
    </View>
  );
};

import Home from './Home';
import Login from './Login';
import Register from './Register';

export const HomeScreen = (props: any) =>
  Screen({...props, children: Home(props)});
export const LoginScreen = (props: any) =>
  Screen({...props, children: Login(props)});
export const RegisterScreen = (props: any) =>
  Screen({...props, children: Register(props)});
