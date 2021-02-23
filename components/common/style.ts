import {StyleSheet, Platform} from 'react-native';
import {TransitionPresets} from '@react-navigation/stack';

const styles = StyleSheet.create({
  fullSize: {
    width: '100%',
    height: '100%',
  },
  contentAlignmentCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const color = {
  iOSButtonColorLightTheme: '#007AFF',
  iOSButtonColorDarkTheme: '#0A84FF',
};

const positioning = {
  left: (inset: number) => {
    return {
      position: 'absolute',
      left: '0%',
      marginLeft: inset,
    };
  },
  right: (inset: number) => {
    return {
      position: 'absolute',
      right: '0%',
      marginRight: inset,
    };
  },
  top: (inset: number) => {
    return {
      position: 'absolute',
      top: '0%',
      marginTop: inset,
    };
  },
  bottom: (inset: number) => {
    return {
      position: 'absolute',
      bottom: '0%',
      marginBottom: inset,
    };
  },

  topLeft: (insetLeft: number, insetTop: number) => {
    return {
      position: 'absolute',
      top: '0%',
      marginTop: insetTop,
      left: '0%',
      marginLeft: insetLeft,
    };
  },
  topRight: (insetRight: number, insetTop: number) => {
    return {
      position: 'absolute',
      top: '0%',
      marginTop: insetTop,
      right: '0%',
      marginRight: insetRight,
    };
  },
  bottomLeft: (insetLeft: number, insetBottom: number) => {
    return {
      position: 'absolute',
      bottom: '0%',
      marginBottom: insetBottom,
      left: '0%',
      marginLeft: insetLeft,
    };
  },
  bottomRight: (insetRight: number, insetBottom: number) => {
    return {
      position: 'absolute',
      bottom: '0%',
      marginBottom: insetBottom,
      right: '0%',
      marginRight: insetRight,
    };
  },
};

const modalControl = () => {
  const ModalStyle = {
    FULLSCREEN: 'fullscreen', // screenOptions = {}
    IOS13CARD: 'card', // screenOptions = ((Platform.OS == 'ios') ? {...TransitionPresets.ModalPresentationIOS} : {})
  };
  const ModalSlideFrom = {
    BOTTOM: 'bottom', // mode = 'modal'
    SIDE: 'side', // mode = 'card'
  };
  const modalStyle = ModalStyle.IOS13CARD;
  const modalSlideFrom = ModalSlideFrom.BOTTOM;
  var mode: 'card' | 'modal', screenOptions;
  switch (modalStyle) {
    case ModalStyle.FULLSCREEN:
      screenOptions = {};
      break;
    case ModalStyle.IOS13CARD:
      screenOptions =
        Platform.OS === 'ios'
          ? {...TransitionPresets.ModalPresentationIOS}
          : {};
      // screenOptions = ((Platform.OS == 'ios') ? screenOptions={
      //   headerShown: false,
      //   presentationStyle: 'formSheet'
      // } : {})
      break;
    default:
      screenOptions = {};
  }
  switch (modalSlideFrom) {
    case ModalSlideFrom.BOTTOM:
      mode = 'modal';
      break;
    case ModalSlideFrom.SIDE:
      mode = 'card';
      break;
    default:
      mode = 'modal';
  }
  return {
    mode: mode,
    screenOptions: screenOptions,
  };
};

export {styles as commonStyles, color, positioning, modalControl};
