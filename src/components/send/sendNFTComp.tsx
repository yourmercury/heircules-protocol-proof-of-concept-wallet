'use client';
import { NFTType, hexType } from "@/engine/types";
import SendComp from "./sendComp";
import { useContext } from "react";
import { WalletContext } from "@/context/wallet.context";
import { parseIpfs } from "@/utils";

interface SendNFTCompProps {
  contract: hexType;
  id: string;
  nft?:  NFTType
}

interface NFTPreviewProps {
  nft: NFTType;
}

export default function SendNFTComp({ contract, id, nft }: SendNFTCompProps) {
  const {wallet} = useContext(WalletContext);
  if (!nft) return null;
  return (
    <div>
      <NFTPreview nft={nft} />
      <div className="my-10"></div>
      {wallet && <SendComp contract={contract} id={id} />}
    </div>
  );
}

function NFTPreview({ nft }: NFTPreviewProps) {
  return (
    <div className="flex w-[800px] bg-gray-900 rounded-xl p-10 mx-auto mt-10 overflow-hidden max-h-[250px] box-content">
      <img
        src={parseIpfs(nft.metadata?.image )|| "/assets/empty-token.webp"}
        alt=""
        className="h-[250px] max-w-[400px] mr-10 rounded-xl"
      />
      <div className="flex flex-col max-h-full overflow-scroll">
        <span className="text-gray-500 text-[15px]">
          <span className="font-bold text-white">Name -</span> {nft.name}#
          {nft.token_id || nft.tokenId}
        </span>
        <span className="text-gray-500 text-[15px] my-2">
          <span className="font-bold text-white">Title -</span>{" "}
          {nft.metadata?.title || nft.metadata?.collection}
        </span>
        <span className="text-gray-500 text-[15px]">
          <span className="font-bold text-white">Description -</span>{" "}
          {nft.metadata?.description}
        </span>
      </div>
    </div>
  );
}
