import React from 'react';
import {Alert, Text, View} from 'react-native';
import {styles, color} from './style';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export type DemoUseStateViewProp = {
  test?: string;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DemoUseStateView = (props: DemoUseStateViewProp) => {
  type State = 'Welcome' | 'Order Placed' | 'Food Consumed' | 'Bill Paid';
  const [state, setState] = React.useState<State>('Welcome');

  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Virtual Restaurant',
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [navigation, state]);

  React.useEffect(() => {
    console.log(
      'DemoUseStateView mounted -- true only when the dependencies is []',
    );

    return () => {
      console.log('DemoUseStateView unmounted');
    };
  }, []);

  React.useEffect(() => {
    navigation.removeListener('beforeRemove', () => {});
    navigation.addListener('beforeRemove', (e) => {
      if (state === 'Welcome' || state === 'Bill Paid') {
        return;
      }

      e.preventDefault();

      Alert.alert('WAIT!!!', "You haven't paid the bill yet.", [
        {text: 'Sorry, I forgot.', style: 'cancel', onPress: () => {}},
      ]);
    });
  }, [navigation, state]);

  return (
    <View style={styles.baseView}>
      <Text>{state}</Text>

      {state === 'Welcome' && (
        <TouchableOpacity
          onPress={() => {
            setState('Order Placed');
          }}>
          <Text style={{color: color.iOSButtonColorLightTheme}}>
            Order Food
          </Text>
        </TouchableOpacity>
      )}

      {state === 'Order Placed' && (
        <TouchableOpacity
          onPress={() => {
            setState('Food Consumed');
          }}>
          <Text style={{color: color.iOSButtonColorLightTheme}}>
            Eat The Meal
          </Text>
        </TouchableOpacity>
      )}

      {state === 'Food Consumed' && (
        <TouchableOpacity
          onPress={() => {
            setState('Bill Paid');
          }}>
          <Text style={{color: color.iOSButtonColorLightTheme}}>
            Pay The Bill
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
