import React, { useState } from "react";
import Spinner from "./Spinner";

type TaskProps = {
  content: string;
  marked: boolean;
  onDelete: () => Promise<void>;
  onMark: () => Promise<void>;
  idx: number;
};
export default function Task(props: TaskProps) {
  const [onHover, setOnHover] = useState(false);
  const [loading, setLoading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const handleMark = async () => {
    if (!props.marked) {
      setLoading(true);
      await props.onMark();
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    setRemoving(true);
    await props.onDelete();
    setRemoving(false);
  };

  return (
    <div
      className={`my-5 p-2 bg-white rounded-md flex justify-between items-center shadow border-gray border-2 ${
        props.marked && "line-through  "
      } w-full  border-gray rounded-md hover:border-green py-3 cursor-pointer duration-300`}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
    >
      <div
        className={`w-7 h-7 border rounded-md border-green cursor-pointer transition-all duration-300 ease-in-out mx-2 flex justify-center items-center hover:border-2 ${
          !onHover && !props.marked && !loading && "opacity-0 "
        }`}
        onClick={handleMark}
      >
        {loading && !props.marked && (
          <div className="p-5">
            <Spinner />
          </div>
        )}
        {props.marked && <CheckSvg />}
      </div>
      <div className="flex-1">
        <p className="mx-2 text-sm truncate font-medium text-black">
          {props.content}
        </p>
      </div>
      <div className="flex items-start justify-start">
        <div
          className={`rounded-md w-6 h-6  cursor-pointer mx-2 hover:scale-90 ${
            !removing && !onHover && !props.marked && "opacity-0"
          }`}
          onClick={handleRemove}
        >
          {removing ? <Spinner /> : <TrashCan />}
        </div>
      </div>
    </div>
  );
}

function CheckSvg() {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"
          fill="rgba(69,143,15,1)"
        ></path>
      </svg>
    </>
  );
}

function TrashCan() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"
        fill="#F05454"
      ></path>
    </svg>
  );
}
