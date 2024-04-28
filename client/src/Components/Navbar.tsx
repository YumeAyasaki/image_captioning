import * as React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';

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
        <Icons name="home" size={30} color="white" />
      </Pressable>
      {/* Setting, TODO */}
      <Pressable>
        <Icons name="settings" size={30} color="white" />
      </Pressable>
      {/* Camera */}
      <Pressable onPress={() => navigation.navigate('Camera')}>
        <Icons name="camera" size={30} color="white" />
      </Pressable>
      {/* Select */}
      <Pressable onPress={() => navigation.navigate('Select')}>
        <Icons name="image" size={30} color="white" />
      </Pressable>
      {/* Url */}
      <Pressable onPress={() => navigation.navigate('Url')}>
        <Icons name="globe" size={30} color="white" />
      </Pressable>
      {/* Database */}
      <Pressable onPress={() => navigation.navigate('Database')}>
        <Icons name="server" size={30} color="white" />
      </Pressable>
    </View>
  );
};

export default NavBar;
