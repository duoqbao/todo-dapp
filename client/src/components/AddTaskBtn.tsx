import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
type AddTaskBtnProps = {
  onConfirm: (content: string) => Promise<void>;
};
export default function AddTaskBtn(props: AddTaskBtnProps) {
  const [content, setContent] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onCancel = () => {
    setOpen(false);
    setContent("");
  };

  const onConfirm = async () => {
    if (!content) {
      alert("plz add input ");
      return;
    }
    setLoading(true);
    await props.onConfirm(content);
    setOpen(false);
    setContent("");
    setLoading(false);
  };
  return (
    <AnimatePresence onExitComplete={() => console.log("run")}>
      <div className="my-5">
        {open && (
          <motion.div
            className="absolute flex justify-center items-start bg-[rgba(0,0,0,0.35)] w-full h-full top-0 left-0 "
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white rounded-xl w-1/3 min-h-1/4 p-3 flex flex-col justify-between px-5 transition-all ease-in-out mt-28">
              <p className="text-green font-semibold pb-2">
                Create the task todo
              </p>
              <div className="px-2 py-3 flex-1">
                <p className="text-sm font-medium text-black">Contents</p>

                <input
                  onChange={(e) => setContent(e.target.value)}
                  value={content}
                  className="my-2 w-2/3 focus:outline-none rounded-xl px-2 py-1 placeholder:text-sm  placeholder:text-[#999] border-2 border-[#cfcfcf] focus:border-green focus:text-green text-gray text-md font-medium transition-all ease-in-out"
                  placeholder="Do homework...."
                />
              </div>
              <div className="flex justify-between items-center pt-5 border-t-[1px] border-[#eee]">
                <button
                  className=" rounded-xl mx-2 px-6 bg-danger py-2"
                  onClick={onCancel}
                  disabled={loading}
                >
                  <p className="text-white  font-medium">Cancel</p>
                </button>

                <button
                  className=" rounded-xl mx-2 px-6 bg-green py-2"
                  onClick={onConfirm}
                  disabled={loading}
                >
                  <p className="text-white font-medium">
                    {loading ? "loading..." : "Create"}
                  </p>
                </button>
              </div>
            </div>
          </motion.div>
        )}
        <div className={`${open && "opacity-0"} transition-all ease-in-out`}>
          <div
            className="flex px-5 py-2 bg-green  justify-center items-center rounded cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <div className="w-8 h-8">
              <PlusIcon />
            </div>
            <p className="font-semibold text-white text-base px-2">Add task</p>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}

const PlusIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M11 11V7H13V11H17V13H13V17H11V13H7V11H11ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
        fill="rgba(255,255,255,1)"
      ></path>
    </svg>
  );
};
