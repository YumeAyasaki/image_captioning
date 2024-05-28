import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  CameraScreen,
  SelectScreen,
  CaptioningScreen,
  UrlScreen,
  DatabaseScreen,
  StoreScreen,
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
      <Stack.Screen
        name="Captioning"
        component={CaptioningScreen}
        options={options}
      />
      <Stack.Screen name="Store" component={StoreScreen} options={options} />
      <Stack.Screen name="Url" component={UrlScreen} options={options} />
      <Stack.Screen
        name="Database"
        component={DatabaseScreen}
        options={options}
      />
    </Stack.Navigator>
  );
}
