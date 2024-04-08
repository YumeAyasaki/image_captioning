import * as React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {Icon} from '@rneui/themed';

const styles = StyleSheet.create({
  navBarContainer: {
    top: 0,
    left: 0,
    width: '100%',
    height: 40,
    backgroundColor: '#0E64D2',
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 5,
  },
});

type Props = {
  navigation: any;
};

const NavBar = ({navigation}: Props) => {
  return (
    <View style={styles.navBarContainer}>
      <Pressable onPress={() => navigation.navigate('Home')}>
        <Icon name="home" type="ionicon" />
      </Pressable>
      {/* Setting, TODO */}
      <Pressable>
        <Icon name="settings" type="ionicon" />
      </Pressable>
    </View>
  );
};

export default NavBar;
