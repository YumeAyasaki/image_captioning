import {post} from './generic';

type CaptionResponse = {
  caption: string;
  translated_caption: string;
  time_to_generate: number;
};

const CaptioningAPI = {
  url: function (data: any) {
    return post<CaptionResponse>('/api/caption/url/', data);
  },
  image: function (data: any) {
    return post<CaptionResponse>('/api/caption/image/', data);
  },
};

export default CaptioningAPI;
