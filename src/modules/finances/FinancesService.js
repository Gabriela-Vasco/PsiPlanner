import db from '@/utils/firebaseInit.js'
import { doc, setDoc, collection, getDocs, updateDoc, deleteDoc } from 'firebase/firestore'

export default {
  async saveBillToPay (billToPay) {
    await setDoc(doc(db, 'bills_to_pay', billToPay.id), {
      id: billToPay.id,
      provider: billToPay.provider,
      due_date: billToPay.due_date,
      payment_date: billToPay.payment_date,
      value: parseFloat(billToPay.value),
      situation: billToPay.situation
    })
  },

  async listBillsToPay () {
    const data = []
    const querySnapshot = await getDocs(collection(db, 'bills_to_pay'))
    querySnapshot.forEach((doc) => {
      const client = {
        id: doc.id,
        provider: doc.data().provider,
        due_date: doc.data().due_date,
        payment_date: doc.data().payment_date,
        value: doc.data().value,
        situation: doc.data().situation
      }
      data.push(client)
    })

    return data
  },

  async updateBillToPay (billToPay, id) {
    await updateDoc(doc(db, 'bills_to_pay', id), {
      id: billToPay.id,
      provider: billToPay.provider,
      due_date: billToPay.due_date,
      payment_date: billToPay.payment_date,
      value: parseFloat(billToPay.value),
      situation: billToPay.situation
    })
  },

  async deleteBillToPay (billToPay) {
    await deleteDoc(doc(db, 'bills_to_pay', billToPay.id))
  },

  async saveBillToReceive (billToReceive) {
    await setDoc(doc(db, 'bills_to_receive', billToReceive.id), {
      id: billToReceive.id,
      id_client: billToReceive.id_client,
      due_date: billToReceive.due_date,
      payment_date: billToReceive.payment_date,
      value: parseFloat(billToReceive.value),
      situation: billToReceive.situation
    })
  },

  async listBillsToReceive () {
    const data = []
    const querySnapshot = await getDocs(collection(db, 'bills_to_receive'))
    querySnapshot.forEach((doc) => {
      const client = {
        id: doc.id,
        id_client: doc.data().id_client,
        due_date: doc.data().due_date,
        payment_date: doc.data().payment_date,
        value: doc.data().value,
        situation: doc.data().situation
      }
      data.push(client)
    })

    return data
  },

  async updateBillToReceive (billToReceive, id) {
    await updateDoc(doc(db, 'bills_to_receive', id), {
      id: billToReceive.id,
      id_client: billToReceive.id_client,
      due_date: billToReceive.due_date,
      payment_date: billToReceive.payment_date,
      value: parseFloat(billToReceive.value),
      situation: billToReceive.situation
    })
  },

  async deleteBillToReceive (billToReceive) {
    await deleteDoc(doc(db, 'bills_to_receive', billToReceive.id))
  }
}
