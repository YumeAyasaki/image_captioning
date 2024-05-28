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
  ScrollView,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../Constants/ScreenTypes';
import Button from '../Components/Button';
import {InputStl, TextStl, theme} from '../Constants/Style';
import ImageAPI from '../Services/imageAPI';
import {getToken} from '../Utils/user';

type Props = NativeStackScreenProps<RootStackParamList, 'Store'>;

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
    display: 'flex',
    flexDirection: 'row',
  },
});

export function StoreScreen({navigation, route}: Props) {
  const params = route.params;
  const [pictureHeight, setPictureHeight] = useState(300);
  const [uri, setUri] = useState('');
  const [annotations, setAnnotations] = useState<Array<String>>(['']);

  const changeValue = (index: number, text: string) => {
    var annotation = annotations;
    annotation[index] = text;
    setAnnotations(annotation);
  };

  const addAnnotation = () => {
    setAnnotations(() => [...annotations, '']);
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
    const token = await getToken();
    var res = null;
    var req = {
      image_file: '',
      url: '',
      annotation: annotations,
    };
    if (params.type === 'file') {
      req.image_file = params.value;
    } else {
      req.url = params.value;
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
          navigation.navigate('Home');
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
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
            <Button text={'Gửi'} onPress={() => handleSend()} />
            <Button text="Thêm chú thích" onPress={() => addAnnotation()} />
          </View>
          <View>
            {annotations.map((inputString, key) => {
              return (
                <TextInput
                  style={[InputStl.container, TextStl.base]}
                  placeholderTextColor={theme.darkGrey}
                  placeholder="Chú thích"
                  onChangeText={text => changeValue(key, text)}
                  key={key}
                />
              );
            })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export type StoreProps = Props;
