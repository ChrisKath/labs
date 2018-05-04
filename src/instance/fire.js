import { initializeApp } from 'firebase'

const FIRE = initializeApp({
  apiKey: 'AIzaSyAk0Kab4VOt3dpByyc2khOA92nZjucnw3c',
  authDomain: 'tap10-c388f.firebaseapp.com',
  databaseURL: 'https://tap10-c388f.firebaseio.com',
  projectId: 'tap10-c388f',
  storageBucket: 'tap10-c388f.appspot.com',
  messagingSenderId: '985015798166'
})

export const DB = FIRE.database()
export const REF = name => DB.ref(name)
