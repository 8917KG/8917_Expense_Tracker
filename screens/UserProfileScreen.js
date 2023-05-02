import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import { SignOutButton } from "../components/SignOutButton"

export function UserProfileScreen() {

 return (
  <View>
   <Text style={styles.text}>Logout From Below</Text>
   <TouchableOpacity style= {styles.button}>
    <SignOutButton text="Logout" />
   </TouchableOpacity>
  </View>
 )
}

const styles = StyleSheet.create({
 text: {
  fontWeight: "bold",
  fontSize: 40,
  paddingLeft: 50,
  marginTop: 30,
  color: "#36454F",
  textAlign: "center"
 },
 button: {
  backgroundColor: '#ADD8E6',
  padding: 10,
  marginTop: 10,
  borderRadius: 50,
  marginLeft: 50,
  marginRight: 50,
  textAlign: 'center',
 }
})