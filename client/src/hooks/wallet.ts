import * as anchor from '@project-serum/anchor'
import { LAMPORTS_PER_SOL, ParsedTransactionWithMeta, PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
export function useAppWallet(connection: anchor.web3.Connection, publicKey: PublicKey | null, transactionState: boolean) {
    const [balance, setBalance] = useState<number>(0);
    const [loadingWalletBalance, setLoading] = useState<boolean>(false)
    const [txs, setTxs] = useState<Array<ParsedTransactionWithMeta | null>>([])
    const [requesting, setRequesting] = useState<boolean>(false)
    useEffect(() => {
        const getBalance = async () => {
            if (publicKey && !transactionState) {
                setLoading(true)
                const total = await connection.getBalance(publicKey);
                setBalance(total / LAMPORTS_PER_SOL)
                setLoading(false)
                const signs = await connection.getSignaturesForAddress(publicKey)
                const list_sign = signs.map(item => item.signature)
                const txs = await connection.getParsedTransactions(list_sign)
                setTxs(txs)
            }

        }
        getBalance()

    }, [publicKey, connection, transactionState, requesting])

    const requestAirdrop = async () => {
        if (connection && publicKey) {
            try {
                setRequesting(true)
                const signAirdrop = await connection.requestAirdrop(publicKey as PublicKey, 1 * LAMPORTS_PER_SOL)
                await connection.confirmTransaction(signAirdrop)
            } catch (err: any) {
                alert(err)
                // console.log(err)
            } finally {
                setRequesting(false)
            }
        } else {
            console.log(connection, publicKey)
        }
    }

    return { balance, loadingWalletBalance, txs, requestAirdrop, requesting }
}