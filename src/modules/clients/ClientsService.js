import db from '@/utils/firebaseInit.js'
import { doc, setDoc, Timestamp, collection, getDocs } from 'firebase/firestore'
import { uuid } from 'vue-uuid'

export default {
  async save (client) {
    const newID = uuid.v1()
    await setDoc(doc(db, 'clients', newID), {
      active: client.active,
      client_name: client.client_name,
      start_date: Timestamp.fromDate(client.start_date.toDate())
    })
  },

  async list () {
    let data = []
    const querySnapshot = await getDocs(collection(db, 'clients'))
    querySnapshot.forEach((doc) => {
      data.push(doc.data())
    })
    data = data.map((item) => {
      return {
        ...item,
        start_date: item.start_date.toDate().toLocaleDateString()
      }
    })

    return data
  }
}
