import {TextStyle} from 'react-native';

// Colour theme
export const theme = {
  primary: '#FF4C29',
  secondary: '#FFD700',
  white: '#FFFFFF',
  black: '#000000',
  grey: '#D3D3D3',
  lightGrey: '#F5F5F5',
  darkGrey: '#A9A9A9',
  red: '#FF0000',
  green: '#008000',
  blue: '#0000FF',
};

export const TextStl = {
  base: {
    color: theme.black,
    fontSize: 16,
    textAlign: 'center',
  },
  hyperlink: {
    color: theme.primary,
    fontSize: 16,
    textAlign: 'center',
  },
};

export const ButtonStl = {
  container: {
    backgroundColor: theme.primary,
    marginVertical: 15,
    marginHorizontal: 30,
    borderRadius: 5,
    paddingVertical: 15,
  },
  text: {
    color: theme.white,
    textAlign: 'center',
  } as TextStyle,
};
