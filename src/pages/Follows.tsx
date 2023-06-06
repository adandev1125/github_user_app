import axios from 'axios';
import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  RefreshControl,
  StatusBar,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {githubHeader} from '../config/api';
import {colors} from '../config/colors';
import {DefaultText} from '../components/Texts';
import {GitHubUserItem} from '../components/GithubUser';
import {DefaultButton} from '../components/Buttons';
import {DefaultPageWrapper} from '../components/PageWrappers';

function Follows(props: any): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any>([]);

  const pageNumber = useRef(1);

  useEffect(() => {
    const {login: username, type} = props.route.params;
    fetchData(username, type, pageNumber.current);
  }, []);

  const onLoadMorePress = useCallback(() => {
    pageNumber.current++;
    const {login: username, type} = props.route.params;
    fetchData(username, type, pageNumber.current);
  }, [users]);

  const fetchData = async (
    username: string,
    type: string,
    pageNumber: number,
  ) => {
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
    }

    setLoading(false);
  };

  return (
    <DefaultPageWrapper>
      <FlatList
        data={users}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.login}
        renderItem={({item}) => <GitHubUserItem user={item} />}
        ListFooterComponent={() => {
          if (loading) {
            return <></>;
          } else {
            return (
              <DefaultButton
                style={{alignSelf: 'center', marginBottom: 20}}
                onPress={onLoadMorePress}>
                Load More
              </DefaultButton>
            );
          }
        }}
        refreshControl={
          <RefreshControl
            progressBackgroundColor={colors.gray}
            refreshing={loading}
            enabled={false}
          />
        }
      />
    </DefaultPageWrapper>
  );
}

export default Follows;
