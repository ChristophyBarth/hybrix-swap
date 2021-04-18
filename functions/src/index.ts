import * as functions from "firebase-functions";
import firebaseAdmin from "firebase-admin";
import getSwapRateForCurrency from "./utils/getSwapRateForCurrency";

firebaseAdmin.initializeApp();

const limits = {
  timeoutSeconds: 540,
  memory: "1GB",
};

/**
 * Gets the swap rates for any two cutrrencies/assets/tokens on the hybrix blockchain
 * @param {string} fromCurrency The currency to swap from
 * @param {string} toCurrency The currency to swap to
 * @returns {Object} The swap rate
 */
export const getRatesHTTPS = functions
  .runWith(limits as any)
  .https.onRequest(async (req, res) => {
    const responseData = await getSwapRateForCurrency(
      req.params.fromCurrency,
      req.params.toCurrency
    );
    res.status(200).json(responseData);
  });

/**
 * Similar to the one above, but instead of being called via a http request, it's called inside the app as a callable function
 */
export const getRatesCallable = functions
  .runWith(limits as any)
  .https.onCall(async (data) => {
    const responseData = await getSwapRateForCurrency(
      data.fromCurrency,
      data.toCurrency
    );
    return responseData;
  });

/**
 * Creates a new account on the binance blockchain
 * @returns {Object} The private key and public address of the new account
 */
export const createAccount = functions
  .runWith(limits as any)
  .https.onCall(() => {
    const createAccount = require("./callables/createAccount");
    const account =  createAccount();
    console.log(account);
    return account;
  });

/**
 * Creates a new account like the one above
 * @returns {Object} The private key, public address and mnemonic of the new account
 */
export const createAccountWithMneomnic = functions
  .runWith(limits as any)
  .https.onCall(() => {
    const createAccountWithMneomnic = require("./callables/createAccountWithMneomnic");
    return createAccountWithMneomnic();
  });

/**
 * Gets the balance for an account
 * @param {address} address The public address of the account
 */
export const getBalance = functions
  .runWith(limits as any)
  .https.onCall(async (data) => {
    const address = data.address;
    const getBalance = require("./callables/getBalance");
    return await getBalance(address);
  });

/**
 * Gets information about an account
 * @paramm {string} addres The public key of the account
 * @returns {Object} The account info
 */
export const getAccount = functions
  .runWith(limits as any)
  .https.onCall(async (data) => {
    const address = data.address;
    const getAccount = require("./callables/getAccount");
    const account = await getAccount(address);
    return account;
  });

/**
 * Transfers assets from one account to another
 * @param {string} fromAddress The public address of the sender
 * @param {string} toAddress The recipients public address
 * @param {number} amount The amount to send
 * @param {memo} memoonal Optional memo
 * @param {number} sequence Sequence from the sender's account
 *
 * @returns {Object} The response, success or error
 */
export const transfer = functions
  .runWith(limits as any)
  .https.onCall(async (data) => {
    const { fromAddress, toAddress, amount, asset, memo, sequence } = data;

    const transfer = require("./callables/tranfer");
    const response = await transfer(
      fromAddress,
      toAddress,
      amount,
      asset,
      memo,
      sequence
    );
    return response;
  });

/**
 * Gets transactions for the given account
 * @param {string} address The public key of the account to be checked
 *
 * @returns {Object} The response
 */
export const getTransactions = functions
  .runWith(limits as any)
  .https.onCall(async (data) => {
    const address = data.address;
    const getTransactions = require("./callables/getTransactions");
    const response = await getTransactions(address);
    return response;
  });

/**
 * Creates a new token/asset on the binance blockchain
 */
export const issueToken = functions
  .runWith(limits as any)
  .https.onCall(async (data) => {
    const {
      tokenName,
      tokenSymbol,
      tokenSupply,
      isMintable,
      issuersAddress,
      issuersMnemonic,
    } = data;

    const issueAsset = require("./callables/issueToken");
    const isSuccessful = await issueAsset(
      tokenName,
      tokenSymbol,
      tokenSupply,
      isMintable,
      issuersAddress,
      issuersMnemonic
    );
    return isSuccessful;
  });

// testnet
