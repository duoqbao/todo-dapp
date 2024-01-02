import * as anchor from '@project-serum/anchor'
import { useEffect, useMemo, useState } from 'react'
import { PROGRAM_PUBKEY } from '../constants'
import { IDL } from '../constants/idl'
import { PublicKey, SystemProgram } from '@solana/web3.js'
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react'
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey'
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes'
import { authorFilter } from '../utils/authorFilter'
import { InterfaceTodoAccount } from 'constants/types'

export function useTodo(connection: anchor.web3.Connection, publicKey: PublicKey | null) {
    const anchorWallet = useAnchorWallet()
    const [transactionPending, setTransactionPending] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [lastTodo, setLastTodo] = useState<number>(0)
    const [initialized, setInitialized] = useState<boolean>(false);
    const [todos, setTodos] = useState<InterfaceTodoAccount[] | any>([])
    // 
    const program = useMemo(() => {
        if (anchorWallet) {
            const provider = new anchor.AnchorProvider(connection, anchorWallet, anchor.AnchorProvider.defaultOptions())
            return new anchor.Program(IDL as any, PROGRAM_PUBKEY, provider)
        }
    }, [connection, anchorWallet])


    useEffect(() => {
        const findProfileAccount = async () => {
            if (program && publicKey && !transactionPending) {
                try {
                    setLoading(true)
                    const [profilePda, profileBump] = findProgramAddressSync([utf8.encode('USER_STATE'), publicKey.toBuffer()], program.programId);
                    const profileAccount = await program.account.userProfile.fetch(profilePda)
                    if (profileAccount) {
                        setLastTodo(profileAccount?.lastTodo)
                        setInitialized(true)
                        const todoAccounts = await program.account.todoAccount.all([authorFilter(publicKey.toString())])
                        setTodos(todoAccounts)
                    } else {
                        setInitialized(false)
                    }
                } catch (error: any) {
                    console.log(error)
                    setInitialized(false)
                    setTodos([])
                } finally {
                    setLoading(false)
                }
            }
        }
        if (!publicKey) {
            setInitialized(false)
        }
        findProfileAccount()
    }, [publicKey, program, transactionPending])

    const initializeUser = async () => {
        if (program && publicKey) {
            try {
                setTransactionPending(true)
                const [profilePda, profileBump] = findProgramAddressSync([utf8.encode('USER_STATE'), publicKey.toBuffer()], program.programId);

                const tx = await program.methods.initilizeUser().accounts({
                    userProfile: profilePda,
                    authority: publicKey,
                    SystemProgram: SystemProgram.programId
                }).rpc()
                setInitialized(true)
            } catch (err) {
                console.log(err);
            } finally {
                setTransactionPending(false)
            }
        }
    }



    const addTodo = async (content: string) => {
        if (program && publicKey) {
            try {
                setTransactionPending(true);
                const [profilePda, profileBump] = findProgramAddressSync([utf8.encode('USER_STATE'), publicKey.toBuffer()], program.programId)
                const [todoPda, todoBump] = findProgramAddressSync([utf8.encode('TODO_STATE'), publicKey.toBuffer(), Uint8Array.from([lastTodo])], program.programId)
                await program.methods.addTodo(content).accounts({
                    userProfile: profilePda,
                    todoAccount: todoPda,
                    authority: publicKey,
                    ystemProgram: SystemProgram.programId
                }).rpc()
                setLastTodo(prev => prev++)

            } catch (err) {
                console.log(err)
            } finally {
                setTransactionPending(false)
            }
        }
    }

    const markTodo = async (todoPublicKey: string, idx: number) => {
        if (program && publicKey) {
            try {
                setTransactionPending(true);
                const [profilePda, profileBump] = findProgramAddressSync([utf8.encode('USER_STATE'), publicKey.toBuffer()], program.programId);
                await program.methods.markTodo(idx).accounts({
                    userProfile: profilePda,
                    todoAccount: todoPublicKey,
                    authority: publicKey,
                    systemProgram: SystemProgram.programId
                }).rpc()
            }
            catch (err) {
                console.log(err)
            } finally {
                setTransactionPending(false)
            }
        }
    }


    const onRemove = async (todoPublicKey: string, idx: number) => {
        if (program && publicKey) {
            try {
                setTransactionPending(true);
                const [profilePda, profileBump] = findProgramAddressSync([utf8.encode('USER_STATE'), publicKey.toBuffer()], program.programId);

                await program.methods.removeTodo(idx).accounts({
                    userProfile: profilePda,
                    todoAccount: todoPublicKey,
                    authority: publicKey,
                    systemProgram: SystemProgram.programId
                }).rpc()
            } catch (err) {
                console.log(err)
            } finally {
                setTransactionPending(false)
            }
        }
    }

    const incompleteTasks = useMemo(() => todos.filter((item: InterfaceTodoAccount) => !item.account.marked), [todos])
    const completedTasks = useMemo(() => todos.filter((item: InterfaceTodoAccount) => item.account.marked), [todos])


    return { initialized, loading, transactionPending, todos, lastTodo, initializeUser, addTodo, completedTasks, incompleteTasks, markTodo, onRemove }
}