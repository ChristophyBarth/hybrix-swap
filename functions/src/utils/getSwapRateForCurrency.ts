const getSwapRateForCurrency = (currency: string) => {

};

async () => {
    try {
      const res1 = await axios.get(
        'https://swap.hybrix.io/engine/deal/estimate/hy/xrp/',
      )

      const processId = res1.data.data

      const res2 = await axios.get(`https://swap.hybrix.io/p/${processId}`)

      const data = res2.data

      const docRef = firebaseAdmin
        .firestore()
        .collection('Swap-Rates')
        .doc('Rates')

      const doc = await docRef.get()

      const docData = doc.data()

      const docDataString = JSON.stringify(docData)

      const dataString = JSON.stringify(data)

      let hasChanged = false

      if (docDataString == dataString) {
        hasChanged = false
      } else {
        hasChanged = true
      }

      if (hasChanged) {
        const res = await docRef.set(JSON.parse(JSON.stringify(res2)))
        console.log(res2)
        return res
      } else {
        const res = await docRef.set(JSON.parse(JSON.stringify({
          lastChangeTimestamp: Date.now() || new Date().getTime(),
        })))
        return res
      }
    } catch (error) {
      console.error(error)
      return error
    }
  }