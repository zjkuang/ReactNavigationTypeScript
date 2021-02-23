# ReactNavigationTypeScript

A code example in TypeScript for [React Navigation](https://reactnavigation.org).

(`Drawer navigation` is yet to be included.)

## Preface

[React Navigation](https://reactnavigation.org) is easy to use in a JavaScript app. But when it comes to TypeScript, there is no easy answer. The one-page [documentation](https://reactnavigation.org/docs/typescript) provided by the offical site might be good enough for a veteran, but it still leaves tons of struggles to a begginer like me. After many hours of research and attempt I was able to develop an example app showing how [React Navigation](https://reactnavigation.org) works with TypeScript. And I think it is worth sharing it out here since many other beginners may still be struggling like I had been and hope this can save them some hours.

Also, this example app can also serve as a cheetsheet, or even a starting app for beginners.

## Set up

(1) Follow [doc/react-navigation.txt](https://github.com/zjkuang/ReactNavigationTypeScript/blob/master/doc/react-navigation.txt) to install [React Navigation](https://reactnavigation.org) packages and types

(2) Follow [doc/oblador-icons.txt](https://github.com/zjkuang/ReactNavigationTypeScript/blob/master/doc/oblador-icons.txt) to install [oblador Vector Icons](https://github.com/oblador/react-native-vector-icons) used in this example. Some trouble-shooting infomation is also included.

## Run It

`cd <path/to/ReactNavigationTypeScript>`

`yarn ios`

`yarn android`

(With `yarn android` for the first time you may encounter some environment issues. If so, try the trouble-shooting in [doc/getting-started](https://github.com/zjkuang/ReactNavigationTypeScript/blob/master/doc/getting-started.txt) where started with `(Fix 'yarn android' issue:)`)

## Screen Architecture in This Example

![](https://github.com/zjkuang/ReactNavigationTypeScript/blob/master/doc/Screen%20Architecture.png)

## A Brief Walk-through

In this example we created a simple archicture displaying how to manage navigations with `React Navigation` in `TypeScript`. We have a `RootStack` with two immediate children `MainTab` and `Modal`. Then MainTab hosts 5 immediate children `AnnaStack`, `KristoffStack`, `SvenStack`, `OlafStack`, `ElsaStack`. And `AnnaStack` hosts a root component `Anna` and a details component `anna-details`. And so does each of the other siblings of `AnnaStack` such as `KristoffStack`, except for `ElsaStack` which serves like a `Settings` tab in a real-world app.

Now we have pushing of the details, navigating to the neighbour tab, presenting a modal, dismissing self from current stack shown in our example.

Let's move on into code details for the tricks we needed in daily navigation.

## Tricks

### Type-check Names/Params for  Screen Components with `ParamList`

In `root` we have
```
export type RootStackParamList = {
  MainTab?: {};
  Modal?: ModalViewParamList;
};
const RootStack = createStackNavigator<RootStackParamList>();
```
so that in `RootStackView` when we are registering a component to a Screen of a Navigator with
```
<RootStack.Screen name="MainTab" component={MainTabView} />
```
the `name` can be type-checked and protected against mis-typing.

### Type-check with StackNavigationProp

In `root` we have
```
export type RootStackParamList = {
  MainTab?: {};
  Modal?: ModalViewParamList;
};
export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;
```
so that in `AnnaView` when we need to present `Modal`, we can have the accessibility to `Modal` by
```
const rootNavigation = useNavigation<RootStackNavigationProp>();
...
rootNavigation.navigate('Modal', {context: 'anna'});
```

### Provide Props for Screen Component

Usually we register a component to a Navigator Screen by
```
<AnnaStack.Navigator>
  <AnnaStack.Screen name="Anna" component={AnnaView} />
  <AnnaStack.Screen name="AnnaDetails" component={AnnaDetailsView} />
</AnnaStack.Navigator>
```
but we have an alternative way where we use `children={...}` istead of `component={...}` so that we can pass props to the component. e.g. In `anna`,
```
export const AnnaNavigationView = () => {
  return (
    <AnnaStack.Navigator>
      <AnnaStack.Screen
        name="Anna"
        children={() => [<AnnaView key={0} test={'test'} />]}
      />
      <AnnaStack.Screen name="AnnaDetails" component={AnnaDetailsView} />
    </AnnaStack.Navigator>
  );
};
...
type AnnaViewProp = {
  test?: string;
};
const AnnaView = (props: AnnaViewProp) => {
  ...
  React.useEffect(() => {
    console.log(`${title} props.test=${props.test}`);
  }, [props]);
  return (...);
};
```

### Navigate by `Component Itself` vs `Parent`

In `elsa` when navigating to a sibling screen such as `Anna` which is outside `ElsaStack`, we have 2 ways to do it.

(1) Navigate **blindly** from within `ElsaView` by
```
const navigation = useNavigation();
...
// Here navigation.navigate() accepts whatever string at edit/compile time where
//   if the target does not exist there will be a runtime crash
navigation.navigate(item.id);
```

(2) Navigate **safely** by the navigating function passed in by `parent`
In `MainTabView`
```
export const MainTabView = () => {
  const navigation = useNavigation();
  return (
    <BottomTab.Navigator
      ...
      <BottomTab.Screen
        name={'Elsa'}
        children={() => [
          <ElsaNavigationView
            key={0}
            navigateToSibling={(name: MainTabChildSiblingName) => {
              navigation.navigate(name, {});
            }}
          />,
        ]}
      />
    </BottomTab.Navigator>
  );
};
```

In `ElsaNavigationView`
```
type ElsaNavigationViewProps = {
  navigateToSibling?: MainTabNavigateToSiblingFunc;
};
export const ElsaNavigationView = (props: ElsaNavigationViewProps) => {
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
      <ElsaStack.Screen
        name="Elsa"
        children={() => [
          <ElsaView key={0} navigateToSibling={navigationPerformer} />,
        ]}
      />
    </ElsaStack.Navigator>
  );
};
```

In `ElsaView`
```
type ElsaViewProps = {
  navigateToSibling?: MainTabNavigateToSiblingFunc;
};
const ElsaView = (props: ElsaViewProps) => {
...
  if (props.navigateToSibling) {
    props.navigateToSibling(item.id);
  }
```

### Present `Variant Modals in RootStack` vs `Single Modal Rendering Variant Components`

In real world, an app can have dozens of modal screens. As recommended by React Navigation doc, the modal screens are hosted by the top level RootStack along with the MainTab or MainStack. We have 2 options here,

(1) Register dozens of different components as as modal screens of RootStack

(2) Register one single component as a modal screen of RootStack. Then this single component, when presented, needs to know which contextual component shall be rendered.

Here we pick option (2) in order to show how to pass props to the modal component from the navigation action.

In `ModalView`
```
export type ModalViewParamList = {
  context?: 'anna' | 'olaf';
};
type ModalViewProps = StackScreenProps<RootStackParamList, 'Modal'>; // import {StackScreenProps} from '@react-navigation/stack';
export const ModalView = ({navigation, route}: ModalViewProps) => {
  if (route.params?.context === 'anna') {
    return <AnnaModalView />;
  } else if (route.params?.context === 'olaf') {
    return <OlafModalView />;
  } else {
    return <View />;
  }
};
```

In `AnnaView`
```
const AnnaView = (props: AnnaViewProp) => {
  const rootNavigation = useNavigation<RootStackNavigationProp>();
  ...
  return (
    <View style={styles.baseView}>
      ...
      <TouchableOpacity
        onPress={() => {
          rootNavigation.navigate('Modal', {context: 'anna'});
        }}>
        <Text style={{color: color.iOSButtonColorLightTheme}}>Show Modal</Text>
      </TouchableOpacity>
    </View>
  );
};
```

In `OlafView`
```
const OlafView = (props: OlafViewProp) => {
  const rootNavigation = useNavigation<RootStackNavigationProp>();
  ...
  return (
    <View style={styles.baseView}>
      ...
      <TouchableOpacity
        onPress={() => {
          rootNavigation.navigate('Modal', {context: 'olaf'});
        }}>
        <Text style={{color: color.iOSButtonColorLightTheme}}>Show Modal</Text>
      </TouchableOpacity>
    </View>
  );
};
```

### Dynamics in Tab Icon

We can make the tab icon dynamic depending on the tab is selected or not.

In `MainTabView`
```
export const MainTabView = () => {
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
      ...
    </BottomTab.Navigator>
  );
};
```

