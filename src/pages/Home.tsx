import axios from 'axios';
import React, {useCallback, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {GitHubUser} from '../components/GithubUser';
import {DefaultTextIinput} from '../components/TextInputs';
import {githubHeader} from '../config/api';

function Home(props: any): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const onChangeUsername = useCallback((username: string) => {
    fetchData(username).then();
  }, []);

  const onFollowerPress = useCallback(() => {
    props.navigation.push('Followers');
  }, []);
  const onFollowingPress = useCallback(() => {
    props.navigation.push('Following');
  }, []);

  const fetchData = async (username: string) => {
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
      }
    }

    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.background}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={styles.background.backgroundColor}
      />

      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'row', marginBottom: 50}}>
          <DefaultTextIinput
            afterDelay={500}
            maxLength={50}
            placeholder={'Enter GitHub username. (ex: adan)'}
            onAfterChangeText={onChangeUsername}
          />
        </View>

        <GitHubUser
          loading={loading}
          user={user}
          error={error}
          onFollowerPress={onFollowerPress}
          onFollowingPress={onFollowingPress}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
  },
});

export default Home;
