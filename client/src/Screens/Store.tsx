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
  Pressable,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icons from 'react-native-vector-icons/Ionicons';
import FloatingContainer from '../Components/Floating/Container';
import FloatingButton from '../Components/Floating/Button';

import {RootStackParamList} from '../Constants/ScreenTypes';
import {InputStl, TextStl, theme} from '../Constants/Style';
import ImageAPI from '../Services/imageAPI';

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
    height: 300,
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
    alignItems: 'center',
    paddingRight: 10,
  },
  textBoxInRow: {
    flexGrow: 1,
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

  const removeAnnotation = (index: number) => {
    setAnnotations(annotations => {
      if (index < 0 || index >= annotations.length) {
        // Throw an error if the index is out of bounds
        throw new Error('Index out of range');
      }
      return annotations.slice(0, index).concat(annotations.slice(index + 1));
    });
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
      await ImageAPI.add(req);
    } catch (e) {
      console.log(e);
      Alert.alert('Error', 'Upload failed');
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
    <View style={styles.container}>
      <FloatingContainer>
        <FloatingButton iconName="send" onPress={() => handleSend()} />
        <FloatingButton iconName="add" onPress={() => addAnnotation()} />
      </FloatingContainer>
      <ScrollView style={styles.container}>
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={TextStl.h1}>Lưu ảnh</Text>
        </View>
        <View style={styles.contentContainer}>
          {uri !== '' && (
            <Image
              source={{uri: uri}}
              style={styles.previewImage}
              resizeMode="contain"
            />
          )}
          <View>
            {annotations.map((inputString, key) => {
              return (
                <View style={styles.sameRow} key={key}>
                  <Pressable onPress={() => removeAnnotation(key)}>
                    <Icons name="trash" size={30} color="red" />
                  </Pressable>
                  <TextInput
                    style={[
                      InputStl.container,
                      TextStl.base,
                      styles.textBoxInRow,
                    ]}
                    placeholderTextColor={theme.darkGrey}
                    placeholder="Chú thích"
                    defaultValue={inputString}
                    onChangeText={text => changeValue(key, text)}
                  />
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export type StoreProps = Props;
