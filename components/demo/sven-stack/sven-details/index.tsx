import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export type SvenDetailsViewProp = {
  test?: string;
};
export const SvenDetailsView = (props: SvenDetailsViewProp) => {
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
          navigation.navigate("Kristoff");
        }}
      >
        <Text>Go To Kristoff</Text>
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
          navigation.navigate("Olaf");
        }}
      >
        <Text>Go To Olaf</Text>
      </TouchableOpacity>
    </View>
  );
};
