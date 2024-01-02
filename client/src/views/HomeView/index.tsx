import { useTodo } from "../../hooks/todo";
import AddTaskBtn from "components/AddTaskBtn";
import StatisticBoard from "./StatisticBoard";
import IncompleteBoard from "./IncompleteBoard";
import CompletedBoard from "./CompletedBoard";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import Drawer, { WarnIcon } from "./Drawer";
import { motion } from "framer-motion";
import Spinner from "components/Spinner";
require("@solana/wallet-adapter-react-ui/styles.css");

export function HomeView() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const {
    loading,
    transactionPending,
    todos,
    initialized,
    lastTodo,
    initializeUser,
    addTodo,
    incompleteTasks,
    completedTasks,
    markTodo,
    onRemove,
  } = useTodo(connection, publicKey);

  return (
    <div className="flex  bg-[#eee] relative">
      {/* Sidebar */}
      <div className=" bg-[#FAFAFA] h-[100vh] shadow-2xl">
        <Drawer
          publicKey={publicKey}
          connection={connection}
          transactionState={transactionPending}
        />
      </div>

      {initialized ? (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0.3, y: -100 }}
          className="w-full"
        >
          {/*  */}
          <div className="flex-1 mt-0 mx-20">
            <div className="flex justify-between items-center ">
              {initialized ? (
                <div>
                  <AddTaskBtn
                    onConfirm={(content: string) => addTodo(content)}
                  />
                </div>
              ) : (
                <button
                  onClick={() => initializeUser()}
                  disabled={transactionPending}
                >
                  Initilize Account
                </button>
              )}
            </div>
            {/* Statictis board */}
            <div className="flex">
              <div style={{ flex: 2 }}>
                <StatisticBoard
                  incompleteCount={incompleteTasks.length}
                  completedCount={completedTasks.length}
                  total={lastTodo}
                />
              </div>
              <div style={{ flex: 1 }} />
            </div>
            {/*  */}
            <div className="flex flex-wrap my-10">
              <div style={{ flex: 2 }} className="mr-5">
                <IncompleteBoard
                  data={incompleteTasks}
                  onMark={(pda: string, idx: number) => markTodo(pda, idx)}
                  onDelete={(pda: string, idx: number) => onRemove(pda, idx)}
                />
                {/* mapping uncompleted task */}
              </div>
              <div style={{ flex: 1 }} className="ml-5">
                <CompletedBoard
                  data={completedTasks}
                  onMark={(pda: string, idx: number) => markTodo(pda, idx)}
                  onDelete={(pda: string, idx: number) => onRemove(pda, idx)}
                />
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="flex-1  min-h-full bg-green flex justify-center items-center">
          {publicKey && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-1/3 h-1/3 bg-white rounded-xl p-5 shadow-md"
            >
              <p className="font-bold text-black">Welcome!</p>
              <div className="flex items-center justify-center">
                <div
                  className="px-5 py-2 bg-yellow rounded-lg my-10 cursor-pointer w-[200px]"
                  onClick={initializeUser}
                >
                  {transactionPending || loading ? (
                    <div className="flex justify-center py-1">
                      <Spinner />
                    </div>
                  ) : (
                    <p className="text-black font-semibold text-center">
                      Initialize account
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-center items-end">
                <div className="w-5 h-5">
                  <WarnIcon />
                </div>
                <p className="text-[#999] text-xs">
                  You can request airdrop if ur balance not enough
                </p>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
