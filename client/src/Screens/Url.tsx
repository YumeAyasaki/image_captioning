import * as React from 'react';
import {View, StyleSheet, TextInput, Alert, Text, Image} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../Constants/ScreenTypes';
import Button from '../Components/Button';
import {TextStl, InputStl, theme} from '../Constants/Style';

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

export function Url({navigation, route}: Props) {
  const params = route.params;
  const urlRef = React.createRef<TextInput>();
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
          Alert.alert('Lỗi', 'Link ảnh không hợp lệ!');
          console.log(error);
        },
      );
      navigation.navigate(params.to, {
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
        <Text style={TextStl.h1}>Lấy ảnh từ đường dẫn</Text>
      </View>
      <View style={styles.contentContainer}>
        <View>
          <TextInput
            ref={urlRef}
            style={[InputStl.container, TextStl.base]}
            placeholderTextColor={theme.darkGrey}
            onChangeText={text => {
              url = text;
            }}
            placeholder="Nhập link ảnh"
          />
          <Button text={'Chọn ảnh'} onPress={() => handleChooseImage()} />
        </View>
      </View>
    </View>
  );
}

export type UrlProps = Props;
