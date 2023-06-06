import {StyleSheet, TouchableOpacity} from 'react-native';
import {DefaultText} from './Texts';

export function DefaultButton(props: any): JSX.Element {
  return (
    <TouchableOpacity
      style={[buttonStyles.default, props.style]}
      onPress={props.onPress}>
      <DefaultText style={{color: 'white', fontWeight: 'bold'}}>
        {props.children}
      </DefaultText>
    </TouchableOpacity>
  );
}

const buttonStyles = StyleSheet.create({
  default: {
    backgroundColor: '#6828ec',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 100,
  },
});
