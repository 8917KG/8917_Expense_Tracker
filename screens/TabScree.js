import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import IonIcons from '@expo/vector-icons/Ionicons'
import { HomeScreen } from "./HomeScreen";
import { UserProfileScreen } from "./UserProfileScreen";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Tab = createMaterialBottomTabNavigator();

export function TabScreen () {

const HomeScreeOptions = {
 tabBarLabel: "Expenses",
 tabBarIcon: ({color}) => <IonIcons name = "home-outline" color={color} size={25}/>
}

const ProfileScreeOptions = {
 tabBarLabel: "Profile",
 tabBarIcon: ({color}) => <IonIcons name = "person-outline" color={color} size={28}/>
}

 return(
  <Tab.Navigator initialRouteName="Expenses" activeColor="green">
   <Tab.Screen 
   name = 'Expenses' 
   component={HomeScreen}
   options={HomeScreeOptions}
   />
   <Tab.Screen 
   name = 'Profile' 
   component={UserProfileScreen}
   options={ProfileScreeOptions}
   />
  </Tab.Navigator>
 )
}