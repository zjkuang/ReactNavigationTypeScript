import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export type AnnaDetailsViewProp = {
  test?: string;
};
export const AnnaDetailsView = (props: AnnaDetailsViewProp) => {
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
          navigation.navigate("Olaf");
        }}
      >
        <Text>Go To Olaf</Text>
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
          navigation.navigate("Kristoff");
        }}
      >
        <Text>Go To Kristoff</Text>
      </TouchableOpacity>

      { /* Depending on whether KristoffDetails is rendered, this may be safe or may cause a crash */
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("KristoffDetails");
          }}
        >
          <Text>Go To Kristoff Details (May or may not crash)</Text>
        </TouchableOpacity>
      }
    </View>
  );
};
