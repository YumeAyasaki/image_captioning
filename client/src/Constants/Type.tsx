export type TImage = {
  id: string;
  url: string;
  image_file: string;
  annotation: string[];
  user_id: string;
};

export type TUser = {
  id: string;
  username: string;
  password: string;
  email: string;
};
