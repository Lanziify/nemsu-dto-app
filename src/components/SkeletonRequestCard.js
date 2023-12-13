import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {layoutSize} from '../constant/size';
import {colors} from '../constant/colors';

const HEIGHT = 142.57142639160156;
const SkeletonRequestCard = () => {
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

  const shimmers = [
    {
      width: '100%',
    },
    {
      width: '60%',
    },
    {
      width: '40%',
    },
    {
      width: '85%',
    },
  ];

  const styles = StyleSheet.create({
    container: {
      height: HEIGHT,
      justifyContent: 'space-between',
      padding: layoutSize.MD,
      backgroundColor: colors.primary,
    },
    content: {
      height: 20,
      borderRadius: layoutSize.MD,
      // backgroundColor: colors.skeletonContent,
    },
  });
  return (
    <View style={styles.container}>
      {shimmers.map((shimmer, index) => (
        <ShimmerPlaceholder
          key={index}
          style={[styles.content, {width: shimmer.width}]}
          shimmerColors={[
            colors.skeletonContent,
            colors.lightGrayUnderlay,
            colors.skeletonContent,
          ]}
        />
      ))}
    </View>
  );
};

export default React.memo(SkeletonRequestCard);
