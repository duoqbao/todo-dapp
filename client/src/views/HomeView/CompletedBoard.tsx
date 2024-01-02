import Task from "components/Task";
import { InterfaceTodoAccount } from "constants/types";
import React from "react";

export default function CompleteBoard(props: {
  data: InterfaceTodoAccount[];
  onMark: (pda: string, idx: number) => Promise<void>;
  onDelete: (pda: string, idx: number) => Promise<void>;
}) {
  return (
    <div className="justify-between items-center p-5 shadow-lg  min-h-[5rem] rounded-2xl bg-white ">
      <p className="font-medium text-green text-xl">Completed</p>
      {props.data.map((item: InterfaceTodoAccount) => {
        return (
          <Task
            content={item.account.content}
            marked={item.account.marked}
            idx={item.account.idx}
            key={item.publicKey}
            onMark={() => props.onMark(item.publicKey, item.account.idx)}
            onDelete={() => props.onDelete(item.publicKey, item.account.idx)}
          />
        );
      })}
      {props.data.length == 0 && (
        <p className="px-2 text-[#999] font-medium ">Empty...</p>
      )}
    </div>
  );
}
