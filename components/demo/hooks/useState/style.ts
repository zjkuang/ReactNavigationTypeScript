import {StyleSheet} from 'react-native';
import {commonStyles, positioning, color} from '../../../common/style';

const styles = StyleSheet.create({
  baseView: {
    ...commonStyles.fullSize,
    ...commonStyles.contentAlignmentCenter,
  },
});

export {styles, commonStyles, positioning, color};
