import axios from 'axios';
import Config from 'react-native-config';

// const baseURL = Config.BACKEND_URL;
const baseURL = 'https://0ee8-113-23-110-241.ngrok-free.app';

export const configToken = function (token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const configFormData = function (token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
};

export const get = function (url: string, token: string) {
  console.log(baseURL + url);
  return new Promise((resolve, reject) =>
    axios
      .get(baseURL + url, configToken(token))
      .then(res => {
        // return data
        return resolve({data: res.data});
      })
      .catch(err => {
        // return err message
        if (!err.response) {
          return reject(err.message);
        }
        return reject(err.response.data.message);
      }),
  );
};

export const post = function (url: string, data: any, token: string) {
  console.log(baseURL + url);
  return new Promise((resolve, reject) =>
    axios
      .post(baseURL + url, data, configToken(token))
      .then(res => {
        // return data
        return resolve({data: res.data});
      })
      .catch(err => {
        // return err message
        if (!err.response) {
          return reject(err.message);
        }
        return reject(err.response.data.message);
      }),
  );
};

export const postForm = function (url: string, data: any, token: string) {
  console.log(baseURL + url);
  return new Promise((resolve, reject) =>
    axios
      .post(baseURL + url, data, configFormData(token))
      .then(res => {
        // return data
        return resolve({data: res.data});
      })
      .catch(err => {
        // return err message
        console.log(err);
        if (!err.response) {
          return reject(err.message);
        }
        return reject(err.response.data.message);
      }),
  );
};

export const put = function (url: string, data: any, token: string) {
  console.log(baseURL + url);
  return new Promise((resolve, reject) =>
    axios
      .put(baseURL + url, data, configToken(token))
      .then(res => {
        // return data
        return resolve({data: res.data});
      })
      .catch(err => {
        // return err message
        if (!err.response) {
          return reject(err.message);
        }
        return reject(err.response.data.message);
      }),
  );
};

export const patch = function (url: string, data: any, token: string) {
  console.log(baseURL + url);
  return new Promise((resolve, reject) =>
    axios
      .patch(baseURL + url, data, configToken(token))
      .then(res => {
        // return data
        return resolve({data: res.data});
      })
      .catch(err => {
        // return err message
        if (!err.response) {
          return reject(err.message);
        }
        return reject(err.response.data.message);
      }),
  );
};

export const delele = function (url: string, token: string) {
  console.log(baseURL + url);
  return new Promise((resolve, reject) =>
    axios
      .delete(baseURL + url, configToken(token))
      .then(res => {
        // return data
        return resolve({data: res.data});
      })
      .catch(err => {
        // return err message
        if (!err.response) {
          return reject(err.message);
        }
        return reject(err.response.data.message);
      }),
  );
};
