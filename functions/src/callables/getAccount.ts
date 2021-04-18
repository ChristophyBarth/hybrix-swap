import client from "../utils/binance-chain-client-exporter";

const getAccount = async (address: string) => {
    const account = await client.getAccount(address);
    return account;
}

export default getAccount;
