import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export type OlafDetailsViewProp = {
  test?: string;
};
export const OlafDetailsView = (props: OlafDetailsViewProp) => {
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
      <TouchableOpacity
        onPress={() => {
            navigation.navigate("Sven");
        }}
      >
        <Text>Go To Sven</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
            navigation.goBack();
        }}
      >
        <Text>Go Back</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
            navigation.navigate("Anna");
        }}
      >
        <Text>Go To Anna</Text>
      </TouchableOpacity>
    </View>
  );
};
