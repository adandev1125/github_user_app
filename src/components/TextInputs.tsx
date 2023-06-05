import {StyleSheet, TextInput} from 'react-native';
import {textStyles} from './Texts';

export function DefaultTextIinput(props: any): JSX.Element {
  return (
    <TextInput
      style={[textInputStyles.default, textStyles.default]}
      {...props}
    />
  );
}

const textInputStyles = StyleSheet.create({
  default: {
    flex: 1,
    backgroundColor: '#eeeeee',
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginRight: 10,
    borderRadius: 50,
  },
});
