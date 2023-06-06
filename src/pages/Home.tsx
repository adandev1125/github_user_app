import React, {useCallback, useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {DefaultTextIinput} from '../components/TextInputs';
import axios from 'axios';
import {GitHubUser} from '../components/GithubUser';

function Home(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const onChangeUsername = useCallback((username: string) => {
    fetchData(username).then();
  }, []);

  const fetchData = async (username: string) => {
    setLoading(true);
    setUser(null);
    setError('');

    if (username.length > 0) {
      try {
        const {data} = await axios.get(
          `https://api.github.com/users/${username}`,
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
            afterDelay={800}
            maxLength={50}
            placeholder={'Enter username. (ex: adan)'}
            onAfterChangeText={onChangeUsername}
          />
        </View>

        <GitHubUser loading={loading} user={user} error={error} />
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
