import React, {useCallback, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {DefaultButton} from '../components/Buttons';
import {GitHubUserItem} from '../components/GithubUser';
import {DefaultPageWrapper} from '../components/PageWrappers';
import {colors} from '../config/colors';
import {useGithubFollowsApi} from '../hooks/api';

function Follows(this: any, props: any): JSX.Element {
  const [pageNumber, setPageNumber] = useState(1);
  const {loading, users, showLoadMore} = useGithubFollowsApi(
    props.route.params.login,
    props.route.params.type,
    pageNumber,
  );

  const onLoadMorePress = useCallback(() => {
    setPageNumber(pageNumber + 1);
  }, [users]);

  const onUserPress = useCallback((user: any) => {
    props.navigation.push('Profile', {username: user.login});
  }, []);

  const renderFooterItem = () => {
    if (users.length === 0 || !showLoadMore) {
      return <></>;
    } else {
      return (
        <DefaultButton
          style={{alignSelf: 'center', marginBottom: 20}}
          onPress={onLoadMorePress}
          disabled={loading}>
          Load More
        </DefaultButton>
      );
    }
  };

  return (
    <DefaultPageWrapper>
      <FlatList
        data={users}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.login}
        renderItem={({item}) => (
          <GitHubUserItem user={item} onPress={onUserPress.bind(this, item)} />
        )}
        ListFooterComponent={renderFooterItem}
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
