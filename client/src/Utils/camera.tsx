import {Alert, Linking} from 'react-native';

export function CameraPermissionAlert({navigation}: any) {
  Alert.alert(
    'Quyền truy cập camera bị từ chối',
    'Vui lòng cấp quyền truy cập camera để sử dụng tính năng này',
    [
      {
        text: 'OK',
        onPress: () => {
          Linking.openSettings();
          navigation.navigate('Home');
        },
      },
      {
        text: 'Cancel',
        onPress: () => {
          navigation.navigate('Home');
        },
      },
    ],
  );
}

export function CameraFoundAlert({navigation}: any) {
  Alert.alert('Không tìm thấy camera', 'Vui lòng hãy làm gì đó', [
    {
      text: 'OK',
      onPress: () => {
        navigation.navigate('Home');
      },
    },
    {
      text: 'Cancel',
      onPress: () => {
        navigation.navigate('Home');
      },
    },
  ]);
}
