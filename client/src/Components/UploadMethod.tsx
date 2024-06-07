import * as React from 'react';
import {View, Text} from 'react-native';
import BlackBackgroundModal from './UploadModal';

import Button from './Button';
import {
  handleCaptureImage,
  handleChoosePhoto,
  requestCameraPermission,
} from '../Utils/navBarFunction';
import {displayError} from '../Utils/error';

type Props = {
  navigation: any;
  onClose: () => void;
  to: 'Store' | 'Captioning';
};

const UploadMethodModal = ({navigation, to, onClose}: Props) => {
  const onPressUrl = () => {
    onClose();
    navigation.navigate('Url', {
      to: to,
    });
  };
  const onPressSelect = async () => {
    onClose();
    await handleChoosePhoto(navigation, to);
  };
  const onPressCamera = async () => {
    onClose();
    const permission = await requestCameraPermission();
    if (permission) {
      await handleCaptureImage(navigation, to);
    } else {
      displayError('Lỗi', 'Vui lòng cấp quyền truy cập camera cho ứng dụng.');
    }
  };
  return (
    <BlackBackgroundModal onClose={onClose}>
      <View>
        <Text>Phương pháp</Text>
        <View>
          <Button text="URL" onPress={() => onPressUrl()} />
          <Button text="Chụp ảnh" onPress={() => onPressCamera()} />
          <Button text="Tệp tin" onPress={() => onPressSelect()} />
        </View>
      </View>
    </BlackBackgroundModal>
  );
};

export default UploadMethodModal;
