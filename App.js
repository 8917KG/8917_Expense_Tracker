import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';

//Screens
import { HomeScreen } from './screens/HomeScreen';
import { SignUpScreen } from './screens/SignUpScreen';
import { SignInScreen } from './screens/SignInScreen';
import { ExpenseDetail } from './screens/ExpenseDetail';
import { TabScreen } from './screens/TabScree';

//Context
import { AuthContext } from './contexts/AuthContext';
import { ExpenseContext } from './contexts/ExpenseContext';
import { FBAuthContext } from './contexts/FBAuthContext';
import { DBContext } from './contexts/DBContext';

//Firebase
import { firebaseConfig } from './config/Config';
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore'

const Stack = createNativeStackNavigator();

const FBApp = initializeApp(firebaseConfig)
const FBAuth = getAuth(FBApp)
const FBdb = getFirestore(FBApp)

export default function App() {

  const [auth, setAuth] = useState()
  const [errorMsg, setErrorMsg] = useState()
  const [expenseData, setExpenseData] = useState([])

  onAuthStateChanged(FBAuth, (user) => {
    if (user) {
      setAuth(user)
    }
    else {
      setAuth(null)
    }
  })

  useEffect(() => {
    if (expenseData.length === 0 && auth) {
      GetData()
    }
  })

  const SignUp = (email, password) => {
    createUserWithEmailAndPassword(FBAuth, email, password)
      .then((userCredential) => console.log(userCredential))
      .catch((error) => console.log(error))
  }

  const SignIn = (email, password) => {
    signInWithEmailAndPassword(FBAuth, email, password)
      .then((userCredential) => console.log(userCredential))
      .catch((error) => console.log(error))
  }

  const GetData = () => {
    const userId = auth.uid
    const path = `users/${userId}/expenses`
    const dataQuery = query(collection(FBdb, path))
    const unsubscribe = onSnapshot(dataQuery, (responseData) => {
      let expenses = []
      responseData.forEach((expense) => {
        let item = expense.data()
        item.id = expense.id
        expenses.push(item)
      })
      //console.log(expenses)
      setExpenseData(expenses)
    })
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignUp">
          {(props) =>
            <AuthContext.Provider value={auth}>
              <SignUpScreen {...props} handler={SignUp} />
            </AuthContext.Provider>
          }
        </Stack.Screen>
        <Stack.Screen name="SignIn" >
          {(props) =>
            <AuthContext.Provider value={auth}>
              <SignInScreen {...props} handler={SignIn} />
            </AuthContext.Provider>
          }
        </Stack.Screen>
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {(props) =>
            <FBAuthContext.Provider value={FBAuth}>
              <DBContext.Provider value={FBdb}>
                <AuthContext.Provider value={auth}>
                  <ExpenseContext.Provider value={expenseData}>
                    <TabScreen {...props} />
                  </ExpenseContext.Provider>
                </AuthContext.Provider>
              </DBContext.Provider>
            </FBAuthContext.Provider>
          }
        </Stack.Screen>
        <Stack.Screen name='Expense Detail'>
          {(props) =>
            <DBContext.Provider value={FBdb}>
              <AuthContext.Provider value={auth}>
                <ExpenseDetail {...props} />
              </AuthContext.Provider>
            </DBContext.Provider>
          }
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
