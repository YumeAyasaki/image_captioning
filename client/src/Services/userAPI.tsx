import {TUser} from '../Constants/Type';
import {get, post} from './generic';

type LoginResponse = {
  token: string;
  user: TUser;
  message: string;
};

const UserAPI = {
  login: function (data: any) {
    return post<LoginResponse>('/api/user/login/', data);
  },
  register: function (data: any) {
    return post<string>('/api/user/register/', data);
  },
  logout: function () {
    return get<string>('/api/user/logout/');
  },
};

export default UserAPI;
