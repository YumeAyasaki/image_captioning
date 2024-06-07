export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Camera: {
    to: 'Captioning' | 'Store';
  };
  Select: {
    to: 'Captioning' | 'Store';
  };
  Url: {
    to: 'Captioning' | 'Store';
  };
  Captioning: {
    type: 'file' | 'url';
    value: string;
    size: {width: number; height: number};
  };
  Store: {
    type: 'file' | 'url';
    value: string;
    size: {width: number; height: number};
    initedValue?: string[];
  };
  Database: undefined;
  Image: {
    id: string;
  };
};
