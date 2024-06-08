import * as React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';

import {theme} from '../../Constants/Style';

type Props = {
  onPress: () => void;
  iconName: string;
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: theme.primary, // Change background color as desired
    borderRadius: 50,
    padding: 10,
    height: 50,
    width: 50,
    opacity: 0.5,
  },
});

const FloatingButton = ({iconName, onPress}: Props) => {
  return (
    <Pressable style={styles.buttonContainer} onPress={onPress}>
      <Icons name={iconName} size={30} color="white" />
    </Pressable>
  );
};

export default FloatingButton;
