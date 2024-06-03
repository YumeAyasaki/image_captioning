import * as React from 'react';
import {View, Text} from 'react-native';
import BlackBackgroundModal from './UploadModal';

import Button from './Button';

type Props = {
  navigation: any;
  onClose: () => void;
  to: 'Store' | 'Captioning';
};

const UploadMethodModal = ({navigation, to, onClose}: Props) => {
  const onPressUrl = () => {
    navigation.navigate('Url', {
      to: to,
    });
    onClose();
  };
  const onPressSelect = () => {
    navigation.navigate('Select', {
      to: to,
    });
    onClose();
  };
  const onPressCamera = () => {
    navigation.navigate('Camera', {
      to: to,
    });
    onClose();
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
