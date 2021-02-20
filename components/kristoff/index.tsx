import React from 'react';
import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import {KristoffDetailsView} from '../demo/kristoff-stack/kristoff-details';
import {TouchableOpacity} from 'react-native-gesture-handler';

type KristoffStackParamList = {
  Kristoff?: {}; // navigation root
  KristoffDetails?: {};
  // more navigation children can be added here
};
type KristoffStackNavitationProp = StackNavigationProp<KristoffStackParamList>;
const KristoffStack = createStackNavigator<KristoffStackParamList>();
export const KristoffNavigationView = () => {
  return (
    <KristoffStack.Navigator>
      {true ? (
        <KristoffStack.Screen
          name="Kristoff"
          children={() => [<KristoffView key={0} test={'test'} />]}
        />
      ) : (
        <KristoffStack.Screen name="Kristoff" component={KristoffView} />
      )}

      <KristoffStack.Screen name="KristoffDetails" component={KristoffDetailsView} />
    </KristoffStack.Navigator>
  );
};

type KristoffViewProp = {
  test?: string;
};
const KristoffView = (props: KristoffViewProp) => {
  const navigation = useNavigation<KristoffStackNavitationProp>();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Kristoff',
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [navigation]);
  return (
    <View style={styles.baseView}>
      <TouchableOpacity
        onPress={() => {
          navigation.push('KristoffDetails');
        }}
      >
        <Text>Show Detail</Text>
      </TouchableOpacity>
    </View>
  );
};
