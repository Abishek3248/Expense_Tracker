import {addDoc,collection,serverTimestamp} from "firebase/firestore"
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";



export const useAddTransaction=()=>{
    const {userId} = useGetUserInfo();
const transactionCollectionRef = collection(db,"transactions")
// console.log(userId)
    const addTransaction= async({description,transactionAmount,transactionType})=>{
        console.log(description);
        const done =await addDoc(transactionCollectionRef,{
            userId,
            description,
            transactionAmount,
            transactionType,
            createdAt:serverTimestamp(),
        })
      
    };
    return {addTransaction};
}