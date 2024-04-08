import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../Constants/ScreenTypes';
import Button from '../Components/Button';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 20,
    color: '#000000',
  },
});

export function Home({navigation}: Props) {
  return (
    <View style={styles.container}>
      {/* Title app */}
      <View>
        <Text>Image captioning</Text>
      </View>

      <View style={styles.contentContainer}>
        <View>
          <Button
            text="Đăng nhập"
            onPress={() => navigation.navigate('Login')}
          />
          <Button
            text="Đăng ký"
            onPress={() => navigation.navigate('Register')}
          />
        </View>
      </View>
    </View>
  );
}

export type HomeProps = Props;
