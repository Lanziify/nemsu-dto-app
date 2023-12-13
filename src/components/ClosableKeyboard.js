import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';

const ClosableKeyboard = ({props, children}) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView style={{flex: 1}}>
        {children}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default ClosableKeyboard;
