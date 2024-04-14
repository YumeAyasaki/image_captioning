import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Config from 'react-native-config';

import {RootStackParamList} from '../Constants/ScreenTypes';
import {TextStl} from '../Constants/Style';
import Button from '../Components/Button';

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
});

export function Home({navigation}: Props) {
  console.log(Config.BACKEND_URL);
  return (
    <View style={styles.container}>
      {/* Title app */}
      <View style={styles.titleContainer}>
        <Text style={TextStl.h1}>Image captioning</Text>
      </View>
      <View style={styles.contentContainer}>
        <View>
          <Button
            onPress={() => navigation.navigate('Login')}
            text={'Đăng nhập'}
          />
          <Button
            onPress={() => navigation.navigate('Register')}
            text={'Đăng ký'}
          />
        </View>
      </View>
    </View>
  );
}

export type HomeProps = Props;
