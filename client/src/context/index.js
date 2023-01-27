import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractAddress, transactionAbi } from "../utils/Constants";


export const TransactionContext = React.createContext()
const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const transactionContract = new ethers.Contract(contractAddress, transactionAbi, signer)

    console.log({provider, signer, transactionContract})
    return transactionContract;
}

export const TransactionProvider = ({ children }) => {
    const [formData, setFormData]=useState({})
    const [connectedAcc, setConnectedAcc] = useState();
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
    const [isLoading, setIsLoading] = useState(false);


    const checkIfWalletConnected = async () => {
        if (!ethereum) return alert("Wallet not connected, Please install metamask")
        const accounts = await ethereum.request({ method: "eth_accounts" })
        if (accounts.length > 0) {
            setConnectedAcc(accounts[0])
        }
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Wallet not connected, Please install metamask")
            const accounts = await ethereum.request({ method: "eth_requestAccounts" })
            setConnectedAcc(accounts[0])
            console.log(accounts)
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object found.")
        }
    }

    useEffect(() => {
        checkIfWalletConnected()
    }, [])

    const sendTransaction = async() => {
        try {
            const { address, amount, keyword, message } = formData;

            if (!ethereum) return alert("Wallet not connected, Please install metamask")
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount)._hex
            await ethereum.request({
                method:"eth_sendTransaction",
                params:[{
                    from: connectedAcc,
                    to: address,
                    gas:"0x5208",
                    value: parsedAmount,
                }]
            })
            setIsLoading(true)
            const transactionHash = await transactionContract.addToBlockChain(address, parsedAmount, message, keyword)
            console.log(`Loading : ${transactionHash.hash}`)
            await transactionHash.wait()
            setIsLoading(false)
            console.log(`success : ${transactionHash.hash}`)

            const allTransactions = await transactionContract.getAllTransactionsCount();
            console.log(`transactions count : ${allTransactions}`);
            setTransactionCount(allTransactions.toNumber())

           

        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object found.")
        }
    }
    return (
        <TransactionContext.Provider value={{ connectWallet, connectedAcc, formData, setFormData, sendTransaction }}>
            {children}
        </TransactionContext.Provider>
    )
}