import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native"
import { useRoute, useNavigation } from "@react-navigation/native"
import { useContext, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { DBContext } from "../contexts/DBContext"
import { doc, deleteDoc, updateDoc } from "firebase/firestore"

export function ExpenseDetail(props) {

  const navigation = useNavigation()
  const route = useRoute()
  const DB = useContext(DBContext)
  const authStatus = useContext(AuthContext)
  const { id, date, location, itemType, amount } = route.params

  const [expenseDate, setExpenseDate] = useState(date)
  const [expenseLocation, setExpenseLocation] = useState(location)
  const [expenseItemType, setExpenseItemType] = useState(itemType)
  const [expenseAmount, setExpenseAmount] = useState(amount)

  const deleteExpense = async () => {
    const path = `users/${authStatus.uid}/expenses`
    await deleteDoc(doc(DB, path, id))
    navigation.goBack()
  }

  const updateExpense = async () => {
    const path = `users/${authStatus.uid}/expenses`
    await updateDoc(doc(DB, path, id), { date: expenseDate, location: expenseLocation, itemType: expenseItemType, amount: expenseAmount })
    navigation.goBack()
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.textLabel}>Expense Date:</Text>
      <TextInput
        value={expenseDate}
        onChangeText={(val) => setExpenseDate(val)}
        style={styles.textInput}
      />

      <Text style={styles.textLabel}>Expense Location:</Text>
      <TextInput
        value={expenseLocation}
        onChangeText={(val) => setExpenseLocation(val)}
        style={styles.textInput}
      />

      <Text style={styles.textLabel}>Expense For:</Text>
      <TextInput
        value={expenseItemType}
        onChangeText={(val) => setExpenseItemType(val)}
        style={styles.textInput}
      />

      <Text style={styles.textLabel}>Amount:</Text>
      <TextInput
        value={expenseAmount}
        onChangeText={(val) => setExpenseAmount(val)}
        style={styles.textInput}
      />

      <View style={styles.buttonStyles}>
        <TouchableOpacity
          onPress={() => updateExpense()}
          style={styles.buttonUpdate}
        >
          <Text style={styles.updateText}>Update Expense</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => deleteExpense()}
          style={styles.buttonDelete}
        >
          <Text style={styles.deleteText}>Delete Expense</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 10,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    marginLeft: 10,
    padding: 10,
    marginRight: 10,
  },
  buttonStyles: {
    flexDirection: 'column',
    alignSelf: 'center',
  },
  buttonUpdate: {
    borderWidth: 1,
    backgroundColor: '#d1e231',
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  buttonDelete: {
    borderWidth: 1,
    backgroundColor: '#ff1629',
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  updateText: {
    textAlign: 'center',
  },
  deleteText: {
    textAlign: 'center',
  },
  screen: {
    backgroundColor: '#ADD8E6',
  }
})