import * as React from 'react';
import {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Text} from '@rneui/themed';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  useCameraPermission,
  Camera,
  useCameraDevice,
} from 'react-native-vision-camera';

import {RootStackParamList} from '../Constants/ScreenTypes';
import {CameraPermissionAlert, CameraFoundAlert} from '../Utils/camera';
import {Button} from '@rneui/base';

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
  console.log(hasPermission);
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
    console.log(photo);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text h1>Camera</Text>
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
