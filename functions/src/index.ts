import * as functions from 'firebase-functions'
import firebaseAdmin from 'firebase-admin'
import getSwapRateForCurrency from './utils/getSwapRateForCurrency';

firebaseAdmin.initializeApp();

const limits = {
  timeoutSeconds: 540,
  memory: '1GB'
}

/**
 * Gets the swap rates for any two cutrrencies/assets/tokens on the hybrix blockchain
 * @param {string} fromCurrency The currency to swap from
 * @param {string} toCurrency The currency to swap to
 * @returns {Object} The swap rate
 */
export const getRatesHTTPS = functions.runWith(limits as any).https
.onRequest(
  async (req, res) => {
    const responseData = await getSwapRateForCurrency(req.params.fromCurrency, req.params.toCurrency);
    res.status(200).json(responseData);
  }
);

/**
 * Similar to the one above, but instead of being called via a http request, it's called inside the app as a callable function
 */
export const getRatesCallable = functions.runWith(limits as any).https
.onCall(async data => {
  const responseData = await getSwapRateForCurrency(data.fromCurrency, data.toCurrency);
  return responseData;
});


/**
 * Creates a new account on the binance blockchain
 * @returns {Object} The private key and public address of the new account
 */
export const createAccount = functions.runWith(limits as any).https.onCall(() => {
  const createAccount = require('./callables/createAccount');
  return createAccount();
});

/**
 * Creates a new account like the one above
 * @returns {Object} The private key, public address and mnemonic of the new account
 */
export const createAccountWithMneomnic = functions.runWith(limits as any).https.onCall(() => {
  const createAccountWithMneomnic = require('./callables/createAccountWithMneomnic');
  return createAccountWithMneomnic();
});

/**
 * Gets the balance for an account
 * @param {address} address The public address of the account
 */
export const getBalance = functions.runWith(limits as any).https.onCall(async (data) => {
  const address = data.address;
  const getBalance = require('./callables/getBalance');
  return await getBalance(address);
});

export const getAccount = functions.runWith(limits as any).https.onCall(async (data) => {
  const address = data.address;
  const getAccount = require('./callables/getAccount');
  const account = await getAccount(address);
  return account;
});

export const transfer = 

export const issueToken = 

export const getTransactions = 
