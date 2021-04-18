import { BncClient, crypto } from "@binance-chain/javascript-sdk";

const issueToken = async (
  tokenName: string,
  tokenSymbol: string,
  tokenSupply: number,
  isMintable: boolean,
  issuersAddress: string,
  issuersMnemonic: string
) => {
  // Token params
  const tokenSymb = tokenSymbol;
  const tokenSupp = tokenSupply;
  const tokenMint = isMintable;

  // Account params
  const tokenAddr = issuersAddress;
  const mnemonic = issuersMnemonic;
  const privKey = crypto.getPrivateKeyFromMnemonic(mnemonic);

  const api = "https://testnet-dex.binance.org/"; // api string; remove "testnet-" for mainnet
  const net = "testnet"; // or this can be "mainnet"

  const bnbClient = new BncClient(api);
  bnbClient.chooseNetwork(net);

  const main = async () => {
    await bnbClient.setPrivateKey(privKey);
    await bnbClient.initChain();
    await bnbClient.tokens.issue(
      tokenAddr,
      tokenName,
      tokenSymb,
      tokenSupp,
      tokenMint
    );
  };

  await main();

  return true;
};

export default issueToken;
