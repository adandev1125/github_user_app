import {useCallback, useRef} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {textStyles} from './Texts';

export function DefaultTextIinput(props: any): JSX.Element {
  const inputTimeout = useRef(-1);

  const onChangeText = useCallback((text: string) => {
    if (props.afterDelay !== undefined) {
      if (inputTimeout.current >= 0) {
        clearTimeout(inputTimeout.current);
      }
      inputTimeout.current = setTimeout(() => {
        inputTimeout.current = -1;
        props.onAfterChangeText(text);
      }, props.afterDelay);
    } else {
      props.onChangeText(text);
    }
  }, []);

  return (
    <TextInput
      style={[textInputStyles.default, textStyles.default]}
      onChangeText={onChangeText}
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
    borderRadius: 50,
  },
});
