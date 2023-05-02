import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useRoute } from "@react-navigation/native"
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

export function ExpenseDetail (props) {

 const route = useRoute()
const authStatus = useContext(AuthContext)

 const {id, date, location, itemType, amount } = route.params

 return(
  <View>
   <Text>{date}</Text>
   <Text>{location}</Text>
   <Text>{itemType}</Text>
   <Text>{amount}</Text>
   <Text>{id}</Text>
  </View>
 )
}