import * as functions from 'firebase-functions'
import firebaseAdmin from 'firebase-admin'
import getSwapRateForCurrency from './utils/getSwapRateForCurrency';

firebaseAdmin.initializeApp();

const limits = {
  timeoutSeconds: 540,
  memory: '1GB'
}

export const getRatesHTTPS = functions.runWith(limits as any).https
.onRequest(
  async (req, res) => {
    const responseData = await getSwapRateForCurrency(req.params.fromCurrency, req.params.toCurrency);
    res.status(200).json(responseData);
  }
);

export const getRatesCallable = functions.runWith(limits as any).https
.onCall(async data => {
  const responseData = await getSwapRateForCurrency(data.fromCurrency, data.toCurrency);
  return responseData;
});
