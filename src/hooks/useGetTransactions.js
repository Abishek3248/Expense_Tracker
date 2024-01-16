import { useEffect } from "react";
import { useState } from "react";
import {query,collection,where, orderBy, onSnapshot } from "firebase/firestore"
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";
import { Expense } from "../pages/expense-tracker";
    


export const useGetTransactions=()=>{
        const [transactions,setTransactions]=useState([])
    const transactionCollectionRef=collection(db,"transactions");
    const {userId}=useGetUserInfo();
    const [transactionTotals,setTransactionTotals]=useState({balance:0.0,income:0.0,expense:0.0})
    
    let unsubscribe;
        const getTransactions= async()=>{
    try{

        const queryTransactions=query(transactionCollectionRef,
            where("userId","==",userId)
            ,orderBy("createdAt"));

            unsubscribe=onSnapshot(queryTransactions,(snapshot)=>{
               let docs=[];
               let totalExpense=0;
               let totalIncome=0;

                
               
                snapshot.forEach((doc)=>{
                    const data=doc.data();
                    const id =doc.id;

                    docs.push({...data,id})
                    if (data.transactionType === "expense"){
                        totalExpense+=Number(data.transactionAmount)
                    }
                    else{
                        totalIncome+=Number(data.transactionAmount)
                    }


                });
                let balance=Number(totalIncome)-Number(totalExpense);
                    console.log(totalExpense,totalIncome);
                setTransactions(docs)
                setTransactionTotals({
                    balance,
                    expense:totalExpense,
                    income:totalIncome
                    
                })
            })






    }
    catch(err){
        console.error(err)
    }

return ()=>unsubscribe();

    }

    useEffect(()=>{
    getTransactions()
    },[])

    return {transactions,transactionTotals}

    }