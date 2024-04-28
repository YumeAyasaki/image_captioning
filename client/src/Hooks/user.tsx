import {useState, useEffect} from 'react';

import {getUser, getToken} from '../Utils/user';

export const useUser = () => {
  const [status, setStatus] = useState('Loading');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    const userRetrieve = async () => {
      const currentUser = await getUser();
      setUser(currentUser);
    };
    const tokenRetrieve = async () => {
      const currentToken = await getToken();
      if (currentToken) {
        setToken(currentToken);
      }
    };

    userRetrieve();
    tokenRetrieve();
    setStatus('Done');
  }, []);

  return {status, user, token};
};
