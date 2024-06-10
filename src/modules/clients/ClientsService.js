import db from '@/utils/firebaseInit.js'
import { doc, setDoc, collection, getDocs, updateDoc, deleteDoc } from 'firebase/firestore'

import dayjs from 'dayjs'

export default {
  async save (client) {
    await setDoc(doc(db, 'clients', client.id), {
      id: client.id,
      active: client.active,
      client_name: client.client_name,
      start_date: client.start_date,
      payment_value: parseFloat(client.payment_value)
    })
  },

  async list () {
    let data = []
    const querySnapshot = await getDocs(collection(db, 'clients'))
    querySnapshot.forEach((doc) => {
      const client = {
        id: doc.id,
        active: doc.data().active,
        client_name: doc.data().client_name,
        start_date: doc.data().start_date,
        payment_value: doc.data().payment_value
      }
      data.push(client)
    })
    data = data.map((item) => {
      return {
        ...item,
        id: item.id,
        start_date: dayjs(item.start_date)?.$d?.toLocaleDateString()
      }
    })

    return data
  },

  async update (client, id) {
    await updateDoc(doc(db, 'clients', id), {
      id: client.id,
      active: client.active,
      client_name: client.client_name,
      start_date: client.start_date,
      payment_value: parseFloat(client.payment_value)
    })
  },

  async delete (client) {
    await deleteDoc(doc(db, 'clients', client.id))
  }
}
