import React from 'react';
import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import {SvenDetailsView} from '../demo/sven-stack/sven-details';
import {TouchableOpacity} from 'react-native-gesture-handler';

type SvenStackParamList = {
  Sven?: {}; // navigation root
  SvenDetails?: {};
  // more navigation children can be added here
};
type SvenStackNavitationProp = StackNavigationProp<SvenStackParamList>;
const SvenStack = createStackNavigator<SvenStackParamList>();
export const SvenNavigationView = () => {
  return (
    <SvenStack.Navigator>
      {true ? (
        <SvenStack.Screen
          name="Sven"
          children={() => [<SvenView key={0} test={'test'} />]}
        />
      ) : (
        <SvenStack.Screen name="Sven" component={SvenView} />
      )}

      <SvenStack.Screen name="SvenDetails" component={SvenDetailsView} />
    </SvenStack.Navigator>
  );
};

type SvenViewProp = {
  test?: string;
};
const SvenView = (props: SvenViewProp) => {
  const navigation = useNavigation<SvenStackNavitationProp>();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Sven',
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [navigation]);
  return (
    <View style={styles.baseView}>
      <TouchableOpacity onPress={() => {navigation.push('SvenDetails');}}>
        <Text>Show Detail</Text>
      </TouchableOpacity>
    </View>
  );
};
