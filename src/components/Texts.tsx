import {StyleSheet, Text} from 'react-native';

export function DefaultText(props: any): JSX.Element {
  return (
    <Text style={[textStyles.default, textStyles.black, props.style]}>
      {props.children}
    </Text>
  );
}

export function BigText(props: any): JSX.Element {
  return (
    <Text style={[textStyles.big, textStyles.black, props.style]}>
      {props.children}
    </Text>
  );
}

export function LargeText(props: any): JSX.Element {
  return (
    <Text style={[textStyles.large, textStyles.black, props.style]}>
      {props.children}
    </Text>
  );
}

export const textStyles = StyleSheet.create({
  black: {
    color: 'black',
  },
  default: {
    fontSize: 16,
  },
  big: {
    fontSize: 24,
  },
  large: {
    fontSize: 36,
  },
});
