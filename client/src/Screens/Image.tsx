import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Text,
  Image,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icons from 'react-native-vector-icons/Ionicons';
import FloatingButton from '../Components/Floating/Button';
import FloatingContainer from '../Components/Floating/Container';

import {RootStackParamList} from '../Constants/ScreenTypes';
import ImageAPI from '../Services/imageAPI';
import {TextStl, theme, InputStl} from '../Constants/Style';
import {TImage} from '../Constants/Type';
import {handleError} from '../Utils/error';

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

export function ImageS({navigation, route}: Props) {
  const params = route.params;
  const [uri, setUri] = useState('');
  const [image, setImage] = useState<TImage>();

  const [annotations, setAnnotations] = useState<Array<String>>([]);
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
    var res = null;
    const getImage = async () => {
      try {
        res = await ImageAPI.getOne(params.id);
        setImage(res.image);
      } catch (e) {
        console.log(e);
      }
    };
    getImage();
  }, []);

  useEffect(() => {
    if (!image) {
      return;
    }
    const value = image.image_file === '' ? image.url : image.image_file;
    // uri/url
    setUri(value);
    setAnnotations(image.annotation);
  }, [image]);

  const sendUpdate = async () => {
    if (!image) {
      return;
    }
    var req = {
      image_file: image.image_file,
      url: image.url,
      annotation: annotations,
    };
    try {
      await ImageAPI.edit(req, params.id);
    } catch (e) {
      console.log(e);
      handleError(e);
    }
    Alert.alert('Thành công', 'Chỉnh sửa thành công', [
      {
        text: 'OK',
        onPress: () => {
          navigation.replace('Database');
        },
      },
    ]);
  };

  const sendDelete = async () => {
    const deleteMethod = async () => {
      try {
        await ImageAPI.delete(params.id);
      } catch (e) {
        console.log(e);
        handleError(e);
      }
      Alert.alert('Thành công', 'Xoá thành công', [
        {
          text: 'OK',
          onPress: () => {
            navigation.replace('Database');
          },
        },
      ]);
    };
    Alert.alert('Xoá?', 'Bạn chắc chứ?', [
      {
        text: '100%',
        onPress: async () => {
          await deleteMethod();
        },
      },
      {
        text: 'Từ từ, chờ tí...',
        onPress: () => {
          return;
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <FloatingContainer>
        <FloatingButton iconName="add" onPress={() => addAnnotation()} />
        <FloatingButton iconName="send" onPress={() => sendUpdate()} />
        <FloatingButton iconName="trash" onPress={() => sendDelete()} />
      </FloatingContainer>
      <ScrollView style={styles.container}>
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={TextStl.h1}>Hình ảnh</Text>
        </View>
        <View style={styles.contentContainer}>
          <View>
            {uri !== '' && (
              <Image
                source={{uri: uri}}
                style={styles.previewImage}
                resizeMode="contain"
              />
            )}

            <View>
              {annotations.map((inputString, key) => {
                console.log(inputString);
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
        </View>
      </ScrollView>
    </View>
  );
}

export type ImageProps = Props;
