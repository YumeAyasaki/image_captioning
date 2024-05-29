import {get, post, delele, put} from './generic'; // Can't use delete as it is a reserved keyword in JS

const ImageAPI = {
  getAll: function (token: string = '') {
    return get('/api/image/', token);
  },
  getOne: function (id: string, token: string = '') {
    return get(`/api/image/${id}/`, token);
  },
  add: function (data: any, token: string) {
    return post('/api/image/add/', data, token);
  },
  delete: function (id: string, token: string) {
    return delele(`/api/image/delete/${id}/`, token);
  },
  edit: function (data: any, id: string, token: string) {
    return put(`/api/image/${id}/`, data, token);
  },
};

export default ImageAPI;
