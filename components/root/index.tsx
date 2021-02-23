/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native';
import {MainTabView} from '../main/index';
import {ModalView, ModalViewParamList} from '../modal/index';
import {modalControl} from './style';

export type RootStackParamList = {
  MainTab?: {};
  Modal?: ModalViewParamList; // This defines route.params for Modal component
};
export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;
const RootStack = createStackNavigator<RootStackParamList>();
const RootStackView = () => {
  //
  // The top level Navigator must be wrapped with NavigationContainer to be registered in the app
  // `RootStack = createStackNavigator<RootStackParamList>()` ensures that name="MainTab" and name="Modal" are strictly type-checked
  // We can either register multiple modal screens to RootStack, or register one single modal screen which renders variant components
  //   here we choose single modal screen in order to show how to pass parameters to it
  //
  const headerMode: 'float' | 'screen' | 'none' = 'none';
  const {mode, screenOptions} = modalControl();
  return (
    <NavigationContainer>
      <RootStack.Navigator
        headerMode={headerMode}
        mode={mode}
        screenOptions={screenOptions}>
        <RootStack.Screen name="MainTab" component={MainTabView} />
        <RootStack.Screen name="Modal" component={ModalView} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export const RootView = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <RootStackView />
    </SafeAreaView>
  );
};
