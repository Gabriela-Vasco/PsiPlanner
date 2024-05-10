import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAsXELrQ7axNRl7aiUAq9I6IAMb30e_8os',
  authDomain: 'psiplanner-1.firebaseapp.com',
  projectId: 'psiplanner-1',
  storageBucket: 'psiplanner-1.appspot.com',
  messagingSenderId: '247024272476',
  appId: '1:247024272476:web:7c6d90bbed929d613b9299',
  measurementId: 'G-561WXNHJWW'
}

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)

export default db
