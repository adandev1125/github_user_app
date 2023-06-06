import {StyleSheet, Text} from 'react-native';

// Default sized text (size: 16)
interface DefaultTextProps {
  style?: any;
  children?: any;
}
export function DefaultText(props: DefaultTextProps): JSX.Element {
  return (
    <Text style={[textStyles.default, textStyles.black, props.style]}>
      {props.children}
    </Text>
  );
}

// Big sized text (size: 24)
export function BigText(props: DefaultTextProps): JSX.Element {
  return (
    <Text style={[textStyles.big, textStyles.black, props.style]}>
      {props.children}
    </Text>
  );
}

// Large sized text (size: 36)
export function LargeText(props: DefaultTextProps): JSX.Element {
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
