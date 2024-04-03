import { RecoveryInfoI, hexType } from "@/engine/types";
import { HTMLProps, useContext, useEffect, useState } from "react";
import { Button, SpinningWheel } from "../Button";
import { WalletContext } from "@/context/wallet.context";

interface AddressInputProps extends HTMLProps<HTMLTextAreaElement> {
  setValue: (v: string) => void;
}

export default function RecoveryComp({}) {
  const { wallet } = useContext(WalletContext);
  const [recoveryInfo, setRecoveryInfo] = useState<RecoveryInfoI | null>();
  const [kin, setKin] = useState<string>("");
  const [secret, setSecret] = useState("");
  const [kinWindow, setKinWindow] = useState("");
  const [loading, setLoading] = useState(false);

  function getKinWindow() {
    if (recoveryInfo?.initialized) {
      let isPassed =
        (Number(recoveryInfo.pingedAt) + Number(recoveryInfo.window)) <
        (Date.now() / 1000);
      let canRecoverAt = new Date(
        (Number(recoveryInfo.pingedAt) + Number(recoveryInfo.window)) * 1000
      ).toString();

      return { isPassed, canRecoverAt };
    }

    return {isPassed: false, canRecoverAt: new Date().toString()};
  }

  function addRecovery() {
    if (!wallet) return;
    if (!secret) return;
    if (!kin) return;
    if (!kinWindow) return;

    setLoading(true);

    let k = kin.split(" ").join("").split(",");

    wallet
      .addRecovery(k, secret, Number(kinWindow))
      .then((hash) => {
        setLoading(false);
        alert("Complete");
      })
      .catch(() => {
        setLoading(false);
        alert("Something went wrong");
      });
  }

  useEffect(() => {
    if (!wallet) return;
    wallet
      .getRecoveryInfo()
      .then((info) => {
        setRecoveryInfo((info as RecoveryInfoI) || null);
      })
      .catch((error) => {
        console.log(error);
        setRecoveryInfo(null);
      });
  }, []);

  if (recoveryInfo === undefined) {
    return (
      <div className="flex justify-center items-center mt-10">
        <SpinningWheel className="w-[100px] h-[100px]" />
      </div>
    );
  } else if (recoveryInfo === null) {
    return <div className="text-center mt-10">Something went wrong!</div>;
  } else if (recoveryInfo.initialized) {
    let kinWindow = getKinWindow() as {
      isPassed: boolean;
      canRecoverAt: string;
    };

    console.log(kinWindow)
    return (
      <div className="w-fit mx-auto max-w-[500px] mt-10">
        You have set up your recovery.
        {kinWindow.isPassed && <div>Kin can recover account <span className="text-green-600">Now</span></div>}
        {!kinWindow.isPassed && <div>Kin can recover account at <span className="text-green-600">{kinWindow.canRecoverAt}</span></div>}
      </div>
    );
  }

  return (
    <div className="mx-auto w-fit flex flex-col items-center">
      <div className="my-5 text-center">
        <h2>You have not set up recovery</h2>
        <div className="text-yellow-400">
          <h3>Please go through the kin list thorougly before submitting</h3>
          <h3>
            You cannot change this ones you subbmit. only a member of the kin
            list with the secret you provide
          </h3>
        </div>
        <h3>Please seperate with a comm (,) or a comma and a space (, )</h3>
      </div>
      <AddressInput
        value={kin}
        setValue={(v) => {
          setKin(v);
        }}
      />

      <div className="mt-5 mb-2">
        Recovery secret can be anything. Just remember it. It is absolutely case
        sensitive;
      </div>
      <input
        type="text"
        value={secret}
        placeholder="Enter recovery secret"
        className="bg-transparent border rounded-lg p-1"
        onChange={(e) => {
          setSecret(e.target.value);
        }}
      />
      <div className="mt-5 mb-2">
        How much time will pass in minutes of inactivity for your kins to be
        able to recover your account
      </div>
      <input
        type="number"
        value={kinWindow}
        placeholder="Enter kin window"
        className="bg-transparent border rounded-lg p-1"
        onChange={(e) => {
          setKinWindow(e.target.value);
        }}
      />

      <Button loading={loading} onClick={addRecovery} className="my-7 px-5">
        Submit
      </Button>
    </div>
  );
}

function AddressInput({ setValue, ...props }: AddressInputProps) {
  return (
    <textarea
      {...props}
      cols={42}
      rows={3}
      className="resize-none bg-transparent border rounded-lg"
      onChange={(e) => {
        let v = e.target.value;
        setValue(v);
      }}
    />
  );
}
