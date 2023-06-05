import {StyleSheet, Text} from 'react-native';

export function AppText(props: {children: any; style: any}): JSX.Element {
  return (
    <Text style={[textStyles.default, props.style]}>{props.children}</Text>
  );
}

export const textStyles = StyleSheet.create({
  default: {
    fontSize: 16,
  },
});
