import axios from 'axios';
import {useState, useEffect} from 'react';
import {ToastAndroid} from 'react-native';
import {githubHeader} from '../config/api';

export const useGithubProfileApi = (username: string) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setUser(null);
      setError('');

      if (username.length > 0) {
        try {
          const {data} = await axios.get(
            `https://api.github.com/users/${username}`,
            githubHeader,
          );
          setUser(data);
        } catch (error: any) {
          if (error.response.status === 404) {
            setError('Not found');
          } else {
            setError(error.message);
          }
        } finally {
          setLoading(false);
        }
      }
    };

    if (username.length > 0) fetchData();
  }, [username]);

  return {loading, user, error};
};

export const useGithubFollowsApi = (
  username: string,
  type: string,
  pageNumber: number,
) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const {data} = await axios.get(
          `https://api.github.com/users/${username}/${type}`,
          {
            params: {page: pageNumber},
            ...githubHeader,
          },
        );
        setUsers([...users, ...data]);
      } catch (error: any) {
        ToastAndroid.show(error.message, ToastAndroid.LONG);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username, type, pageNumber]);

  return {loading, users};
};
