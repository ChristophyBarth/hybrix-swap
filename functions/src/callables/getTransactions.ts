import client from "../utils/binance-chain-client-exporter";

const getTransactions = async (address: string) => {
  const transactions = await client.getTransactions(address);
  return transactions;
}

export default getTransactions;