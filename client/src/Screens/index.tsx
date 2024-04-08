import * as React from 'react';
import {View} from 'react-native';

type Props = {
  navigation: any;
  children: React.ComponentType<any>;
  props: any;
};

const Screen = ({navigation, children, props}: Props) => {
  return (
    <View style={{display: 'flex', flex: 1}}>
      {/* Pass the navigation and other props to the children */}
      {React.createElement(children, {navigation, ...props})}
    </View>
  );
};

import {Home, HomeProps} from './Home';
import {Login, LoginProps} from './Login';
import {Register, RegisterProps} from './Register';

export const HomeScreen = (props: HomeProps) => {
  const navigation = props.navigation;
  const otherProps = {...props};
  return <Screen navigation={navigation} children={Home} props={otherProps} />;
};

export const LoginScreen = (props: LoginProps) => {
  const navigation = props.navigation;
  const otherProps = {...props};
  return <Screen navigation={navigation} children={Login} props={otherProps} />;
};

export const RegisterScreen = (props: RegisterProps) => {
  const navigation = props.navigation;
  const otherProps = {...props};
  return (
    <Screen navigation={navigation} children={Register} props={otherProps} />
  );
};
