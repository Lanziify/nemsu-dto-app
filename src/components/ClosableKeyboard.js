import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';

const ClosableKeyboard = ({props, children}) => {
  return (
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        accessible={false}>
        <KeyboardAvoidingView style={{flex: 1}}>
          {children}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default ClosableKeyboard;
