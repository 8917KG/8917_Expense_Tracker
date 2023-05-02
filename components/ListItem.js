import { Text, View, Pressable, StyleSheet } from "react-native";

export function ListItem( props ){

const data = {
 id: props.id,
 date: props.date,
 location: props.location,
 itemType: props.itemType,
 amount: props.amount
}

 return(
  <Pressable onPress={() => props.handler( data )}>
   <View>
    <Text>{props.date}</Text>
   </View>
  </Pressable>
 )
}