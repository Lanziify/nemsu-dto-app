import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import DtoInput from '../../../components/DtoInput';
import {useAuth} from '../../../context/AuthContext';
import {colors} from '../../../constant/colors';
import {layoutSize, textSize} from '../../../constant/size';
import ClosableKeyboard from '../../../components/ClosableKeyboard';
import DtoButton from '../../../components/DtoButton';
import validation from '../../../utils/validation';
import Toast from 'react-native-toast-message';
import ApiService from '../../../api/ApiService';
import { useNavigation } from '@react-navigation/native';

const Create = () => {
  const {user, userToken} = useAuth();
  const {width} = useWindowDimensions();
  const navigation = useNavigation()
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    uid: user.uid,
    device: '',
    brand: '',
    model: '',
    serial: '',
    property: '',
    complaints: '',
  });
  const [error, setError] = React.useState({});

  const [items, setItems] = React.useState([
    {label: 'Printer', value: 'Printer'},
    {label: 'Desktop Computer', value: 'Desktop Computer'},
    {label: 'Laptop', value: 'Laptop'},
    {label: 'Network Devices', value: 'Network Devices'},
  ]);

  const fields = [
    {
      name: 'brand',
      placeholder: 'Brand',
      value: values.brand,
      error: error.brand,
    },
    {
      name: 'model',
      placeholder: 'Model',
      value: values.model,
      error: error.model,
    },
    {
      name: 'serial',
      placeholder: 'Serial Number',
      value: values.serialNumber,
      error: error.serial,
    },
    {
      name: 'property',
      placeholder: 'Property Number',
      value: values.property,
      error: error.property,
    },
    {
      name: 'complaints',
      placeholder: 'Defects/Complaints',
      multiline: true,
      value: values.complaints,
      error: error.complaints,
      numberOfLines: 10,
    },
  ];

  const handleOnChange = (target, value) => {
    setValues({...values, [target]: value});
    setError({...error, [target]: ''});
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary,
    },
    fieldsContainer: {
      width: width,
      padding: layoutSize.MD,
      gap: layoutSize.MD,
    },
  });

  const handleSubmit = async () => {
    const inputError = validation.validateRequest(values);
    if (Object.keys(inputError).length > 0) {
      setError({...error, ...inputError});
    } else {
      try {
        await ApiService.createRequest(values, userToken.token);
        navigation.navigate(-1)
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Something went wrong',
          position: 'top',
        });
        // const errorMessage = handleError.login(e);
        // setError({ ...error, ...errorMessage });
      }
    }
  };

  return (
    <ClosableKeyboard>
      <ScrollView style={styles.container}>
        <View style={styles.fieldsContainer}>
          <View>
            <DropDownPicker
              open={open}
              value={values.device}
              items={items}
              setOpen={setOpen}
              setValue={value => setValues({...values, device: value()})}
              onChangeValue={value => {
                handleOnChange('device', value);
              }}
              closeOnBackPressed
              setItems={setItems}
              placeholder="Select a device"
              placeholderStyle={{color: colors.text, fontSize: textSize.MD}}
              dropDownContainerStyle={{
                borderWidth: 0,
                backgroundColor: colors.inputBackground,
                borderRadius: layoutSize.MD,
              }}
              textStyle={{color: colors.text, fontSize: textSize.MD}}
              style={{
                borderWidth: 0,
                borderRadius: layoutSize.MD,
                paddingHorizontal: layoutSize.SM,
                paddingVertical: layoutSize.SM + 4,
                backgroundColor: colors.inputBackground,
              }}
              listMode="SCROLLVIEW"
            />
            {error.device && (
              <Text style={{fontSize: textSize.SM, color: colors.danger}}>
                *{error.device}
              </Text>
            )}
          </View>
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
          <DtoButton primary text="Submit" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </ClosableKeyboard>
  );
};

export default Create;
