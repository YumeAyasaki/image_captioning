import * as React from 'react';
import {Pressable, Text, ViewStyle} from 'react-native';

import {ButtonStl} from '../Constants/Style';

type Props = {
  text?: string;
  onPress?: any;
  style?: ViewStyle;
};

const Button = ({text, onPress, style}: Props) => {
  return (
    <Pressable style={[ButtonStl.container, style]} onPress={onPress}>
      <Text style={ButtonStl.text}>{text}</Text>
    </Pressable>
  );
};

export default Button;
