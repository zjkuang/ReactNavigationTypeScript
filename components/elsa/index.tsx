import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {View, Text} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {styles} from './style';
import {
  MainTabChildSiblingName,
  MainTabNavigateToSiblingFunc,
} from '../navigation-index';
import {useNavigation} from '@react-navigation/native';

//
//  EEEEE  L       SSSS    A
//  E      L      S       A A
//  EEEE   L       SSS   A   A
//  E      L          S  AAAAA
//  EEEEE  LLLLL  SSSS   A   A
//

type ElsaStackParamList = {
  Elsa: {}; // navigation root
  // more navigation children can be added here
};
type ElsaScreenNavigationProp = StackNavigationProp<ElsaStackParamList>;
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
  return (
    <ElsaStack.Navigator>
      {true ? (
        <ElsaStack.Screen
          name="Elsa"
          children={() => [
            <ElsaView key={0} navigateToSibling={navigationPerformer} />,
          ]}
        />
      ) : (
        <ElsaStack.Screen name="Elsa" component={ElsaView} />
      )}
    </ElsaStack.Navigator>
  );
};

type ElsaListItem = {
  index: number;
  id: MainTabChildSiblingName;
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
  const navigationPerformer: 'parent' | 'self' = 'self';
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
                if (navigationPerformer === 'self') {
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
