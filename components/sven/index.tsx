import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import {styles, color} from './style';
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
  const test = true;
  return (
    <SvenStack.Navigator>
      {test ? (
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

  const title = 'Sven';

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [navigation]);

  React.useEffect(() => {
    console.log(`${title} props.test=${props.test}`);
  }, [props]);

  return (
    <View style={styles.baseView}>
      <TouchableOpacity
        onPress={() => {
          navigation.push('SvenDetails');
        }}>
        <Text style={{color: color.iOSButtonColorLightTheme}}>Show Detail</Text>
      </TouchableOpacity>
    </View>
  );
};
