import React from 'react';
import {Text, View} from 'react-native';
import {styles, color} from './style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

export const OlafModalView = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.baseView}>
      <Text>Olaf Modal</Text>

      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Text style={{color: color.iOSButtonColorLightTheme}}>
          Dismiss Modal
        </Text>
      </TouchableOpacity>
    </View>
  );
};
