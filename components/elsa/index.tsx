import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {styles} from './style';
import {
  MainTabChildSiblingName,
  MainTabNavigateToSiblingFunc,
} from '../navigation-index';
import {useNavigation} from '@react-navigation/native';
import {DemoUseStateView} from '../demo/hooks/useState/index';

//
//  EEEEE  L       SSSS    A
//  E      L      S       A A
//  EEEE   L       SSS   A   A
//  E      L          S  AAAAA
//  EEEEE  LLLLL  SSSS   A   A
//

type ElsaStackParamList = {
  Elsa: {}; // navigation root
  DemoUseState: {};
  // more navigation children can be added here
};
const ElsaStack = createStackNavigator<ElsaStackParamList>();
type ElsaNavigationViewProps = {
  navigateToSibling?: MainTabNavigateToSiblingFunc;
};
export const ElsaNavigationView = (props: ElsaNavigationViewProps) => {
  const navigation = useNavigation();

  const navigateToSibling: MainTabNavigateToSiblingFunc = (
    name: MainTabChildSiblingName,
  ) => {
    navigation.navigate(name);
  };
  let navigationPerformer:
    | MainTabNavigateToSiblingFunc
    | undefined = navigateToSibling;
  navigationPerformer = props.navigateToSibling; // comment/uncomment this line to perform by self/parent

  const passNavigationPerformer = true;

  return (
    <ElsaStack.Navigator>
      {passNavigationPerformer ? (
        <ElsaStack.Screen
          name="Elsa"
          children={() => [
            <ElsaView key={0} navigateToSibling={navigationPerformer} />,
          ]}
        />
      ) : (
        <ElsaStack.Screen name="Elsa" component={ElsaView} />
      )}

      <ElsaStack.Screen name="DemoUseState" component={DemoUseStateView} />
    </ElsaStack.Navigator>
  );
};

type ElsaListItem = {
  index: number;
  id: MainTabChildSiblingName | 'DemoUseState';
  title: string;
  subtitle?: string;
};

const elsaList: ElsaListItem[] = [
  {
    index: 0,
    id: 'Anna',
    title: 'Anna',
  },
  {
    index: 1,
    id: 'Kristoff',
    title: 'Kristoff',
  },
  {
    index: 2,
    id: 'Sven',
    title: 'Sven',
  },
  {
    index: 3,
    id: 'Olaf',
    title: 'Olaf',
  },
  {
    index: 4,
    id: 'DemoUseState',
    title: 'DemoUseState',
  },
];

type ElsaViewProps = {
  navigateToSibling?: MainTabNavigateToSiblingFunc;
};
const ElsaView = (props: ElsaViewProps) => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Elsa',
      headerTitleStyle: {
        alignSelf: 'center',
      },
    });
  }, [navigation]);

  const navigationPerformer: 'parent' | 'self' = 'self'; // toggle between 'parent' and 'self' to perform navigation by MainTab and Elsa alternatively

  return (
    <View style={styles.baseView}>
      <FlatList
        data={elsaList}
        renderItem={({item}) => {
          const itemStyle =
            item.index % 2 ? styles.flatListItem1 : styles.flatListItem0;
          return (
            <TouchableOpacity
              onPress={() => {
                if (item.id === 'DemoUseState') {
                  navigation.navigate(item.id);
                } else if (navigationPerformer === 'self') {
                  console.log(
                    `[Elsa] Navigating to sibling ${item.id} with local navigation...`,
                  );
                  navigation.navigate(item.id);
                } else {
                  if (props.navigateToSibling) {
                    props.navigateToSibling(item.id);
                  }
                }
              }}>
              <Text style={itemStyle}>{item.title}</Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
};
