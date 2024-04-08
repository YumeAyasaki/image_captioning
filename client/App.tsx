import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createTheme, ThemeProvider} from '@rneui/themed';

import Screen from './src/Layout/Screen';

export default function App() {
  const theme = createTheme({
    lightColors: {
      primary: '#007AFF',
      background: '#FFFFFF',
    },
    darkColors: {
      primary: '#0A84FF',
      background: '#000000',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Screen />
      </NavigationContainer>
    </ThemeProvider>
  );
}
