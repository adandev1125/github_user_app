import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';

export function DefaultPageWrapper(props: any): JSX.Element {
  return (
    <SafeAreaView style={styles.defaultPageBackground}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={styles.defaultPageBackground.backgroundColor}
      />

      {props.children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  defaultPageBackground: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
});
