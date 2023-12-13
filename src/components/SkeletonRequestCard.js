import {StyleSheet, View} from 'react-native';
import {layoutSize} from '../constant/size';
import { colors } from '../constant/colors';

const HEIGHT = 142.57142639160156;
const SkeletonRequestCard = () => {
  const styles = StyleSheet.create({
    container: {
      height: HEIGHT,
      borderRadius: layoutSize.MD,
      justifyContent: 'space-between',
      padding: layoutSize.MD,
      backgroundColor: colors.skeltonBackground,
    },
    content: {
      height: 20,
      borderRadius: layoutSize.MD,
      backgroundColor: colors.skeletonContent,
    },
  });
  return (
    <View style={styles.container}>
      {/* Skeleton loading elements */}
      <View style={styles.content} />
      <View style={styles.content} />
      <View style={styles.content} />
      <View style={styles.content} />
    </View>
  );
};

export default SkeletonRequestCard;
