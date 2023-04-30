import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useState, useEffect } from 'react'

export function HomeScreen(props) {

  const navigation = useNavigation()

  const [showModal, setShowModal] = useState(false)
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [itemType, setItemType] = useState('')
  const [amount, setAmount] = useState('')

  useEffect(() => {
    if (!props.authStatus) {
      //navigation.navigate("SignIn")
      navigation.reset({ index: 0, routes: [{ name: "SignIn" }] })
    }
  }, [props.authStatus])

  const saveExpense = () => {
    setShowModal(false)
    const expenseObj = {date: date, location: location, itemType: itemType, amount: amount}
    props.add(expenseObj)
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

})