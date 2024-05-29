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

import {RootStackParamList} from '../Constants/ScreenTypes';
import ImageAPI from '../Services/imageAPI';
import Button from '../Components/Button';
import {TextStl, theme, InputStl} from '../Constants/Style';
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
  const [image, setImage] = useState(null);

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
        setImage(res.data.image);
      } catch (e) {
        console.log(e);
      }
    };
    getImage();
  }, []);

  useEffect(() => {
    if (image === null) {
      return;
    }
    const value = image.image_file === '' ? image.url : image.image_file;
    // uri/url
    setUri(value);
    setAnnotations(image.annotation);
  }, [image]);

  const sendUpdate = async () => {
    const token = await getToken();
    var res = null;
    var req = {
      image_file: image.image_file,
      url: image.url,
      annotation: annotations,
    };
    try {
      res = await ImageAPI.edit(req, params.id, token);
    } catch (e) {
      console.log(e);
      Alert.alert('Error', 'Edit failed');
    }
    const resData = res?.data;
    if (!resData) {
      return;
    }
    Alert.alert('Success', 'Edited', [
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
      const token = await getToken();
      var res = null;
      try {
        res = await ImageAPI.delete(params.id, token);
      } catch (e) {
        console.log(e);
        Alert.alert('Error', 'Delete failed');
      }
      const resData = res?.data;
      if (!resData) {
        return;
      }
      Alert.alert('Success', 'Deleted', [
        {
          text: 'OK',
          onPress: () => {
            navigation.replace('Database');
          },
        },
      ]);
    };
    Alert.alert('Delete', 'Are you sủe?', [
      {
        text: 'Sủe',
        onPress: async () => {
          await deleteMethod();
        },
      },
      {
        text: 'Nai',
        onPress: () => {
          return;
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
              style={styles.previewImage}
              resizeMode="contain"
            />
          )}
          <View>
            <Button text="Thêm chú thích" onPress={() => addAnnotation()} />
            <Button text="Cập nhật" onPress={() => sendUpdate()} />
            <Button text="Xóa" onPress={() => sendDelete()} />
          </View>
          <View>
            {annotations.map((inputString, key) => {
              console.log(inputString);
              return (
                <View style={styles.sameRow} key={key}>
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
                  <Pressable onPress={() => removeAnnotation(key)}>
                    <Icons name="trash" size={30} color="red" />
                  </Pressable>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export type ImageProps = Props;
