import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  CameraScreen,
  SelectScreen,
  ImageScreen,
  UrlScreen,
} from '../Screens';
import {RootStackParamList} from '../Constants/ScreenTypes';

const Stack = createStackNavigator<RootStackParamList>();

const options = {headerShown: false};

export default function Screen() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={options} />
      <Stack.Screen name="Login" component={LoginScreen} options={options} />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={options}
      />
      <Stack.Screen name="Camera" component={CameraScreen} options={options} />
      <Stack.Screen name="Select" component={SelectScreen} options={options} />
      <Stack.Screen name="Image" component={ImageScreen} options={options} />
      <Stack.Screen name="Url" component={UrlScreen} options={options} />
    </Stack.Navigator>
  );
}
