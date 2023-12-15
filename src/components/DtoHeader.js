import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {colors} from '../constant/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {layoutSize, textSize} from '../constant/size';
import DtoLogo from './DtoLogo';
import {useNavigation} from '@react-navigation/native';
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import DtoInput from './DtoInput';
import ClosableKeyboard from './ClosableKeyboard';

const DtoHeader = props => {
  const navigation = useNavigation();
  const [showSearchBar, setShowSearchBar] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);
  const searchBarSharedValue = useSharedValue(0);
  const searchInpuBackground = useSharedValue(colors.primary);
  const titleSharedValue = useSharedValue(1);
  const {width, height} = useWindowDimensions();
  const searchInput = React.useRef(null);
  const inRequestsRoute = navigation
    .getState()
    .routeNames[navigation.getState().index].includes('Request');

  const animatedSearchBar = useAnimatedStyle(() => {
    return {
      width: searchBarSharedValue.value,
    };
  });

  const animatedInputBackground = useAnimatedStyle(() => {
    return {
      backgroundColor: searchInpuBackground.value,
    };
  });

  const animatedTitle = useAnimatedStyle(() => {
    return {
      opacity: titleSharedValue.value,
    };
  });

  useAnimatedReaction(
    () => {
      return showSearchBar ? (width - layoutSize.MD) * 0.85 : 38;
    },
    (result, previous) => {
      if (result !== previous) {
        searchBarSharedValue.value = withTiming(result, {
          duration: 500,
          easing: Easing.bezier(0.51, 0.11, 0.08, 1.11),
          reduceMotion: ReduceMotion.System,
        });
      }
    },
    [showSearchBar],
  );

  useAnimatedReaction(
    () => {
      return showSearchBar ? colors.inputBackground : colors.primary;
    },
    (result, previous) => {
      if (result !== previous) {
        searchInpuBackground.value = withTiming(result, {
          duration: 500,
          easing: Easing.bezier(0.51, 0.11, 0.08, 1.11),
          reduceMotion: ReduceMotion.System,
        });
      }
    },
    [showSearchBar],
  );

  useAnimatedReaction(
    () => {
      return showSearchBar ? 0 : 1;
    },
    (result, previous) => {
      if (result !== previous) {
        titleSharedValue.value = withTiming(result, {duration: 200});
      }
    },
    [showSearchBar],
  );

  React.useEffect(() => {
    if (searchInput.current) {
      if (showSearchBar) {
        searchInput.current.focus();
      } else {
        searchInput.current.blur();
      }
    }
  }, [showSearchBar]);

  const styles = StyleSheet.create({
    headerContainer: {
      width: width,
      backgroundColor: colors.primary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerTitle: {
      textAlign: 'center',
      fontSize: textSize.MD,
      fontWeight: 'bold',
      color: colors.accent,
    },
    searchInput: {
      height: 38,
      position: 'absolute',
      right: 16,
      borderRadius: layoutSize.MD,
    },
    dtoTextInput: {
      paddingHorizontal: layoutSize.MD,
      alignItems: 'center',
      justifyContent: 'center',
      textAlignVertical: props.multiline ? 'top' : 'center',
    },
  });

  return inRequestsRoute ? (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setShowSearchBar(false);
      }}>
      <View style={styles.headerContainer}>
        <View style={{padding: layoutSize.MD}}>
          <DtoLogo width={24} height={24} fill={colors.accent} />
        </View>
        {isVisible && (
          <Animated.Text style={[styles.headerTitle, animatedTitle]}>
            {props.headerTitle}
          </Animated.Text>
        )}

        <Animated.View
          style={[
            styles.searchInput,
            animatedSearchBar,
            animatedInputBackground,
          ]}>
          <TextInput
            ref={searchInput}
            onChange={props.handleSearchInputChange}
            editable={showSearchBar}
            placeholder={showSearchBar ? 'Search' : ''}
            style={styles.dtoTextInput}
          />
        </Animated.View>

        <TouchableOpacity
          onPress={() => setShowSearchBar(!showSearchBar)}
          style={{
            marginRight: layoutSize.MD + 6,
          }}>
          <Icon name="search" size={24} color={colors.black} />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  ) : (
    <View
      style={[
        styles.headerContainer,
        {padding: layoutSize.MD, justifyContent: 'center'},
      ]}>
      <Text style={styles.headerTitle}>{props.headerTitle}</Text>
    </View>
  );
};

export default React.memo(DtoHeader);
