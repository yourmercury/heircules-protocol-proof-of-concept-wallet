import { NextRequest, NextResponse } from "next/server";
import Moralis from 'moralis'

//@ts-ignore
import { EvmChain } from "@moralisweb3/common-evm-utils";


export const POST = async (request: NextRequest) => {
    try {
        const { addresses, address, isNFT, id } = await request.json();

        if (!Moralis.Core.isStarted) {
            await Moralis.start({
                apiKey: process.env.MORALIS_SK
            });
        }

        const chain = EvmChain.SEPOLIA;

        if (!isNFT) {
            const res = await Moralis.EvmApi.token.getWalletTokenBalances({
                address,
                tokenAddresses: addresses,
                chain
            });


            // const res = await Moralis.EvmApi.token.getTokenMetadata({
            //     addresses,
            //     chain
            // });
            

            return NextResponse.json(res.result);
        }
        else {
            console.log(address, id);
            let res = await Moralis.EvmApi.nft.getNFTMetadata({
                address: address,
                tokenId: id as string,
                chain
            })

            return NextResponse.json({ nft: res?.result });
        }


    } catch (error) {
        console.log(error);
        return new NextResponse(null, { status: 500 });
    }
}