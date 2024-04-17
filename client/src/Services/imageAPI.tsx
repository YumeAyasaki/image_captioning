import {get, post, delele} from './generic'; // Can't use delete as it is a reserved keyword in JS

const ImageAPI = {
  getAll: function (token: string) {
    return get('/api/image/', token);
  },
  add: function (data: any, token: string) {
    return post('/api/image/add/', data, token);
  },
  delete: function (id: number, token: string) {
    return delele(`/api/image/delete/${id}`, token);
  },
};

export default ImageAPI;
