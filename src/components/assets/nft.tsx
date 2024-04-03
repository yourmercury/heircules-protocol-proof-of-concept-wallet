import { NFTType, basicMetadata } from "@/engine/types";
import { parseIpfs } from "@/utils";
import { useRouter } from "next/navigation";
import { HTMLProps } from "react";

interface NFTCompInterface extends HTMLProps<HTMLDivElement> {
    title: string;
    image: string;
    tokenId: string | number;
}

export default function NFTs({nfts}:{nfts?: NFTType[] | null}){
    const router = useRouter();
    
    return (
        <div className="p-3 grid grid-cols-5 gap-2 w-fit mx-auto max-h-[300px] overflow-y-scroll border-b-[0.5px]">
            {nfts?.map((nft, index)=>{
                const meta: basicMetadata = JSON.parse(nft.metadata);
                return <div key={index} onClick={()=>{
                    router.push(`/nft/${nft.token_address}/id/${nft.token_id}`);
                }}>
                    <NFT image={meta?.image} tokenId={nft.token_id} title={nft?.name}/>
                </div>
            })}
            
        </div>
    )
}

function NFT({title, image, tokenId, ...props}: NFTCompInterface){

    return (
        <div {...props} className="flex flex-col items-center w-fit p-2 bg-gray-900 rounded-lg cursor-pointer hover:bg-gray-800">
            <img src={parseIpfs(image) || '/assets/unknown_token.png'} className="w-[120px] h-[120px] object-cover rounded-lg mb-2" alt="" />
            <div className="w-full overflow-x-clip">
                <abbr title={title}>{title.substring(0,7)}...</abbr>
                <br />
                #{tokenId}
            </div>
        </div>
        
    )
}

