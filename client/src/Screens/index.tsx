import * as React from 'react';
import {StyleSheet, View} from 'react-native';

import NavBar from '../Components/Navbar';

type Props = {
  navigation: any;
  children: React.ComponentType<any>;
  props: any;
};

// Temp styling
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
});

const Screen = ({navigation, children, props}: Props) => {
  return (
    <View style={styles.container}>
      {/* Pass the navigation and other props to the children */}
      <NavBar navigation={navigation} />
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
