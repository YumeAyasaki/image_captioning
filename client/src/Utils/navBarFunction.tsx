import {PermissionsAndroid} from 'react-native';
import {
  CameraOptions,
  launchCamera,
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';

import {displayError} from './error';

export const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Quyền truy cập camera',
        message: 'Ứng dụng cần quyền truy cập vào camera',
        buttonNeutral: 'Để sau đi',
        buttonNegative: 'Không',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
  }
};

export const handleCaptureImage = async (navigation: any, to: string) => {
  const options: CameraOptions = {
    includeBase64: true,
    mediaType: 'photo',
  };
  const image = await launchCamera(options);
  if (image.didCancel || image.errorCode || image.errorMessage) {
    return;
  }
  if (!image.assets) {
    return;
  }
  const imageObject = image.assets[0];
  if (
    !imageObject.uri ||
    !imageObject.width ||
    !imageObject.height ||
    !imageObject.base64
  ) {
    displayError('Lỗi', 'Lỗi chụp ảnh');
    return;
  }
  const value = `data:${imageObject.type};base64,${imageObject.base64}`;
  navigation.navigate(to, {
    type: 'file',
    value: value,
    size: {width: imageObject.width, height: imageObject.height},
  });
};

export const handleChoosePhoto = async (navigation: any, to: string) => {
  const options: ImageLibraryOptions = {
    mediaType: 'photo',
    includeBase64: true,
  };
  const image = await launchImageLibrary(options);
  if (image.didCancel || image.errorCode || image.errorMessage) {
    return;
  }
  if (!image.assets) {
    return;
  }
  const imageObject = image.assets[0];
  if (
    !imageObject.uri ||
    !imageObject.width ||
    !imageObject.height ||
    !imageObject.base64
  ) {
    displayError('Lỗi', 'Lỗi chọn tệp tin');
    return;
  }
  const value = `data:${imageObject.type};base64,${imageObject.base64}`;
  navigation.navigate(to, {
    type: 'file',
    value: value,
    size: {width: imageObject.width, height: imageObject.height},
  });
};
