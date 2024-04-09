import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button} from '@rneui/base';
import {Text} from '@rneui/themed';
import Config from 'react-native-config';

import {RootStackParamList} from '../Constants/ScreenTypes';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
});

export function Home({navigation}: Props) {
  console.log(Config.BACKEND_URL);
  return (
    <View style={styles.container}>
      {/* Title app */}
      <View style={styles.titleContainer}>
        <Text h1>Image captioning</Text>
      </View>
      <View style={styles.contentContainer}>
        <View>
          <Button
            containerStyle={styles.button}
            onPress={() => navigation.navigate('Login')}>
            Đăng nhập
          </Button>
          <Button
            containerStyle={styles.button}
            onPress={() => navigation.navigate('Register')}>
            Đăng ký
          </Button>
        </View>
      </View>
    </View>
  );
}

export type HomeProps = Props;
