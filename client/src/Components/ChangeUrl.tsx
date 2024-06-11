import * as React from 'react';
import {View, TextInput, Alert} from 'react-native';

import BlackBackgroundModal from './UploadModal';
import {changeBaseUrl} from '../Services/generic';
import OtherAPI from '../Services/otherAPI';
import {displayError, handleError} from '../Utils/error';
import {theme, InputStl, TextStl} from '../Constants/Style';
import Button from './Button';

type Props = {
  onClose: () => void;
};

const ChangeUrl = ({onClose}: Props) => {
  var url = '';

  const handleChangeUrl = async () => {
    const isValidUrl = url.match(
      /(http(s)?:\/\/.)?(www\.)?[a-zA-Z0-9\-\\.]+\.[a-zA-Z]{2,}(:[0-9]+)?(\/\S*)?/,
    );
    if (!isValidUrl) {
      displayError('Lỗi', 'Url không hợp lệ.');
      return; // Prevent execution if URL is invalid
    }
    changeBaseUrl(url);
    try {
      await OtherAPI.test();
    } catch (err) {
      console.log(err);
      handleError(err);
      return;
    }
    onClose();
    Alert.alert('Đổi url thành công.');
  };

  return (
    <BlackBackgroundModal onClose={onClose}>
      <View>
        <TextInput
          style={[InputStl.container, TextStl.base]}
          placeholderTextColor={theme.darkGrey}
          placeholder="Url"
          onChangeText={text => {
            url = text;
          }}
        />
        <Button text={'Đổi'} onPress={() => handleChangeUrl()} />
      </View>
    </BlackBackgroundModal>
  );
};

export default ChangeUrl;
