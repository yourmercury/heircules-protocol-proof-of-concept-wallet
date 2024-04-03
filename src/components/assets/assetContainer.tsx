import { DivProps } from "@/engine/types";
import NFTs from "./nft";
import Tokens from "./tokens";
import { RouterContext } from "@/context/route.context";
import { useContext } from "react";
import { cn } from "../Button";
import { useNFTs } from "@/hooks/useNFTs";
import { useTokens } from "@/hooks/useTokens";
import { WalletContext } from "@/context/wallet.context";

interface AssetContainerProps extends DivProps {
    
} 

export default function AssetContainer({}:AssetContainerProps){
    const {goto, route2} = useContext(RouterContext);
    const {nfts, tokens} = useContext(WalletContext);

    return (
        <div className="border-[0.5px rounded-xl overflow-hidden w-[700px] mx-auto">
            <div className="border-b-[0.5px] flex items-center">
                <span className={cn("flex-1 text-center p-3 border-r-[0.5px] cursor-pointer hover:bg-gray-800", {'bg-gray-700 hover:bg-gray-700': route2 == 0})} onClick={()=> goto(0,0)}>Tokens</span>
                <span className={cn("flex-1 text-center p-3 cursor-pointer hover:bg-gray-800", {'bg-gray-700 hover:bg-gray-700': route2 == 1})} onClick={()=> goto(0,1)}>NFTs</span>
            </div>

            <div className="">
                {route2 === 0 && <Tokens tokens={tokens}/>}
                {route2 === 1 && <NFTs nfts={nfts}/>}
            </div>
        </div>
    )
}