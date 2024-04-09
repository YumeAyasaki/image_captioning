import {post, postForm} from './generic';

const CaptioningAPI = {
  url: function (data: string, token: string) {
    return post('/api/url', data, token);
  },
  image: function (data: any, token: string) {
    return postForm('/api/image', data, token);
  },
};

export default CaptioningAPI;
