import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { useEffect, useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../contexts/AuthContext'

export function SignUpScreen(props) {

 const [email, setEmail] = useState("")
 const [validEmail, setValidEmail] = useState(false)
 const [password, setPassword] = useState("")
 const [validPw, setValidPw] = useState(false)
 const [validForm, setValidForm] = useState(false)

 const navigation = useNavigation()
 const authStatus = useContext( AuthContext )

 useEffect(() => {
  if (email.indexOf('@') > 0) {
   setValidEmail(true)
  } else {
   setValidEmail(false)
  }
 }, [email])

 useEffect(() => {
  if (password.length >= 8) {
   setValidPw(true)
  }
  else {
   setValidPw(false)
  }
 }, [password])

 useEffect(() => {
  if (validEmail && validPw) {
   setValidForm(true)
  } else {
   setValidForm(false)
  }
 })

 useEffect (() => {
  if (authStatus){
     //navigation.navigate("Home")
    navigation.reset({ index: 0, routes: [{name: "Home"}]})
  }
}, [authStatus])

 return (
  <View style={styles.page}>
   <Text style={styles.title}>Sign Up for an Account</Text>
   <View>

    <Text style={styles.text}>Email address</Text>
    <TextInput
     style={(validEmail) ? styles.validInput : styles.inputEmail}
     placeholder='you@domain.com'
     value={email}
     onChangeText={(emailText) => setEmail(emailText)}
    />

    <Text style={styles.text} >Password</Text>
    <TextInput
     style={(validPw) ? styles.validInput : styles.inputPw}
     placeholder='minimum 8 characters'
     value={password}
     onChangeText={(pwText) => setPassword(pwText)}
     secureTextEntry={true}
    />

   </View>
   <TouchableOpacity
    style={(validForm) ? styles.validButton :styles.button}
    disabled={(validForm) ? false : true}
    onPress={() => props.handler(email, password)}
   >
    <Text style={styles.buttonText} >Sign Up</Text>
   </TouchableOpacity>
   <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
    <Text style={styles.textLink}>Have an Account? Sign in here.</Text>
   </TouchableOpacity>
  </View>
 )
}

const styles = StyleSheet.create({
 page: {
  marginHorizontal: 20,
 },
 title: {
  fontSize: 20,
  textAlign: 'center',
  marginTop: 20,
 },
 inputEmail: {
  borderWidth: 1,
  padding: 10,
  borderRadius: 30,
  marginTop: 5,
 },
 inputPw: {
  borderWidth: 1,
  padding: 10,
  borderRadius: 30,
  marginTop: 5,
 },
 button: {
  backgroundColor: '#CCCCCC',
  padding: 10,
  marginTop: 10,
  borderRadius: 50,
 },
 buttonText: {
  textAlign: 'center',
 },
 text: {
  marginBottom: 5,
  marginTop: 5,
 },
 validInput: {
  borderWidth: 1,
  padding: 10,
  borderRadius: 30,
  marginTop: 5,
  borderColor: 'green'
 },
 validButton:{
  backgroundColor: 'green',
  padding: 10,
  marginTop: 10,
  borderRadius: 50,
 },
 textLink:{
  textAlign:'center',
  marginTop: 5,
 }

})