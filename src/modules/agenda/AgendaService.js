import db from '@/utils/firebaseInit.js'
import { uuid } from 'vue-uuid'
import { collection, getDocs, doc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore'

export default {
  async list () {
    const data = []
    const querySnapshot = await getDocs(collection(db, 'sessoes'))
    querySnapshot.forEach((doc) => {
      const appData = doc.data()
      appData.id = doc.id
      data.push(appData)
    })

    return data
  },

  async save (session) {
    const newID = uuid.v1()
    await setDoc(doc(db, 'sessoes', newID), {
      clientId: session.clientId,
      start: session.start,
      end: session.end,
      session_value: session.session_value,
      confirmation: session.confirmation,
      attended: session.attended,
      payed: session.payed,
      details: session.details,
      frequency: session.frequency,
      color: session.color
    })
  },

  async update (session, id) {
    await updateDoc(doc(db, 'sessoes', id), {
      start: session.start,
      end: session.end,
      session_value: parseFloat(session.session_value),
      confirmation: session.confirmation,
      attended: session.attended,
      payed: session.payed,
      details: session.details,
      color: session.color
    })
  },

  async delete (session) {
    await deleteDoc(doc(db, 'sessoes', session))
  }
}
