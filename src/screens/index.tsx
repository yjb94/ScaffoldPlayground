import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from 'screens/HomeScreen';
import PostDetailScreen from './PostDetailScreen';

export type HomeStackParamList = {
  Home: undefined;
  PostDetail: {
    id: Post['id'];
  };
};

const Stack = createNativeStackNavigator();

const Screens = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PostDetail" component={PostDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Screens;
