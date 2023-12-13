import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React from 'react';
import DtoInput from '../../../components/DtoInput';
import {layoutSize} from '../../../constant/size';
import {colors} from '../../../constant/colors';
import validation from '../../../utils/validation';
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';
import Toast from 'react-native-toast-message';
import {ERROR} from '../../../utils/error';
import {useNavigation} from '@react-navigation/native';
import DtoButton from '../../../components/DtoButton';
import ClosableKeyboard from '../../../components/ClosableKeyboard';
import {useAuth} from '../../../context/AuthContext';

const PasswordChange = () => {
  const {user} = useAuth();
  const [values, setValues] = React.useState({
    current: '',
    new: '',
    confirm: '',
  });

  const navigation = useNavigation();

  const {width} = useWindowDimensions();

  const [error, setError] = React.useState({});

  const fields = [
    {
      label: 'Current Password',
      name: 'current',
      value: values.current,
      type: 'text',
      error: error.current,
    },
    {
      label: 'New Password',
      name: 'new',
      value: values.new,
      error: error.new,
      secureTextEntry: true,
      passwordShowable: true,
    },
    {
      label: 'Confirm Password',
      name: 'confirm',
      value: values.confirm,
      error: error.confirm,
      secureTextEntry: true,
      passwordShowable: true,
    },
  ];

  const handleOnChange = (target, value) => {
    setValues({...values, [target]: value});
    setError({...error, [target]: ''});
  };

  const handleSubmit = async () => {
    try {
      const formErrors = validation.validatePasswordReset(values);
      if (Object.keys(formErrors).length > 0) {
        setError(formErrors);
        return;
      }

      if (Object.values(values).every(value => value === values.current))
        throw new Error(
          'Current password and new password should not be the same',
        );

      const credential = EmailAuthProvider.credential(
        user.email,
        values.current,
      );

      await reauthenticateWithCredential(user, credential);

      await updatePassword(user, values.new);

      Toast.show({
        type: 'success',
        text1: 'Password Updated!',
        position: 'top',
      });

      navigation.goBack();
    } catch (error) {
      let errorMessage = {firebaseError: error.message};
      if (error.code) {
        errorMessage = ERROR.authError(error, AuthErrorCodes);
      }
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        text2: errorMessage.firebaseError,
        position: 'top',
      });
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.primary,
    },
    inputContainer: {
      width: width,
      padding: layoutSize.MD,
      gap: layoutSize.MD,
    },
  });

  return (
    <ClosableKeyboard>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          {fields.map((input, index) => {
            return (
              <DtoInput
                key={index}
                {...input}
                onChangeText={value => {
                  handleOnChange(input.name, value);
                }}
              />
            );
          })}
          <DtoButton
            primary
            text="Confirm"
            onPress={handleSubmit}
            styles={{marginTop: layoutSize.MD}}
          />
        </View>
      </View>
    </ClosableKeyboard>
  );
};

export default PasswordChange;
