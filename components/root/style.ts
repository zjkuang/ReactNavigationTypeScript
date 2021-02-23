import {StyleSheet} from 'react-native';
import {commonStyles, positioning, modalControl, color} from '../common/style';

const styles = StyleSheet.create({
  baseView: {
    ...commonStyles.fullSize,
    ...commonStyles.contentAlignmentCenter,
  },
});

export {styles, commonStyles, color, positioning, modalControl};
