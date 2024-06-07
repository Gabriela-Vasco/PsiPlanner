import db from '@/utils/firebaseInit.js'
import { collection, getDocs } from 'firebase/firestore'
import dayjs from 'dayjs'
// import { uuid } from 'vue-uuid'

export default {
//   async save (client) {
//     const newID = uuid.v1()
//     await setDoc(doc(db, 'sessoes', newID), {
//       clientId: client.active,
//       appointment_time: client.appointment_time,
//       client_name: client.client_name,
//       payment_value: client.payment_value,
//       start_date: Timestamp.fromDate(client.start_date.toDate())
//     })
//   },

  async list () {
    let data = []
    const querySnapshot = await getDocs(collection(db, 'sessoes'))
    querySnapshot.forEach((doc) => {
      data.push(doc.data())
    })
    data = data.map((item) => {
      return {
        ...item,
        start: dayjs(item.start)?.$d?.toLocaleDateString(),
        session_date: dayjs(item.session_date)?.$d?.toLocaleTimeString().slice(0, 5)
      }
    })

    return data
  }
}
