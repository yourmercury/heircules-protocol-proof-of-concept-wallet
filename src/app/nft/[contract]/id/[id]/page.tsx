import SendAssetComp from "@/components/send/sendAssetComp";
import SendNFTComp from "@/components/send/sendNFTComp";
import { hexType } from "@/engine/types";

export default async function Asset({
  params: { contract, id },
}: {
  params: { contract: hexType; id: string };
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_NEXT_URL}api/get-token-info`, {
    body: JSON.stringify({
      addresses: [],
      isNFT: true,
      address: contract,
      id: id,
    }),
    method: 'POST'
  });
  const nft = res.status == 200 ? await res.json() : null;

  console.log(contract, id, nft);
  return <SendNFTComp contract={contract} id={id} nft={nft?.nft} />;
}
