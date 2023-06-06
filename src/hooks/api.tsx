import axios from 'axios';
import {useEffect, useState, useRef, useCallback} from 'react';
import {ToastAndroid} from 'react-native';
import {githubHeader} from '../config/api';
import {useDispatch, useSelector} from 'react-redux';
import cacheSlice from '../reducers/cache';

export const useGithubProfileApi = (username: string, navigation: any) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [error, setError] = useState('');
  const [shouldRefresh, refresh] = useState({});

  const previousShouldRefresh = useRef({});

  const cache = useSelector((state: any) => state.cache.profileCache);
  const dispatch = useDispatch();

  const onFollowsPress = useCallback(
    (type: string) => {
      if (user === null) return;
      navigation.push('Follows', {
        type: type,
        count: user[type],
        name: user.name === null ? user.login : user.name,
        login: user.login,
      });
    },
    [user],
  );

  useEffect(() => {
    const fetchData = async () => {
      const cachedUser = cache[username];

      const shouldRefreshChanged =
        previousShouldRefresh.current !== shouldRefresh;

      const mustFetch =
        cachedUser === undefined ||
        (Date.now() - cachedUser.time) / 6e6 > 10 ||
        shouldRefreshChanged;

      if (shouldRefreshChanged) {
        previousShouldRefresh.current = shouldRefresh;
      }

      if (mustFetch) {
        setLoading(true);
        setUser(null);
        setError('');

        try {
          const {data} = await axios.get(
            `https://api.github.com/users/${username}`,
            githubHeader,
          );

          dispatch(
            cacheSlice.actions.updateProfileCache({
              username: username,
              data,
            }),
          );

          setUser(data);
        } catch (error: any) {
          if (error.response.status === 404) {
            setError('Not found');
          } else {
            setError(error.message);
          }
        } finally {
          // setLoading(false);
        }
      } else {
        setUser(cachedUser);
      }
    };

    if (username.length > 0) fetchData();
  }, [username, shouldRefresh]);

  return {
    loading,
    user,
    error,
    refresh: () => {
      refresh({});
    },
    onFollowsPress,
  };
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
        if (data.length === 0) {
          ToastAndroid.show('Nothing to show', ToastAndroid.LONG);
        } else {
          setUsers([...users, ...data]);
        }
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
