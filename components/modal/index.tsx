import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export type ModalViewProp = {
  component: string;
};
export const ModalView = (props: ModalViewProp) => {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Details',
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [navigation]);
  return (
    <View style={styles.baseView}>
      <TouchableOpacity onPress={() => {navigation.goBack(); }}>
        <Text>Dismiss Modal</Text>
      </TouchableOpacity>
    </View>
  );
};
