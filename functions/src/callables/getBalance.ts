import client from "../utils/binance-chain-client-exporter";

const getBalance = async (address: string) => {
    const balance = (await client.getBalance(address)) as Object[];
    return balance;
}

export default getBalance;
