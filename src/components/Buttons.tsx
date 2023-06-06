import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../config/colors';
import {DefaultText} from './Text';

// Default button component
interface DefaultButtonProps {
  style?: any;
  disabled?: boolean;
  children?: any;
  onPress?: (event: GestureResponderEvent) => void;
}
export function DefaultButton(props: DefaultButtonProps): JSX.Element {
  return (
    <TouchableOpacity
      style={[
        buttonStyles.default,
        props.style,
        {opacity: props.disabled ? 0.2 : 1},
      ]}
      onPress={props.onPress}
      disabled={props.disabled}>
      <DefaultText style={{color: 'white', fontWeight: 'bold'}}>
        {props.children}
      </DefaultText>
    </TouchableOpacity>
  );
}

const buttonStyles = StyleSheet.create({
  default: {
    backgroundColor: colors.default,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 100,
  },
});
