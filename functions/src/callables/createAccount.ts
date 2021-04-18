import client from "../utils/binance-chain-client-exporter";

const createAccount = () => {
    const account = client.createAccount();
    return account;
};

export default createAccount;
