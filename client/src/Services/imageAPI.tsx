import {TImage} from '../Constants/Type';
import {get, post, delele, put} from './generic'; // Can't use delete as it is a reserved keyword in JS

type GetAllType = {
  images: TImage[];
};

type GetOne = {
  image: TImage;
};

const ImageAPI = {
  getAll: function () {
    return get<GetAllType>('/api/image/');
  },
  getOne: function (id: string) {
    return get<GetOne>(`/api/image/${id}/`);
  },
  // From this to below is message only, so string type as return.
  add: function (data: any) {
    return post<string>('/api/image/add/', data);
  },
  delete: function (id: string) {
    return delele<string>(`/api/image/delete/${id}/`);
  },
  edit: function (data: any, id: string) {
    return put<string>(`/api/image/${id}/`, data);
  },
};

export default ImageAPI;
