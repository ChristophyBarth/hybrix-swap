import client from "../utils/binance-chain-client-exporter"

const createAccountWithMneomnic = () => {
    return client.createAccountWithMneomnic();
}

export default createAccountWithMneomnic;