import { ParsedTransactionWithMeta } from "@solana/web3.js";
import React from "react";

export default function Transactions(props: {
  txs: (ParsedTransactionWithMeta | null)[];
}) {
  return (
    <div>
      {/* {props.txs.map((tx) => {
        return <k></k>;
      })} */}
    </div>
  );
}
