import * as React from 'react';
import {View, StyleSheet, TextInput, Alert} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button, Input as BaseInput} from '@rneui/base';
import {Text, Input, Image} from '@rneui/themed';

import {RootStackParamList} from '../Constants/ScreenTypes';

type Props = NativeStackScreenProps<RootStackParamList, 'Url'>;

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

export function Url({navigation}: Props) {
  console.log(navigation);
  const urlRef = React.createRef<TextInput & BaseInput>();
  let url = '';
  let imageSize = {width: 0, height: 0};

  const handleChooseImage = async () => {
    if (url !== '') {
      // Check and get image's size
      await Image.getSize(
        url,
        (width, height) => {
          imageSize = {width, height};
        },
        error => {
          Alert.alert('Error', 'Link ảnh không hợp lệ!');
          console.log(error);
        },
      );
      navigation.navigate('Image', {
        type: 'url',
        value: url,
        size: imageSize,
      });
    }
  };
  return (
    <View style={styles.container}>
      {/* Title app */}
      <View style={styles.titleContainer}>
        <Text h1>Image link</Text>
      </View>
      <View style={styles.contentContainer}>
        <View>
          <Input
            placeholder="Nhập link ảnh"
            ref={urlRef}
            onChangeText={text => {
              url = text;
            }}
          />
          <Button
            containerStyle={styles.button}
            onPress={() => handleChooseImage()}>
            Chọn ảnh
          </Button>
        </View>
      </View>
    </View>
  );
}

export type UrlProps = Props;
