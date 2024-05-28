import * as React from 'react';
import {View, Text} from 'react-native';
import BlackBackgroundModal from './UploadModal';

import Button from './Button';

type Props = {
  navigation: any;
  useStateThing: any;
  to: 'Store' | 'Captioning';
};

const UploadMethodModal = ({navigation, to, useStateThing}: Props) => {
  const onPressUrl = () => {
    navigation.navigate('Url', {
      to: to,
    });
    useStateThing(false);
  };
  const onPressSelect = () => {
    navigation.navigate('Select', {
      to: to,
    });
    useStateThing(false);
  };
  const onPressCamera = () => {
    navigation.navigate('Camera', {
      to: to,
    });
    useStateThing(false);
  };
  return (
    <BlackBackgroundModal>
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
