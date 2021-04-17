import axios from "axios";
import firebaseAdmin from "firebase-admin";

export class SwapResponse {
  id: any;
  error: any;

  constructor(data: { id: any; error: any }) {
    this.id = data.id;
    this.error = data.error;

    return this;
  }
}

const fetchUntillNotNull = (url: string) =>
  new Promise(async (resolve) => {
    let res = (await axios.get(url)).data;

    const reFetch = async () => {
      if (res.data == null) {
        res = (await axios.get(url)).data;
        reFetch();
      } else {
        resolve(res as any);
      }
    };

    await reFetch();
  });

const getSwapRateForCurrency = async (
  fromCurrency: string,
  toCurrency: string
) => {
  try {
    const res1 = (
      await axios.get(
        `https://swap.hybrix.io/engine/deal/estimate/${fromCurrency}/${toCurrency}`
      )
    ).data;

    const processId = res1.data;

    //const res2 = (await axios.get(`https://swap.hybrix.io/p/${processId}`))
      //.data;

    const url = `https://swap.hybrix.io/p/${processId}`;
    const res2 = (await fetchUntillNotNull(url)) as any;

    const doc = await firebaseAdmin
      .firestore()
      .collection("Swap-Rates")
      .add(res2);

    const id = doc.id;

    return new SwapResponse({
      id,
      error: 0,
    });
  } catch (err) {
    const error = `${err}`;

    return new SwapResponse({
      id: 0,
      error,
    });
  }
};

export default getSwapRateForCurrency;
