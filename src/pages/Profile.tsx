import React, {useCallback, useState, useEffect} from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import {GitHubUser} from '../components/GithubUser';
import {DefaultPageWrapper} from '../components/PageWrappers';
import {colors} from '../config/colors';
import {useGithubProfileApi} from '../hooks/api';

function Profile(this: any, props: any): JSX.Element {
  const [username, setUsername] = useState('');
  const {
    loading,
    user,
    error,
    refresh: refreshProfile,
  } = useGithubProfileApi(username);

  useEffect(() => {
    setUsername(props.route.params.username);
  }, []);

  const onFollowsPress = useCallback(
    (type: string) => {
      if (user === null) return;
      props.navigation.push('Follows', {
        type: type,
        count: user[type],
        name: user.name,
        login: user.login,
      });
    },
    [user],
  );

  const onRefresh = useCallback(() => {
    refreshProfile();
  }, [refreshProfile]);

  return (
    <DefaultPageWrapper>
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            progressBackgroundColor={colors.gray}
            refreshing={loading}
            onRefresh={onRefresh}
          />
        }>
        <GitHubUser
          user={user}
          error={error}
          onFollowerPress={onFollowsPress.bind(this, 'followers')}
          onFollowingPress={onFollowsPress.bind(this, 'following')}
        />
      </ScrollView>
    </DefaultPageWrapper>
  );
}

export default Profile;
