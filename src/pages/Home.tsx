import React, {useCallback, useState} from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import {GitHubUser} from '../components/GithubUser';
import {DefaultPageWrapper} from '../components/PageWrappers';
import {DefaultTextIinput} from '../components/TextInputs';
import {colors} from '../config/colors';
import {useGithubProfileApi} from '../hooks/api';

function Home(this: any, props: any): JSX.Element {
  const [username, setUsername] = useState('');
  const {
    loading,
    user,
    error,
    refresh: refreshProfile,
  } = useGithubProfileApi(username);

  const onChangeUsername = useCallback((username: string) => {
    setUsername(username);
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
        <View style={{flexDirection: 'row', marginBottom: 50}}>
          <DefaultTextIinput
            afterDelay={500}
            maxLength={50}
            placeholder={'Enter GitHub username. (ex: adan)'}
            onAfterChangeText={onChangeUsername}
          />
        </View>

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

export default Home;
