import { NextRequest, NextResponse } from "next/server";
import Moralis from 'moralis'
//@ts-ignore
import { EvmChain, GetTokenMetadataResponseAdapter } from "@moralisweb3/common-evm-utils";


export const GET = async (request: NextRequest, { params: { address } }: { params: { address: string } }) => {

    let chainId = request.nextUrl.searchParams.get('chainId') || "11155111";
    let pageKey = request.nextUrl.searchParams.get('pageKey') || undefined;

    try {
        if (!Moralis.Core.isStarted) {
            await Moralis.start({
                apiKey: process.env.MORALIS_SK
            });
        }

        const chain = EvmChain.SEPOLIA;
        const response = await Moralis.EvmApi.token.getWalletTokenBalances({
            address,
            chain,
        });

        // let res: GetTokenMetadataResponseAdapter;
        // let addresses = [];
        // for(let i=0; i<response.result.length; i++){
        //     let token = response.result[i].token?.contractAddress;
        //     token&&addresses.push(token);
        // }
        
        // res = await Moralis.EvmApi.token.getTokenMetadata({
        //     addresses
        // });

        return NextResponse.json(response.result);

    } catch (error) {
        return new NextResponse(JSON.stringify(error), { status: 500 });
    }
}