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
   <View style={styles.itemView}>
    <Text style = {styles.itemText}>Expense Date: {props.date}</Text>
    <Text style = {styles.itemText}>Expense Location: {props.location}</Text>
    <Text style = {styles.itemText}>Amount: {props.amount}</Text>
   </View>
  </Pressable>
 )
}

const styles = StyleSheet.create({
 itemView: {
  backgroundColor: '#CCCCCC',
  borderWidth: 1,
  marginTop: 5,
  marginBottom: 5,
  marginRight: 10,
  marginLeft: 10,
  borderRadius: 5,
 },
 itemText: {
  fontSize: 18,
 }
})