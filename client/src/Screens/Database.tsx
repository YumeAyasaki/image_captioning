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
import FloatingButton from '../Components/Floating/Button';
import FloatingContainer from '../Components/Floating/Container';
import UploadMethodModal from '../Components/UploadMethod';
import {TImage} from '../Constants/Type';

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
  const [data, setData] = useState<TImage[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      const res = await ImageAPI.getAll();
      setData(res.images);
    };
    fetchData();
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
    <View style={styles.container}>
      <FloatingContainer>
        <FloatingButton
          iconName="cloud-upload"
          onPress={() => setIsUploading(true)}
        />
      </FloatingContainer>
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={TextStl.h1}>Dữ liệu người dùng</Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.imageRow}>
            {data.map((image, key) => (
              <View key={key}>{imageComponent(image)}</View>
            ))}
          </View>
        </View>

        {isUploading && (
          <UploadMethodModal
            navigation={navigation}
            to="Store"
            onClose={() => setIsUploading(false)}
          />
        )}
      </ScrollView>
    </View>
  );
}

export type DatabaseProps = Props;
