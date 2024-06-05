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
    const sessionValue = session.session_value != null ? String(session.session_value) : '0'

    const sessionValueFormatted = sessionValue.replace('R$', '').replace(',', '.')

    const newID = uuid.v1()
    await setDoc(doc(db, 'sessoes', newID), {
      clientId: session.clientId,
      start: session.start,
      end: session.end,
      session_value: parseFloat(sessionValueFormatted),
      confirmation: session.confirmation,
      attended: session.attended,
      payed: session.payed,
      details: session.details,
      color: session.color
    })
  },

  async update (session, id) {
    const sessionValueFormatted = session.session_value.replace('R$', '').replace(',', '.')

    await updateDoc(doc(db, 'sessoes', id), {
      start: session.start,
      end: session.end,
      session_value: parseFloat(sessionValueFormatted),
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
