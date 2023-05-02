import { Text, View } from "react-native"
import { SignOutButton } from "../components/SignOutButton"

export function UserProfileScreen (){

 return(
  <View>
   <Text>User Profile</Text>
   <SignOutButton text="Logout"/> 
  </View>
 )
}