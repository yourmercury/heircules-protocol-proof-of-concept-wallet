// import { PublicClient, WalletClient, parseEther } from "viem";
// import { WalletInterface } from "./walletInterface";
// import { hexType } from "./types";

// export default class EOAWallet implements WalletInterface {
//     constructor(
//         public client: WalletClient,
//         public address: hexType,
//         public pubClient: PublicClient,
//         public type: 'eoa' | 'smart'
//     ){
        
//     }

    
//     prepareNativeTx = async (to: hexType, amount: number) => {
//         let request = this.client.prepareTransactionRequest({
//             to,
//             chain: this.client.chain,
//             value: parseEther(amount.toString())
//         })

//         return request;
//     }

//     sendNative = async <PrepareTransactionRequestReturnType>(request: PrepareTransactionRequestReturnType) => {
//         return `0x` as hexType;
//     }

//     sendNFT = async(contract:hexType, to: hexType, id: number, prepareTx?:boolean)=>{
//         return `0x` as hexType
//     }

//     sendToken = async(contract: hexType, to: hexType, amount: number, prepareTx?:boolean)=>{
//         return `0x` as hexType
//     }

//     handleTx = async(data: hexType, prepareTx?:boolean)=>{
//         return `0x` as hexType
//     }
// }