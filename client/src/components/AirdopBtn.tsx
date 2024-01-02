import React from "react";
import Spinner from "./Spinner";

export default function AirdopBtn(props: {
  onClick: () => Promise<void>;
  loading: boolean;
}) {
  return (
    <div
      className="px-5 py-2 bg-yellow rounded flex justify-center items-center cursor-pointer hover:rounded-2xl transition-all ease-in-out duration-300"
      onClick={props.onClick}
    >
      {props.loading ? (
        <div className="py-1">
          <Spinner />
        </div>
      ) : (
        <p className="font-semibold text-black">Request 1.00 Solana</p>
      )}
    </div>
  );
}
