import React, {useCallback, useState, useEffect} from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import {GitHubUser} from '../components/GithubUser';
import {DefaultPageWrapper} from '../components/PageWrappers';
import {colors} from '../config/colors';
import {useGithubProfileApi} from '../hooks/api';

function Profile(this: any, props: any): JSX.Element {
  const [username, setUsername] = useState('');
  const {loading, user, error, onFollowsPress, onRefresh} = useGithubProfileApi(
    username,
    props.navigation,
  );

  useEffect(() => {
    setUsername(props.route.params.username);
  }, []);

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
          loading={loading}
          onFollowerPress={onFollowsPress.bind(this, 'followers')}
          onFollowingPress={onFollowsPress.bind(this, 'following')}
        />
      </ScrollView>
    </DefaultPageWrapper>
  );
}

export default Profile;
