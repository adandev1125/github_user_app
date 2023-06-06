import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet
} from 'react-native';

function Follows(): JSX.Element {
  return (
    <SafeAreaView style={styles.background}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={styles.background.backgroundColor}
      />

      
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

export default Follows;
