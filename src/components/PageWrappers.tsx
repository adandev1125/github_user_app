import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';

// Default page wrapper component for all pages
interface DefaultPageWrapperProps {
  children?: any;
}
export function DefaultPageWrapper(
  props: DefaultPageWrapperProps,
): JSX.Element {
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
