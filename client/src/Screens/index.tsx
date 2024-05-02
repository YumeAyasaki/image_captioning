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
import {CameraScreen as Camera, CameraProps} from './Camera';
import {Select, SelectProps} from './Select';
import {ImageScreen as Image, ImageProps} from './Image';
import {Url, UrlProps} from './Url';
import {Database, DatabaseProps} from './Database';

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

export const CameraScreen = (props: CameraProps) => {
  const navigation = props.navigation;
  const otherProps = {...props};
  return (
    <Screen navigation={navigation} children={Camera} props={otherProps} />
  );
};

export const SelectScreen = (props: SelectProps) => {
  const navigation = props.navigation;
  const otherProps = {...props};
  return (
    <Screen navigation={navigation} children={Select} props={otherProps} />
  );
};

export const ImageScreen = (props: ImageProps) => {
  const navigation = props.navigation;
  const otherProps = {...props};
  return <Screen navigation={navigation} children={Image} props={otherProps} />;
};

export const UrlScreen = (props: UrlProps) => {
  const navigation = props.navigation;
  const otherProps = {...props};
  return <Screen navigation={navigation} children={Url} props={otherProps} />;
};

export const DatabaseScreen = (props: DatabaseProps) => {
  const navigation = props.navigation;
  const otherProps = {...props};
  return (
    <Screen navigation={navigation} children={Database} props={otherProps} />
  );
};