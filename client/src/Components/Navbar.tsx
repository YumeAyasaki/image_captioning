import * as React from 'react';
import {useState} from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';

import {useUser} from '../Hooks/user';
import {theme} from '../Constants/Style';
import UploadMethodModal from './UploadMethod';

const styles = StyleSheet.create({
  navBarContainer: {
    top: 0,
    left: 0,
    width: '100%',
    height: 40,
    backgroundColor: '#0E64D2',
    paddingHorizontal: 5,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navBarComponent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  randomPadding: {
    paddingHorizontal: 5,
  },
  text: {
    borderRadius: 5,
    backgroundColor: theme.primary,
    color: '#fff',
    padding: 5,
  },
});

type Props = {
  navigation: any;
};

const NavBar = ({navigation}: Props) => {
  const {user} = useUser();
  const [onStore, setOnStore] = useState<Boolean>(false);
  const [onCaptioning, setOnCaptioning] = useState<Boolean>(false);
  return (
    <View style={styles.navBarContainer}>
      <View style={styles.navBarComponent}>
        {/* Home */}
        <Pressable
          onPress={() => navigation.navigate('Home')}
          style={styles.randomPadding}>
          <Icons name="home" size={30} color="white" />
        </Pressable>
        {/* Captioning */}
        <Pressable
          onPress={() => setOnCaptioning(true)}
          style={styles.randomPadding}>
          <Icons name="image" size={30} color="white" />
        </Pressable>
        {user != null && (
          <Pressable
            onPress={() => setOnStore(true)}
            style={styles.randomPadding}>
            <Icons name="cloud-upload" size={30} color="white" />
          </Pressable>
        )}
        {user != null && (
          <Pressable
            onPress={() => navigation.navigate('Database')}
            style={styles.randomPadding}>
            <Icons name="server" size={30} color="white" />
          </Pressable>
        )}
      </View>
      {user == null && (
        <View style={styles.navBarComponent}>
          <Pressable
            style={styles.randomPadding}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.text}>Đăng nhập</Text>
          </Pressable>
          <Pressable
            style={styles.randomPadding}
            onPress={() => navigation.navigate('Register')}>
            <Text style={styles.text}>Đăng ký</Text>
          </Pressable>
        </View>
      )}
      {user != null && (
        <View style={styles.navBarComponent}>
          <Pressable style={styles.randomPadding}>
            <Text style={styles.text}>{user.username}</Text>
          </Pressable>
        </View>
      )}
      {onStore && (
        <UploadMethodModal
          navigation={navigation}
          to="Store"
          onClose={() => setOnStore(false)}
        />
      )}
      {onCaptioning && (
        <UploadMethodModal
          navigation={navigation}
          to="Captioning"
          onClose={() => setOnCaptioning(false)}
        />
      )}
    </View>
  );
};

export default NavBar;
