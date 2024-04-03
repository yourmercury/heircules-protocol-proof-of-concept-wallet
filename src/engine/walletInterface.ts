import { PrepareTransactionRequestReturnType, PublicClient, WalletClient } from "viem";
import { RequestType, hexType } from "./types";

export interface WalletInterface {
    client: WalletClient;
    pubClient: PublicClient;
    address: hexType;
    type: 'eoa' | 'smart'

    runTx:(request: PrepareTransactionRequestReturnType) => Promise<hexType>;
}