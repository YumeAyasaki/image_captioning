import {post} from './generic';

const CaptioningAPI = {
  url: function (data: string) {
    return post('/api/caption/url/', data);
  },
  image: function (data: any) {
    return post('/api/caption/image/', data);
  },
};

export default CaptioningAPI;
