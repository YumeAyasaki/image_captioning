import {get} from './generic';

type Type = {
  message: string;
};

const OtherAPI = {
  test: function () {
    return get<Type>('/api/');
  },
};

export default OtherAPI;
