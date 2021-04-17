import * as functions from 'firebase-functions'
import firebaseAdmin from 'firebase-admin'
import getSwapRateForCurrency from './utils/getSwapRateForCurrency';

firebaseAdmin.initializeApp()

export const getRatesHTTPS = functions.https
.onRequest(
  async (req, res) => {
    const responseData = await getSwapRateForCurrency(req.params.fromCurrency, req.params.toCurrency);
    res.status(200).json(responseData);
  }
);

export const getRatesCallable = functions.https
.onCall(async data => {
  const responseData = await getSwapRateForCurrency(data.fromCurrency, data.toCurrency);
  return responseData;
});
