import axios from 'axios';
import {useEffect, useState, useRef, useCallback} from 'react';
import {ToastAndroid} from 'react-native';
import {githubHeader} from '../config/api';
import {useDispatch, useSelector} from 'react-redux';
import cacheSlice from '../reducers/cache';

// Custom hook for fetching and showing user info from GitHub
export const useGithubProfileApi = (username: string, navigation: any) => {
  const [loading, setLoading] = useState(false); // Loading flag variable to display loading indicator
  const [user, setUser] = useState<any | null>(null); // Fetched user info, it error occurs, it is set to null
  const [error, setError] = useState(''); // Error message occured while fetching user info
  const [shouldRefresh, refresh] = useState({}); // To refresh. Used for pull-to-refresh feature

  const previousShouldRefresh = useRef({}); // Saves previous shouldRefresh state variable

  const cache = useSelector((state: any) => state.cache.profileCache); // Profile cache reducer
  const dispatch = useDispatch(); // dispatch action to update Profile cache reducer

  const onFollowsPress = useCallback(
    // Callback of pressing followers or following button
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

  const onRefresh = useCallback(() => {
    refresh({});
  }, [shouldRefresh]);

  useEffect(() => {
    const fetchData = async () => {
      const cachedUser = cache[username]; // Get cached user info from redux store

      const shouldRefreshChanged =
        previousShouldRefresh.current !== shouldRefresh; // Get user pulled to refresh

      const mustFetch =
        cachedUser === undefined ||
        (Date.now() - cachedUser.time) / 6e6 > 10 ||
        shouldRefreshChanged; // Cache validation and check pull-to-refresh

      if (shouldRefreshChanged) {
        // Update saved shouldRefresh state variable
        previousShouldRefresh.current = shouldRefresh;
      }

      if (mustFetch) {
        // If user info must be fetched
        setLoading(true);
        setUser(null);
        setError('');

        try {
          // Fetch user info from GitHub
          const {data} = await axios.get(
            `https://api.github.com/users/${username}`,
            githubHeader,
          );

          // Save to cache
          dispatch(
            cacheSlice.actions.updateProfileCache({
              username: username,
              data,
            }),
          );

          // Show data
          setUser(data);
        } catch (error: any) {
          console.log(error);
          if (error.response.status === 404) {
            setError('Not found');
          } else {
            setError(error.message);
          }
        } finally {
          setLoading(false);
        }
      } else {
        // Display user info with cached data
        setUser(cachedUser);
      }
    };

    if (username.length > 0) fetchData();
  }, [username, shouldRefresh]);

  return {
    loading,
    user,
    error,
    onFollowsPress,
    onRefresh,
  };
};

// Custom hook for fetching and showing followers or following of a GitHub user
export const useGithubFollowsApi = (
  username: string,
  type: string,
  pageNumber: number,
) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any>([]);
  const [showLoadMore, setShowLoadMore] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const {data} = await axios.get(
          `https://api.github.com/users/${username}/${type}`,
          {
            params: {page: pageNumber, per_page: 30},
            ...githubHeader,
          },
        );
        if (data.length < 30) {
          setShowLoadMore(false);
        }
        setUsers([...users, ...data]);
      } catch (error: any) {
        ToastAndroid.show(error.message, ToastAndroid.LONG);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username, type, pageNumber]);

  return {loading, users, showLoadMore};
};
