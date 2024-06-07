import {Alert} from 'react-native';

export const displayError = (title: string, message: string) => {
  Alert.alert(title, message);
};

export const handleError = (error: any) => {
  let errorMessage = 'Đã xuất hiện lỗi.';
  if (error.response) {
    const {data, status} = error.response;

    if (data && data.message) {
      errorMessage = data.message;
    } else {
      errorMessage = `Lỗi ${status}.`;
    }
  } else if (error.request) {
    errorMessage = 'Lỗi mạng.';
  } else {
    errorMessage = 'Lỗi không xác định.';
  }

  displayError('Lỗi', errorMessage);
};
