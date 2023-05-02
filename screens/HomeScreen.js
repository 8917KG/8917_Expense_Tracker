import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { ExpenseContext } from '../contexts/ExpenseContext'
import { DBContext } from '../contexts/DBContext'
import { addDoc, collection } from 'firebase/firestore'
import { ListItem } from '../components/ListItem'
import { ListItemSeparator } from '../components/ListItemSeparator'

export function HomeScreen(props) {

  const navigation = useNavigation()
  const authStatus = useContext(AuthContext)
  const Expenses = useContext(ExpenseContext)
  const DB = useContext(DBContext)

  const [showModal, setShowModal] = useState(false)
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [itemType, setItemType] = useState('')
  const [amount, setAmount] = useState('')

  useEffect(() => {
    if (!authStatus) {
      navigation.reset({ index: 0, routes: [{ name: "SignIn" }] })
    }
  }, [authStatus])

  const saveExpense = async () => {
    setShowModal(false)
    const expenseObj = { date: date, location: location, itemType: itemType, amount: amount }
    //add note to firebase
    const path = `users/${authStatus.uid}/expenses`
    const ref = await addDoc(collection(DB, path), expenseObj)
    setDate('')
    setLocation('')
    setItemType('')
    setAmount('')
  }

  const ListClickHandler = (data) => {
    navigation.navigate("Expense Detail", data)
  }

  return (
    <View>
      <Text style={styles.textTitle}>Welcome To Expense Tracker</Text>
      <Text style={styles.textTitle}>Add, Edit, View and Delete Expenses</Text>
      <Modal
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
        animationType="slide"
        transparent={false}
      >
        <View style={styles.modal}>

          <Text style={styles.modalLabel} >Expense Date:</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="dd/mm/yyyy"
            value={date}
            onChangeText={(val) => setDate(val)}
          />

          <Text style={styles.modalLabel}>Location:</Text>
          <TextInput
            style={styles.modalInput}
            value={location}
            onChangeText={(val) => setLocation(val)}
          />

          <Text style={styles.modalLabel}>Expense For:</Text>
          <TextInput
            style={styles.modalInput}
            value={itemType}
            onChangeText={(val) => setItemType(val)}
          />

          <Text style={styles.modalLabel}>Amount:</Text>
          <TextInput
            style={styles.modalInput}
            value={amount}
            onChangeText={(val) => setAmount(val)}
          />
        </View>

        <View style={styles.buttonStyle}>
          <TouchableOpacity
            onPress={() => saveExpense()}
            style={styles.saveButton}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowModal(false)}
            style={styles.button}
          >
            <Text style={styles.buttonTextClose}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowModal(true)}
      >
        <Text style={styles.buttonText} >Add Expense</Text>
      </TouchableOpacity>

      <FlatList
        data={Expenses}
        renderItem={({ item }) => (
          <ListItem
            date={item.date}
            id={item.id}
            location={item.location}
            amount={item.amount}
            itemType={item.itemType} 
            handler={ ListClickHandler }
          />)}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={ListItemSeparator}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#ADD8E6',
    padding: 10,
    marginTop: 10,
    borderRadius: 50,
    marginLeft: 50,
    marginRight: 50,
  },
  buttonText: {
    textAlign: 'center',
  },
  textTitle: {
    fontWeight: "bold",
    fontSize: 40,
    paddingLeft: 50,
    marginTop: 10,
    color: "#36454F",
    textAlign: "center"
  },
  modalLabel: {
    fontSize: 20,
    marginTop: 5,
  },
  modalInput: {
    backgroundColor: "white",
    color: "black",
    padding: 10,
    borderWidth: 0.8,
    marginTop: 5,
    borderRadius: 30,
  },
  modal: {
    padding: 10,
    flex: 1,
    justifyContent: "start",
    margin: 10,
    backgroundColor: "#1D84B1",
  },
  buttonStyle: {
    flexDirection: "row",
  },
  saveButton: {
    padding: 10,
    backgroundColor: "#28DB3E",
    flex: 1,
    marginVertical: 10,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontSize: 20,
  },
  buttonTextClose: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    marginVertical: 10,
    flex: 1,

  },
  listItem: {
    borderWidth: 1,
    backgroundColor: '#CCCCCC',
    borderRadius: 5,
    marginTop: 5,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 5,
  },

})