import { Button } from "../Button";

function Preview() {
    return (
      <div className="flex flex-col p-3">
        <div className="flex">
          <span className="w-[30%]">From:</span>
          <span className="ml-auto w-[60%] break-words">
            0xjeco3o8904gfebw...
          </span>
        </div>
        <div className="flex">
          <span className="w-[30%]">To:</span>
          <span className="ml-auto w-[60%] break-words">
            0xjeco3o8904gfebw...
          </span>
        </div>
        <div className="flex">
          <span className="w-[30%]">Amount:</span>
          <span className="ml-auto w-[60%] break-words">100</span>
        </div>
        <div className="flex">
          <span className="w-[30%]">Memo:</span>
          <span className="ml-auto w-[60%] break-words">
            0xjeco3o8904gfebw...0xjeco3o8904gfebw...0xjeco3o8904gfebw...0xjeco3o8904gfebw...
          </span>
        </div>
        <div className="flex">
          <span className="w-[30%]">Gas fee:</span>
          <span className="ml-auto w-[60%] break-words">0.002</span>
        </div>
        <div className="flex">
          <span className="w-[30%]">Total:</span>
          <span className="ml-auto w-[60%] break-words">100.002</span>
        </div>
  
        <Button loading>Proceed</Button>
      </div>
    );
  }