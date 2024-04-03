import { Account, Chain, PrepareTransactionRequestReturnType, PublicClient, WalletClient, encodeFunctionData, erc20Abi, erc721Abi, keccak256, parseAbi, parseEther } from "viem";
import { WalletInterface } from "./walletInterface";
import { RequestType, hexType, walletTypes } from "./types";
import { sendTransaction } from "viem/actions";
import { batchCalldata } from "./handleTx";
import { GetWalletClientData } from "wagmi/query";
import { proxyAbi } from "./smartWalletRegistry";

export default class SmartWallet {
    public abi = proxyAbi;

    constructor(
        public client: WalletClient,
        public address: hexType,
        public pubClient: PublicClient,
        public balance: bigint,
        public gasBalance: bigint,
        public type: 'eoa' | 'smart'
    ) {

    }

    getBalance = (isClient?: boolean) => {
        if (isClient) return Number(this.gasBalance) / 10e17;
        return Number(this.balance) / 10e17;
    }

    getRecoveryInfo = async () => {
        const info = await this.pubClient.readContract({
            abi: this.abi,
            address: this.address,
            functionName: 'getRecoveryInfo',
            account: this.client.account,
        })

        console.log(info);
        return info;
    }

    transferNative = async (to: hexType, amount: number) => {
        let data = encodeFunctionData({
            abi: this.abi,
            functionName: 'transferNative',
            args: [to, parseEther(amount.toString())],
        })

        console.log("here");

        let request = await this.client.sendTransaction({
            to: this.address,
            chain: this.client.chain,
            data,
            account: this.client.account as Account
        });

        return request;
    }

    prepareDappTx = async (data: hexType) => {
        if (this.type !== 'smart') return;
        return await this.client.prepareTransactionRequest({
            data,
            to: this.address,
            chain: this.client.chain,
            account: this.client.account,
            value: BigInt(0)
        })
    }

    transferTokens = async (contract: hexType, to: hexType, amount: number, isNFT?: boolean) => {
        let data: hexType;

        if (isNFT) {
            data = encodeFunctionData({
                abi: this.abi,
                functionName: 'transferERC721',
                args: [contract, to, amount],
            })
        }
        else {
            data = encodeFunctionData({
                abi: this.abi,
                functionName: 'transferERC20',
                args: [contract, to, parseEther(amount.toString())],
            })
        }


        const hash = await this.client.sendTransaction({
            data,
            to: this.type == "eoa" ? contract : this.address,
            chain: this.client.chain,
            account: this.client.account as Account,
            value: BigInt(0)
        });

        console.log(hash);
        return hash;
    }

    addRecovery = async (addresses: string[], secret: string, kinWindow: number) => {

        try {
            const hashes: hexType[] = [];
            const secretHash = keccak256(secret as hexType);

            addresses.forEach((addr) => {
                hashes.push(keccak256(addr as hexType));
            });

            console.log(hashes, secretHash);

            let hash = await this.client.writeContract({
                chain: this.client.chain as Chain,
                account: this.client.account as Account,
                abi: this.abi,
                args: [hashes, secretHash, BigInt(kinWindow)],
                functionName: 'addRecovery',
                address: this.address,
            });

            console.log(hash);

            let r = await this.pubClient.waitForTransactionReceipt({ hash });
            if (r.status !== 'success') {
                throw 'error'
            };
            return r;
        } catch (error) {
            console.log(error);
            throw error;
        }

    }

    static kinRecovery = async(client: WalletClient, pubClient: PublicClient, account: hexType)=>{
        const hash = await client.writeContract({
            abi: proxyAbi,
            account: client.account as Account,
            functionName: 'kinRecovery',
            address: account,
            chain: client.chain,
        })

        let tx = await pubClient.waitForTransactionReceipt({hash});
        return tx;
    }

    static socialRecovery = async(client: WalletClient, pubClient: PublicClient, account: hexType, secret: string, newOwner: hexType)=>{
        const hash = await client.writeContract({
            abi: proxyAbi,
            account: client.account as Account,
            functionName: 'recoverAccount',
            args: [secret, newOwner],
            address: account,
            chain: client.chain,
        })

        let tx = await pubClient.waitForTransactionReceipt({hash});
        return tx;
    }

    runTx = async (request: PrepareTransactionRequestReturnType) => {
        return await this.client.sendTransaction({
            to: request.to,
            chain: this.client.chain,
            data: request.data,
            account: this.client.account as Account,
            gas: request.gas,
        })
    }
}