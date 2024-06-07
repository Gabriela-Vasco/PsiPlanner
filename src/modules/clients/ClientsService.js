import db from '@/utils/firebaseInit.js'
import { doc, setDoc, collection, getDocs } from 'firebase/firestore'
import { uuid } from 'vue-uuid'
import dayjs from 'dayjs'

export default {
  async save (client) {
    const newID = uuid.v1()
    const querySnapshot = await setDoc(doc(db, 'clients', newID), {
      active: client.active,
      client_name: client.client_name,
      start_date: client.start_date
    })

    console.log('querySnapshot', querySnapshot)

    return querySnapshot
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
        start_date: dayjs(item.start_date)?.$d?.toLocaleDateString()
      }
    })

    return data
  }
}
