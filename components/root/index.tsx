/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native';
import {MainTabView} from '../main/index';
import {ModalView} from '../modal/index';
import {modalControl} from './style';

type RootStackParamList = {
  MainTab?: {};
  Modal?: {};
};
export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;
const RootStack = createStackNavigator<RootStackParamList>();
const RootStackView = () => {
  const headerMode: 'float' | 'screen' | 'none' = 'none';
  const {mode, screenOptions} = modalControl();
  return (
    <RootStack.Navigator
      headerMode={headerMode}
      mode={mode}
      screenOptions={screenOptions}
    >
      {true ? (
        <RootStack.Screen
          name="MainTab"
          children={() => [<MainTabView key={0} />]}
        />
      ) : (
        <RootStack.Screen name="MainTab" component={MainTabView} />
      )}

      { /* Modal Views go here */
        <RootStack.Screen
          name="Modal"
          children={() => [<ModalView key={1} component={'RootStack'} />]}
        />
      }
    </RootStack.Navigator>
  );
};

export const RootView = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1}}>
        <RootStackView />
      </SafeAreaView>
    </NavigationContainer>
  );
};
