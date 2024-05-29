import * as React from 'react';
import {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  Pressable,
  ScrollView,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../Constants/ScreenTypes';
import {TextStl} from '../Constants/Style';
import ImageAPI from '../Services/imageAPI';
import {getToken} from '../Utils/user';

type Props = NativeStackScreenProps<RootStackParamList, 'Database'>;

type ComponentProps = {
  id: string;
  annotation: string[];
  image_file: string;
  url: string;
  user_id: string;
};

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
  sameRow: {flexDirection: 'row'},
  imageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow rows to wrap if necessary
  },
  image: {
    width: Dimensions.get('window').width / 3 - 20, // Calculate width for 3 images per row with padding
    height: Dimensions.get('window').width / 3 - 20, // Maintain aspect ratio (adjust if needed)
    margin: 10, // Add margin for spacing between images
  },
});

export function Database({navigation}: Props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      const res = await ImageAPI.getAll(token);
      setData(res.data.images);
    };
    fetchData();
    console.log(data);
  }, []);

  const imageComponent = (image: ComponentProps) => {
    const source = image.image_file === '' ? image.url : image.image_file;
    return (
      <Pressable onPress={() => navigation.navigate('Image', {id: image.id})}>
        <Image style={styles.image} source={{uri: source}} />
      </Pressable>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={TextStl.h1}>Database</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.imageRow}>
          {data.map((image, key) => (
            <View key={key}>{imageComponent(image)}</View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

export type DatabaseProps = Props;
