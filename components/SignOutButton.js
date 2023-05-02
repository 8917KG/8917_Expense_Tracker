import { Text, View, Pressable, StyleSheet } from "react-native";
import { useContext } from "react";
import { FBAuthContext } from "../contexts/FBAuthContext";
import { signOut } from "firebase/auth";

export function SignOutButton( props ){

const FBAuth = useContext(FBAuthContext)
const SignOutHandler = () => {
 signOut(FBAuth).then (() => {

 })
}

 return(
  <View>
   <Pressable onPress={()=> SignOutHandler()}>
    <Text>{props.text}</Text>
   </Pressable>
  </View>
 )
}