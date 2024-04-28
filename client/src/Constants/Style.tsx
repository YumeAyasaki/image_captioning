import {TextStyle} from 'react-native';

const em = 16;

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
    fontSize: em,
    textAlign: 'center',
  } as TextStyle,
  hyperlink: {
    color: theme.primary,
    fontSize: em,
    textAlign: 'center',
  } as TextStyle,
  h1: {
    color: theme.black,
    fontSize: 2 * em,
    marginVertical: em * 0.5,
    marginHorizontal: 0,
    fontWeight: 'bold',
    textAlign: 'center',
  } as TextStyle,
  h2: {
    color: theme.black,
    fontSize: 1.5 * em,
    marginVertical: em * 0.5,
    marginHorizontal: 0,
    fontWeight: 'bold',
    textAlign: 'center',
  } as TextStyle,
};

export const ButtonStl = {
  container: {
    backgroundColor: theme.primary,
    marginVertical: 5,
    marginHorizontal: 30,
    borderRadius: 5,
    paddingVertical: 10,
  },
  text: [
    TextStl.base,
    {
      color: theme.white,
      textAlign: 'center',
    },
  ] as TextStyle,
};

export const InputStl = {
  container: {
    backgroundColor: theme.lightGrey,
    marginVertical: 5,
    marginHorizontal: 30,
    borderRadius: 5,
    paddingVertical: 10,
  },
  text: [
    TextStl.base,
    {
      color: theme.black,
      textAlign: 'center',
    },
  ] as TextStyle,
};
