import * as React from 'react';
import {useState} from 'react';
import {Pressable, StyleSheet, View, Text, Image} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  useCameraPermission,
  Camera,
  useCameraDevice,
} from 'react-native-vision-camera';

import {RootStackParamList} from '../Constants/ScreenTypes';
import {CameraPermissionAlert, CameraFoundAlert} from '../Utils/camera';
import {TextStl} from '../Constants/Style';

type Props = NativeStackScreenProps<RootStackParamList, 'Camera'>;

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
  camera: {
    display: 'flex',
    flex: 1,
  },
  captureContainer: {
    position: 'absolute',
    width: 50,
    height: 50,
    bottom: 20,
    backgroundColor: 'black',
    display: 'flex',
    alignSelf: 'center',
    borderRadius: 25,
  },
  captureButton: {
    width: 50,
    height: 50,
    // borderRadius: 25,
    backgroundColor: 'blue',
    alignSelf: 'center',
  },
});

export function CameraScreen({navigation}: Props) {
  const {hasPermission, requestPermission} = useCameraPermission();
  const [cameraPermission, setCameraPermission] = useState(hasPermission);
  if (!hasPermission) {
    requestPermission().then((res: any) => {
      if (!res) {
        CameraPermissionAlert({navigation});
      } else {
        setCameraPermission(res);
      }
    });
  }

  const device = useCameraDevice('back');
  const cameraRef = React.useRef<Camera>(null);
  if (device === null || device === undefined) {
    CameraFoundAlert({navigation});
    return;
  }

  const capture = async () => {
    const photo = await cameraRef.current?.takePhoto();
    console.log(`file://${photo?.path}`);
    const tempUri = `file://${photo?.path}`;
    let imageSize = {width: 0, height: 0};
    await Image.getSize(
      tempUri,
      (width, height) => {
        imageSize = {width, height};
      },
      error => {
        console.error(error);
      },
    );
    console.log(imageSize);
    // Make uri from the photo and send it to the image screen
    // Platform is Android
    navigation.navigate('Image', {
      type: 'file',
      value: tempUri,
      size: imageSize,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={TextStl.h1}>Camera</Text>
      </View>
      {cameraPermission && (
        <View style={styles.container}>
          <Camera
            ref={cameraRef}
            device={device}
            isActive
            style={styles.camera}
            photo
          />

          {/* Button break things, for some reason
          F*ck you, react-native-elements' button */}
          <Pressable
            style={styles.captureContainer}
            onPress={() => {
              capture();
            }}
          />
        </View>
      )}
    </View>
  );
}

export type CameraProps = Props;
