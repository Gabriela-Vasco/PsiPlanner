import db from '@/utils/firebaseInit.js'
import { collection, getDocs } from 'firebase/firestore'
import dayjs from 'dayjs'

export default {
  async list () {
    let data = []
    const querySnapshot = await getDocs(collection(db, 'sessoes'))
    querySnapshot.forEach((doc) => {
      const session = {
        id: doc.id,
        ...doc.data()
      }
      data.push(session)
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
