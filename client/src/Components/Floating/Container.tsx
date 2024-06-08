import * as React from 'react';
import {StyleSheet, View} from 'react-native';

type Props = {
  children: React.ReactNode;
};

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 10,
    bottom: 10,
    right: 10,
    gap: 2,
  },
});

const FloatingContainer = ({children}: Props) => {
  return <View style={style.container}>{children}</View>;
};

export default FloatingContainer;
