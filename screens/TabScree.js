import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { HomeScreen } from "./HomeScreen";
import { UserProfileScreen } from "./UserProfileScreen";

const Tab = createMaterialBottomTabNavigator();

export function TabScreen () {
 return(
  <Tab.Navigator>
   <Tab.Screen name = 'Expenses' component={HomeScreen}></Tab.Screen>
   <Tab.Screen name = 'Profile' component={UserProfileScreen}></Tab.Screen>
  </Tab.Navigator>
 )
}