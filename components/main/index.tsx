import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {AnnaNavigationView} from '../anna';
import {KristoffNavigationView} from '../kristoff';
import {SvenNavigationView} from '../sven';
import {OlafNavigationView} from '../olaf';
import {ElsaNavigationView} from '../elsa';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {MainTabChildSiblingName} from '../navigation-index';

type MainTabParamList = {
  Anna: {};
  Kristoff: {};
  Sven: {};
  Olaf: {};
  Elsa: {};
};
const BottomTab = createBottomTabNavigator<MainTabParamList>();
export const MainTabView = () => {
  const navigation = useNavigation();
  //
  // If we need to pass props to a screen component, instead of
  //   <Xxx.Screen name='...' component={...} />
  // we can
  //   <Xxx.Screen name='...' key={...} children={() => [<Yyy key={...} propname={...}>]} />
  // (e.g. Screen 'Elsa')
  //
  return (
    <BottomTab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          const dynamicSize = focused ? 20 : 16;
          if (route.name === 'Anna') {
            const iconName = 'filter-1';
            return (
              <MaterialIcons name={iconName} color={color} size={dynamicSize} />
            );
          } else if (route.name === 'Kristoff') {
            const iconName = 'filter-2';
            return (
              <MaterialIcons name={iconName} color={color} size={dynamicSize} />
            );
          } else if (route.name === 'Sven') {
            const iconName = 'filter-3';
            return (
              <MaterialIcons name={iconName} color={color} size={dynamicSize} />
            );
          } else if (route.name === 'Olaf') {
            const iconName = 'filter-4';
            return (
              <MaterialIcons name={iconName} color={color} size={dynamicSize} />
            );
          } else if (route.name === 'Elsa') {
            if (focused) {
              return (
                <Fontisto
                  name={'snowflake-8'}
                  color={color}
                  size={dynamicSize}
                />
              );
            } else {
              return <Feather name={'box'} color={color} size={dynamicSize} />;
            }
          }
        },
      })}>
      <BottomTab.Screen name="Anna" component={AnnaNavigationView} />
      <BottomTab.Screen name="Kristoff" component={KristoffNavigationView} />
      <BottomTab.Screen name="Sven" component={SvenNavigationView} />
      <BottomTab.Screen name="Olaf" component={OlafNavigationView} />
      <BottomTab.Screen
        name={'Elsa'}
        children={() => [
          <ElsaNavigationView
            key={0}
            navigateToSibling={(name: MainTabChildSiblingName) => {
              console.log(`[MainTab] Navigating to Elsa's sibling ${name}...`);
              navigation.navigate(name, {});
            }}
          />,
        ]}
      />
    </BottomTab.Navigator>
  );
};
