import {get, post} from './generic';

const UserAPI = {
  login: function (data: any) {
    return post('/api/user/login/', data, '');
  },
  register: function (data: any) {
    return post('/api/user/register/', data, '');
  },
  logout: function (token: string) {
    return get('/api/user/logout/', token);
  },
};

export default UserAPI;
