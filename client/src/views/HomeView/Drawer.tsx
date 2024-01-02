import * as anchor from "@project-serum/anchor";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PublicKey } from "@solana/web3.js";
import AirdopBtn from "components/AirdopBtn";
import { useAppWallet } from "hooks/wallet";
import React from "react";
import Transactions from "./Transactions";

export default function Drawer(props: {
  publicKey: PublicKey | null;
  connection: anchor.web3.Connection;
  transactionState: boolean;
}) {
  const { connection, publicKey, transactionState } = props;
  const { balance, loadingWalletBalance, txs, requestAirdrop, requesting } =
    useAppWallet(connection, publicKey, transactionState);
  return (
    <div>
      <div
        className={`m-5 justify-between items-center pb-5 border-b border-green transition-all duration-300 ease-in-out ${
          publicKey ? "w-[250px]" : "w-[600px]"
        }`}
      >
        {!publicKey && (
          <div className="flex items-center ">
            <div className="w-5 h-5 mr-2">
              <InfoIcon />
            </div>
            <p className="text-xs text-[#999]">
              Connect wallet to use Todo dApp
            </p>
          </div>
        )}
        <WalletMultiButton />
        {!publicKey && (
          <div className="flex items-center justify-end">
            <div className="w-5 h-5 mr-2">
              <WarnIcon />
            </div>
            <p className="text-xs text-[#999]">Program running on devnet</p>
          </div>
        )}
        <div className="flex">
          <div className="flex flex-col justify-between">
            {publicKey && (
              <div className="flex ">
                <p className="text-green font-semibold">{balance}</p>{" "}
                <p className="text-sm font-medium text-black">&nbsp;SOL</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {publicKey && (
        <div className="px-5">
          <AirdopBtn onClick={requestAirdrop} loading={requesting} />
          <Transactions txs={txs} />
        </div>
      )}
    </div>
  );
}

const InfoIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M12 22C6.47715 22 2 17.5228 2 12 2 6.47715 6.47715 2 12 2 17.5228 2 22 6.47715 22 12 22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12 20 7.58172 16.4183 4 12 4 7.58172 4 4 7.58172 4 12 4 16.4183 7.58172 20 12 20ZM13 10.5V15H14V17H10V15H11V12.5H10V10.5H13ZM13.5 8C13.5 8.82843 12.8284 9.5 12 9.5 11.1716 9.5 10.5 8.82843 10.5 8 10.5 7.17157 11.1716 6.5 12 6.5 12.8284 6.5 13.5 7.17157 13.5 8Z"
        fill="rgba(153,153,153,1)"
      ></path>
    </svg>
  );
};

export const WarnIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M4.00001 20V14C4.00001 9.58172 7.58173 6 12 6C16.4183 6 20 9.58172 20 14V20H21V22H3.00001V20H4.00001ZM6.00001 20H18V14C18 10.6863 15.3137 8 12 8C8.6863 8 6.00001 10.6863 6.00001 14V20ZM11 2H13V5H11V2ZM19.7782 4.80761L21.1924 6.22183L19.0711 8.34315L17.6569 6.92893L19.7782 4.80761ZM2.80762 6.22183L4.22183 4.80761L6.34315 6.92893L4.92894 8.34315L2.80762 6.22183ZM7.00001 14C7.00001 11.2386 9.23858 9 12 9V11C10.3432 11 9.00001 12.3431 9.00001 14H7.00001Z"
        fill="rgba(153,153,153,1)"
      ></path>
    </svg>
  );
};
