import React from "react";

const StatisticElement = (props: { title: string; count: number }) => (
  <div className="flex flex-col justify-center items-center">
    <p className=" text-black"> {props.title}</p>
    <div className="flex justify-center items-center rounded-full flex-col border-green h-28 w-28 border-2 hover:border-4 transition-all ease-in-out duration-100 cursor-pointer">
      <p className="font-bold text-green text-2xl">{props.count}</p>
      <p className="font-medium text-black"> tasks</p>
    </div>
  </div>
);
export default function StatisticBoard(props: {
  incompleteCount: number;
  completedCount: number;
  total: number;
}) {
  return (
    <div className="flex justify-between items-center p-5 px-20  shadow-xl  min-h-[5rem] rounded-2xl mr-5 bg-white ">
      <StatisticElement title="Incomplete" count={props.incompleteCount} />
      <StatisticElement title="Completed" count={props.completedCount} />
      <StatisticElement title="Total" count={props.total} />
    </div>
  );
}
