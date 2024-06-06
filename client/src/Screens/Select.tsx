import * as React from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';

import {RootStackParamList} from '../Constants/ScreenTypes';
import Button from '../Components/Button';
import {TextStl} from '../Constants/Style';

type Props = NativeStackScreenProps<RootStackParamList, 'Select'>;

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

export function Select({navigation, route}: Props) {
  const params = route.params;
  const handleChoosePhoto = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: true,
    };
    const image = await launchImageLibrary(options);
    if (image.didCancel || image.errorCode || image.errorMessage) {
      return;
    }
    if (!image.assets) {
      return;
    }
    const imageObject = image.assets[0];
    if (
      !imageObject.uri ||
      !imageObject.width ||
      !imageObject.height ||
      !imageObject.base64
    ) {
      Alert.alert('Lỗi', 'Lỗi chọn file');
      return;
    }
    const value = `data:${imageObject.type};base64,${imageObject.base64}`;
    navigation.navigate(params.to, {
      type: 'file',
      value: value,
      size: {width: imageObject.width, height: imageObject.height},
    });
  };
  return (
    <View style={styles.container}>
      {/* Title app */}
      <View style={styles.titleContainer}>
        <Text style={TextStl.h1}>Chọn ảnh từ thiết bị</Text>
      </View>
      <View style={styles.contentContainer}>
        <View>
          <Button text={'Chọn ảnh'} onPress={() => handleChoosePhoto()} />
        </View>
      </View>
    </View>
  );
}

export type SelectProps = Props;
