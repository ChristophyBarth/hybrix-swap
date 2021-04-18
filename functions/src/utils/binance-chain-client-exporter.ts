import { BncClient } from "@binance-chain/javascript-sdk"

const apiUrls = {
    mainnet: ' https://dex.binance.org/',
    testnet: 'https://testnet-dex.binance.org/'
}

const client = new BncClient(apiUrls.testnet)
client.initChain();

export default client;