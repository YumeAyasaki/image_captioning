import * as React from 'react';
import {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image, Alert} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../Constants/ScreenTypes';
import {TextStl, theme} from '../Constants/Style';
import ImageAPI from '../Services/imageAPI';
import {getToken} from '../Utils/user';
import DatabaseTable from '../Components/DatabaseTable';
import BlackBackgroundModal from '../Components/UploadModal';
import Button from '../Components/Button';

type Props = NativeStackScreenProps<RootStackParamList, 'Database'>;

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
  tableHeader: {
    color: 'black',
    fontWeight: 'bold',
    backgroundColor: theme.primary,
  },
  titlePreview: {
    color: 'black',
    fontWeight: 'bold',
  },
  annotationPreview: {
    color: 'black',
  },
});

export function Database({navigation}: Props) {
  const [data, setData] = useState([]);
  const [isPreview, setIsPreview] = useState(false);
  const [preview, setPreview] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      const res = await ImageAPI.getAll(token);
      setData(res.data.images);
    };
    fetchData();
    console.log(data);
  }, []);
  const onDelete = async () => {
    const token = await getToken();
    try {
      await ImageAPI.delete(preview.id, token);
    } catch (err) {
      Alert.alert('Xoá thất bại', 'Có lỗi xảy ra khi xoá ảnh', [
        {
          text: 'OK',
          onPress: () => {
            setIsPreview(false);
            navigation.replace('Database');
          },
        },
      ]);
      return;
    }
    Alert.alert('Xoá thành công', 'Ảnh đã được xoá thành công', [
      {
        text: 'OK',
        onPress: () => {
          setIsPreview(false);
          navigation.replace('Database');
        },
      },
    ]);
  };
  return (
    <View style={styles.container}>
      {isPreview && (
        <BlackBackgroundModal>
          <View>
            <Image
              source={{
                uri: preview.url !== '' ? preview.url : preview.image_file,
              }}
              style={{width: 300, height: 300}}
            />
            <Text style={styles.titlePreview}>{preview.title}</Text>
            <Text style={styles.annotationPreview}>{preview.annotation}</Text>
            <View style={styles.sameRow}>
              <Button
                style={styles.container}
                text="Xoá"
                onPress={() => onDelete()}
              />
              <Button
                style={styles.container}
                text="Huỷ"
                onPress={() => setIsPreview(false)}
              />
            </View>
          </View>
        </BlackBackgroundModal>
      )}
      <View style={styles.titleContainer}>
        <Text style={TextStl.h1}>Database</Text>
      </View>
      <View style={styles.contentContainer}>
        <View>{DatabaseTable({data, setIsPreview, setPreview})}</View>
      </View>
    </View>
  );
}

export type DatabaseProps = Props;
