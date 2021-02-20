import React from 'react';
import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import {OlafDetailsView} from '../demo/olaf-stack/olaf-details';
import {TouchableOpacity} from 'react-native-gesture-handler';

type OlafStackParamList = {
  Olaf?: {}; // navigation root
  OlafDetails?: {};
  // more navigation children can be added here
};
type OlafStackNavitationProp = StackNavigationProp<OlafStackParamList>;
const OlafStack = createStackNavigator<OlafStackParamList>();
export const OlafNavigationView = () => {
  return (
    <OlafStack.Navigator>
      {true ? (
        <OlafStack.Screen
          name="Olaf"
          children={() => [<OlafView key={0} test={'test'} />]}
        />
      ) : (
        <OlafStack.Screen name="Olaf" component={OlafView} />
      )}

      <OlafStack.Screen name="OlafDetails" component={OlafDetailsView} />
    </OlafStack.Navigator>
  );
};

type OlafViewProp = {
  test?: string;
};
const OlafView = (props: OlafViewProp) => {
  const navigation = useNavigation<OlafStackNavitationProp>();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Olaf',
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [navigation]);
  return (
    <View style={styles.baseView}>
      <TouchableOpacity
        onPress={() => {
          navigation.push('OlafDetails');
        }}
      >
        <Text>Show Detail</Text>
      </TouchableOpacity>
    </View>
  );
};
