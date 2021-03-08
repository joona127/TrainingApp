import React from 'react';
import {Text, Button, View} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import UpperBodyScreen from "./Screens/UpperBody";
import HomeScreen from "./Screens/Home";
import LowerBody from "./Screens/LowerBody";
import Aerobic from "./Screens/Aerobic";


const Drawer = createDrawerNavigator();

export default function App() {
return(
  <NavigationContainer>
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Koti" component={HomeScreen} />
      <Drawer.Screen name="Yläkroppa" component={UpperBodyScreen} />
      <Drawer.Screen name="Alakroppa" component={LowerBody} />
      <Drawer.Screen name="Aerobinen" component={Aerobic} />
    </Drawer.Navigator>
  </NavigationContainer>
);
}