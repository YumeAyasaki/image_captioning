// Considering using this to pass user/token to screen that requires authentication

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Camera: undefined;
  Select: undefined;
  // For image screen, need to pass an image file or url as parameter for previewing and sending to server
  Image: {
    type: 'file' | 'url';
    value: string;
    size: {width: number; height: number};
  };
  Url: undefined;
  Database: undefined;
};
