import {useCallback, useRef} from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {textStyles} from './Text';

// Default Text Input component
// Supports debounce function if you set afterDelay and onAfterChangeText
interface DefaultTextIinputProps {
  afterDelay?: number;
  onAfterChangeText?: (text: string) => void | undefined;
  onChangeText?: (text: string) => void | undefined;
  maxLength?: number;
  placeholder?: string;
}
export function DefaultTextIinput(props: DefaultTextIinputProps): JSX.Element {
  const inputTimeout = useRef(-1);

  const onChangeText = useCallback((text: string) => {
    // Check if debounce function is needed
    if (props.afterDelay !== undefined) {
      // If inputTimeout is greater than or equal to 0, clear the timeout
      if (inputTimeout.current >= 0) {
        clearTimeout(inputTimeout.current);
      }
      // Set a new timeout and execute the function after the delay
      inputTimeout.current = setTimeout(() => {
        inputTimeout.current = -1;
        // If onAfterChangeText function exists, execute it with the text parameter
        if (props.onAfterChangeText) props.onAfterChangeText(text);
      }, props.afterDelay);
    }

    // If there is no need for debounce and an onChangeText function exists,
    // execute it with the text parameter
    else if (props.onChangeText) {
      props.onChangeText(text);
    }
  }, []);

  return (
    <TextInput
      style={[textInputStyles.default, textStyles.default]}
      onChangeText={onChangeText}
      maxLength={props.maxLength}
      placeholder={props.placeholder}
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
