import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import onboardingData from '../../data/onboarding';
import LottieView from 'lottie-react-native';
import {textSize} from '../../constant/size';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnboardScreen = () => {
  const {width} = useWindowDimensions();
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);
  const flatListRef = React.useRef();
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(true);

  const RenderItem = props => {
    return (
      <View
        style={[
          styles.container,
          {width: width, backgroundColor: props.item.backgroundColor},
        ]}>
        <LottieView
          source={props.item.animation}
          autoPlay
          loop
          style={{width: width, height: width}}
        />
        <Text style={[styles.title, {color: props.item.textColor}]}>
          {props.item.title}
        </Text>
        <Text style={[styles.text, {color: props.item.textColor}]}>
          {props.item.text}
        </Text>
      </View>
    );
  };

  const onViewableItemsChanged = ({viewableItems}) => {
    if (viewableItems[0].index !== null) {
      flatListIndex.value = viewableItems[0].index;
    }
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
    },
  });

  const markOnboardingAsCompleted = async () => {
    try {
      await AsyncStorage.setItem('onboardingStatus', 'completed');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error marking onboarding as completed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />

      <Animated.FlatList
        ref={flatListRef}
        data={onboardingData}
        keyExtractor={item => item.id}
        renderItem={RenderItem}
        onScroll={onScroll}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10,
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 16,
          left: 16,
          right: 16,
          borderRadius: 12,
          backgroundColor: '#f3f4f6',
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            if (flatListIndex.value < onboardingData.length - 1) {
              flatListRef.current?.scrollToIndex({
                index: flatListIndex.value + 1,
              });
            } else {
              markOnboardingAsCompleted();
            }
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 12,
            }}>
            <Text
              style={{
                fontSize: textSize.SM,
                color: '#374151',
                fontWeight: '500',
              }}>
              Continue
            </Text>
            <Icon name="chevron-forward" size={18} color="#374151" />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default OnboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: textSize.XXXXL,
    lineHeight: textSize.XXXXL * 1.6,
    fontWeight: '900',
  },
  text: {
    fontSize: textSize.SM,
  },
});
