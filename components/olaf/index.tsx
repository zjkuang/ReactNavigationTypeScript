import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import {styles, color} from './style';
import {useNavigation} from '@react-navigation/native';
import {OlafDetailsView} from '../demo/olaf-stack/olaf-details';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RootStackNavigationProp} from '../root/index';

type OlafStackParamList = {
  Olaf?: {}; // navigation root
  OlafDetails?: {};
  // more navigation children can be added here
};
type OlafStackNavitationProp = StackNavigationProp<OlafStackParamList>;
const OlafStack = createStackNavigator<OlafStackParamList>();
export const OlafNavigationView = () => {
  const test = true;
  return (
    <OlafStack.Navigator>
      {test ? (
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
  const rootNavigation = useNavigation<RootStackNavigationProp>();

  const title = 'Olaf';

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
          navigation.push('OlafDetails');
        }}>
        <Text style={{color: color.iOSButtonColorLightTheme}}>Show Detail</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          rootNavigation.navigate('Modal', {context: 'olaf'});
        }}>
        <Text style={{color: color.iOSButtonColorLightTheme}}>Show Modal</Text>
      </TouchableOpacity>
    </View>
  );
};
