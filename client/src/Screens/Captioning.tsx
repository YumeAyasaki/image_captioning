import * as React from 'react';
import {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, Alert, Text, Image} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../Constants/ScreenTypes';
import CaptioningAPI from '../Services/captionAPI';
import Button from '../Components/Button';
import {TextStl} from '../Constants/Style';

type Props = NativeStackScreenProps<RootStackParamList, 'Captioning'>;

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
  modalButton: {
    marginHorizontal: 2,
  },
  sameRow: {
    flexDirection: 'row',
  },
});

export function CaptioningScreen({navigation, route}: Props) {
  const params = route.params;
  const [pictureHeight, setPictureHeight] = useState(300);
  const [uri, setUri] = useState('');
  useEffect(() => {
    // uri/url
    setUri(params.value);
    // height
    const newHeight = Math.min(
      Dimensions.get('window').height * 0.65,
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
        <Text style={TextStl.h1}>Chú thích tự động</Text>
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
          <Button text={'Gửi'} onPress={() => handleSend()} />
        </View>
      </View>
    </View>
  );
}

export type CaptioningProps = Props;
