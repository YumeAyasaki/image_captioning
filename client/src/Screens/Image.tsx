import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  Text,
  Image,
  TextInput,
  ViewStyle,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../Constants/ScreenTypes';
import CaptioningAPI from '../Services/captionAPI';
import Button from '../Components/Button';
import {InputStl, TextStl, theme} from '../Constants/Style';
import BlackBackgroundModal from '../Components/UploadModal';
import ImageAPI from '../Services/imageAPI';
import {getToken} from '../Utils/user';

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
  modalButton: {
    marginHorizontal: 2,
  },
  sameRow: {
    flexDirection: 'row',
  },
});

export function ImageScreen({navigation, route}: Props) {
  console.log(navigation);
  const params = route.params;
  const [pictureHeight, setPictureHeight] = useState(300);
  const [uri, setUri] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  var formData = {
    title: '',
    annotation: '',
  };
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

  const handleUpload = async () => {
    let res = null;
    const token = await getToken();
    let req = {
      ...formData,
      url: '',
      image_file: '',
    };
    if (params.type === 'url') {
      req.url = uri;
    } else {
      req.image_file = uri;
    }
    try {
      res = await ImageAPI.add(req, token);
    } catch (e) {
      console.log(e);
      Alert.alert('Error', 'Upload failed');
    }
    const resData = res?.data;
    if (!resData) {
      return;
    }
    Alert.alert('Success', 'Uploaded', [
      {
        text: 'OK',
        onPress: () => {
          setIsUploading(false);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {isUploading && (
        <BlackBackgroundModal>
          <TextInput
            style={[InputStl.container, TextStl.base]}
            placeholderTextColor={theme.darkGrey}
            placeholder="Tiêu đề"
            onChangeText={text => {
              formData.title = text;
            }}
          />
          <TextInput
            style={[InputStl.container, TextStl.base]}
            placeholderTextColor={theme.darkGrey}
            placeholder="Nội dung"
            onChangeText={text => {
              formData.annotation = text;
            }}
          />
          <View style={styles.sameRow}>
            <Button
              style={[styles.container, styles.modalButton] as ViewStyle}
              text="Xác nhận"
              onPress={() => handleUpload()}
            />
            <Button
              style={[styles.container, styles.modalButton] as ViewStyle}
              text="Hủy"
              onPress={() => setIsUploading(false)}
            />
          </View>
        </BlackBackgroundModal>
      )}
      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={TextStl.h1}>Image captioning</Text>
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
          <View>
            <Button
              text={'Thêm vào dữ liệu'}
              onPress={() => setIsUploading(true)}
            />
            <Button text={'Gửi'} onPress={() => handleSend()} />
          </View>
        </View>
      </View>
    </View>
  );
}

export type ImageProps = Props;
