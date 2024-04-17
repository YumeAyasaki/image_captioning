import {post, postForm} from './generic';

const CaptioningAPI = {
  url: function (data: string, token: string) {
    return post('/api/caption/url/', data, token);
  },
  image: function (data: any, token: string) {
    return postForm('/api/caption/image/', data, token);
  },
};

export default CaptioningAPI;
