import * as React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

const styles = StyleSheet.create({
  navBarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    width: '100%',
    height: 100,
    backgroundColor: '#0E64D2',
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 5,
    justifyContent: 'space-between',
  },
});

const NavBar = ({navigation}) => {
  return (
    <View style={styles.navBarContainer}>
      <Pressable
        onPress={() => navigation.navigate('Home')}
        accessibilityLabel="Trang chủ">
        <Ionicons name="home" size={35} color="white" />
      </Pressable>
      {/* Setting, TODO */}
      <Pressable accessibilityLabel="Cài đặt">
        <Ionicons name="settings" size={35} color="white" />
      </Pressable>
    </View>
  );
};

export default NavBar;
