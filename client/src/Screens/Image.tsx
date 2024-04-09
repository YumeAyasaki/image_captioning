import * as React from 'react';
import {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, Alert} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button} from '@rneui/base';
import {Text, Image} from '@rneui/themed';

import {RootStackParamList} from '../Constants/ScreenTypes';
import CaptioningAPI from '../Services/captionAPI';

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
    // uri/url
    setUri(params.value);
    // height
    const newHeight = Math.min(
      Dimensions.get('window').height * 0.7,
      params.size.height,
    );
    setPictureHeight(newHeight);
  }, [params, pictureHeight]);

  const handleSend = async () => {
    let res = null;
    if (params.type === 'url') {
      // JSON object with params image_url
      const req = {
        image_url: uri,
      };
      try {
        res = await CaptioningAPI.url(JSON.stringify(req), '');
      } catch (e) {
        console.log(e);
      }
    } else {
      const fileType = uri.split('.').pop();
      const form = new FormData();
      form.append('image', {
        uri: uri,
        type: `image/${fileType}`,
        name: `image.${fileType}`,
      });

      try {
        res = await CaptioningAPI.image(form, '');
      } catch (e) {
        console.log(e);
      }
    }
    const resData = res?.data;
    if (!resData) {
      return;
    }
    Alert.alert('Caption', resData.caption);
  };

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
          <Button containerStyle={styles.button} onPress={() => handleSend()}>
            Gửi
          </Button>
        </View>
      </View>
    </View>
  );
}

export type ImageProps = Props;
