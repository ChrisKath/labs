import FIREBASE from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/functions'

FIREBASE.initializeApp({
  apiKey: 'AIzaSyAZT279ZBiNGkWUA04pYQNyWN6BN6WW-h8',
  authDomain: 'touch-d0c06.firebaseapp.com',
  databaseURL: 'https://touch-d0c06.firebaseio.com',
  projectId: 'touch-d0c06',
  storageBucket: 'touch-d0c06.appspot.com',
  messagingSenderId: '381013672111'
})

const store = FIREBASE.firestore()
store.settings({
  timestampsInSnapshots: true
})

export default FIREBASE
export const DB = store
export const STORAGE = FIREBASE.storage().ref()
