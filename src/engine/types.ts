import { HTMLProps } from "react";

export type hexType = `0x${string}`;

export interface RequestType { to: hexType, data: hexType, gas: bigint }

export interface DivProps extends HTMLProps<HTMLDivElement> { }

export type walletTypes = 'eoa' | 'smart';

export type basicMetadata = {name: string, description: string, image: string}

export interface NFTType {
    amount:string
    block_number:string
    block_number_minted:string
    metadata: any
    name:string
    symbol:string
    token_address:string
    token_hash:string
    token_id:string
    token_uri:string;
    tokenUri?: string
    tokenId?: string
    tokenAddress?: string;
    tokenHash?: string;
}


export interface RecoveryInfoI {
    canRecover: hexType[];
    passcodeHash: hexType;
    window: bigint;
    pingedAt: bigint;
    initialized: boolean;
  }