import client from "../utils/binance-chain-client-exporter";

const transfer = async (
  fromAddress: string,
  toAddress: string,
  amount: number,
  asset: string,
  memo?: string,
  sequence?: number
) => {
  const response = await client.transfer(
    fromAddress,
    toAddress,
    amount,
    asset,
    memo,
    sequence
  );

  return response;
};

export default transfer;
