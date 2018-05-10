import { initializeApp } from 'firebase'

const FIRE = initializeApp({
  apiKey: 'AIzaSyAZT279ZBiNGkWUA04pYQNyWN6BN6WW-h8',
  authDomain: 'touch-d0c06.firebaseapp.com',
  databaseURL: 'https://touch-d0c06.firebaseio.com',
  projectId: 'touch-d0c06',
  storageBucket: 'touch-d0c06.appspot.com',
  messagingSenderId: '381013672111'
})

export default FIRE
export const DB = FIRE.database()
export const SR = FIRE.storage().ref()
