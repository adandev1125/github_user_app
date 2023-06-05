import React, {useCallback} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {DefaultTextIinput} from '../components/TextInputs';

function Home(): JSX.Element {
  const onSubmitEditingUsername = useCallback((e: {nativeEvent: any}) => {
    console.log(e.nativeEvent.text);
  }, []);

  return (
    <SafeAreaView style={styles.background}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={styles.background.backgroundColor}
      />

      <View style={{flexDirection: 'row', marginBottom: 20}}>
        <DefaultTextIinput
          maxLength={50}
          placeholder={'Enter username. (ex: adan)'}
          onSubmitEditing={onSubmitEditingUsername}
        />
      </View>
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
