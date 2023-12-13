import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import DtoInput from '../../components/DtoInput';
import ClosableKeyboard from '../../components/ClosableKeyboard';
import {layoutSize, textSize} from '../../constant/size';
import {colors} from '../../constant/colors';
import DtoButton from '../../components/DtoButton';
import {AuthErrorCodes} from 'firebase/auth';
import {ERROR} from '../../utils/error';
import {useAuth} from '../../context/AuthContext';
import {validation} from '../../utils/validation';
import Toast from 'react-native-toast-message';
import LottieView from 'lottie-react-native';

const LoginScreen = () => {
  const {loginUser} = useAuth();
  const [values, setValues] = React.useState({
    email: '',
    password: '',
  });

  const [error, setError] = React.useState({});

  const {width} = useWindowDimensions();

  const inputs = [
    {
      name: 'email',
      iconStart: <Icon name="at-outline" size={24} color={colors.text} />,
      placeholder: 'Email',
      keyboardType: 'email-address',
      value: values.email,
      error: error.email,
    },
    {
      name: 'password',
      iconStart: (
        <Icon name="lock-open-outline" size={24} color={colors.text} />
      ),
      placeholder: 'Password',
      keyboardType: 'default',
      secureTextEntry: true,
      passwordShowable: true,
      value: values.password,
      error: error.password,
    },
  ];

  const handleOnChange = (target, value) => {
    setValues({...values, [target]: value});
    setError({...error, [target]: ''});
  };

  const handleLoginUser = async () => {
    const formErrors = validation.validateLogin(values);
    if (Object.keys(formErrors).length > 0) {
      setError(formErrors);
    } else {
      try {
        await loginUser(values.email, values.password);
      } catch (error) {
        const errorMessage = ERROR.authError(error, AuthErrorCodes);
        Toast.show({
          type: 'error',
          text1: errorMessage.firebaseError,
          position: 'bottom',
        });
      }
    }
  };

  React.useEffect(() => {
    StatusBar.setBarStyle('dark-content');
    return () => {
      StatusBar.setBarStyle('default');
    };
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputContainer: {
      width: width,
      padding: layoutSize.MD,
      gap: layoutSize.MD,
    },
    title: {
      fontSize: textSize.XXXXL,
      lineHeight: textSize.XXXXL * 1.6,
      fontWeight: '900',
      color: colors.black,
    },
    text: {
      fontSize: textSize.SM,
      lineHeight: textSize.SM * 1.6,
      color: colors.gray,
    },
    lottieView: {
      width: width,
      height: width,
      top: 0,
    },
  });

  return (
    <View style={styles.container}>
      <ClosableKeyboard>
        <LottieView
          source={require('../../assets/lottie/lottiewelcome.json')}
          autoPlay
          loop
          style={styles.lottieView}
        />
        <View
          style={{
            width: '100%',
            padding: layoutSize.MD,
          }}>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.text}>
            We streamline and enhance the process of handling repair
            requisitions for ICT-related issues across various school offices.
          </Text>
        </View>
        <View style={styles.inputContainer}>
          {inputs.map((input, index) => {
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
          <DtoButton primary text="Login" onPress={handleLoginUser} />
        </View>
        <Toast autoHide />
      </ClosableKeyboard>
    </View>
  );
};

export default LoginScreen;
