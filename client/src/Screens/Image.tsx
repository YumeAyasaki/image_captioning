import * as React from 'react';
import {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button} from '@rneui/base';
import {Text, Image} from '@rneui/themed';

import {RootStackParamList} from '../Constants/ScreenTypes';

type Props = NativeStackScreenProps<RootStackParamList, 'Image'>;

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
  previewImage: {
    width: '100%',
  },
  button: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
});

export function ImageScreen({navigation, route}: Props) {
  console.log(navigation);
  const params = route.params;
  const [pictureHeight, setPictureHeight] = useState(300);
  const [uri, setUri] = useState('');
  useEffect(() => {
    if (params.type === 'file') {
      // uri
      setUri(params.value);
      // height
      const newHeight = Math.min(
        Dimensions.get('window').height * 0.7,
        params.size.height,
      );
      setPictureHeight(newHeight);
    } else if (params.type === 'url') {
    }
  }, [params, pictureHeight]);

  // Adjust the picture's component size based on the picture's size

  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={styles.titleContainer}>
        <Text h1>Image captioning</Text>
      </View>
      <View style={styles.contentContainer}>
        <View>
          {uri !== '' && (
            <Image
              source={{uri: uri}}
              style={[styles.previewImage, {height: pictureHeight}]}
              resizeMode="contain"
            />
          )}
          <Button containerStyle={styles.button}>Gửi</Button>
        </View>
      </View>
    </View>
  );
}

export type ImageProps = Props;
