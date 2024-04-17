import * as React from 'react';
import {Modal, View, StyleSheet, TextStyle} from 'react-native';

import {TextStl} from '../Constants/Style';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  content: {
    backgroundColor: 'white',
    width: '100%',
    padding: 20,
    borderRadius: 10,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  textResult: [
    TextStl.base,
    {
      color: '#000000',
    },
  ] as TextStyle,
});

type Props = {
  children: React.ReactNode;
};

const BlackBackgroundModal = ({children}: Props) => {
  return (
    <Modal transparent={true}>
      <View style={styles.container}>
        <View style={styles.content}>{children}</View>
      </View>
    </Modal>
  );
};

export default BlackBackgroundModal;
