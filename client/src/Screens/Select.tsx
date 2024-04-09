import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button} from '@rneui/base';
import {Text} from '@rneui/themed';
import {launchImageLibrary} from 'react-native-image-picker';

import {RootStackParamList} from '../Constants/ScreenTypes';

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
  button: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
});

export function Select({navigation}: Props) {
  console.log(navigation);

  const handleChoosePhoto = async () => {
    const options: any = {
      mediaType: 'photo',
    };
    const image = await launchImageLibrary(options);
    if (image.didCancel || image.errorCode || image.errorMessage) {
      return;
    }
    if (!image.assets) {
      return;
    }
    const imageObject = image.assets[0];
    if (!imageObject.uri || !imageObject.width || !imageObject.height) {
      return;
    }
    navigation.navigate('Image', {
      type: 'file',
      value: imageObject.uri,
      size: {width: imageObject.width, height: imageObject.height},
    });
  };
  return (
    <View style={styles.container}>
      {/* Title app */}
      <View style={styles.titleContainer}>
        <Text h1>Image selection</Text>
      </View>
      <View style={styles.contentContainer}>
        <View>
          <Button
            containerStyle={styles.button}
            onPress={() => handleChoosePhoto()}>
            Chọn ảnh
          </Button>
        </View>
      </View>
    </View>
  );
}

export type SelectProps = Props;
