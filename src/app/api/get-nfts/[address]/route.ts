import { NextRequest, NextResponse } from "next/server";
import Moralis from 'moralis'
//@ts-ignore
import { EvmChain } from "@moralisweb3/common-evm-utils"; 

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
        const response = await Moralis.EvmApi.nft.getWalletNFTs({
            address,
            chain,
        });

        const res = [];

        for(let i=0; i < response.result.length; i++){
            let nft = response.result[i];
            let metadata = await Moralis.EvmApi.nft.getNFTMetadata({
                address: nft.tokenAddress,
                tokenId: nft.tokenId as string,
                chain
            })

            res.push(metadata?.toJSON());
        }

        return NextResponse.json(res);

    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify(error), { status: 500 });
    }
}