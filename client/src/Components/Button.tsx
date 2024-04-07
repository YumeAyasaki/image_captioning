// Simple button component
import * as React from 'react';
import {Pressable, Text, ViewStyle} from 'react-native';

import {ButtonStl} from '../Constants/Style';

type ButtonProps = {
  text: string;
  onPress?: () => void;
  style?: ViewStyle;
};

const Button = ({text, onPress, style}: ButtonProps) => {
  return (
    <Pressable style={[ButtonStl.container, style]} onPress={onPress}>
      <Text style={ButtonStl.text}>{text}</Text>
    </Pressable>
  );
};

export default Button;
