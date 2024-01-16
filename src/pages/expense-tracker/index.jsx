import { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction"
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth,provider } from "../../config/firebase-config"
import "./styles.css"
export const Expense = () =>{

    const [description,setDescription] =useState("");
    const [transactionAmount,setTransactionAmount] =useState(0);
    const [transactionType,setTransactionType] =useState("expense");
const navigate=useNavigate();
const {addTransaction}= useAddTransaction();
const {transactions}= useGetTransactions();
const {transactionTotals}= useGetTransactions();

const {uname,profilePhoto}= useGetUserInfo();
const {balance,expense,income}=transactionTotals
const onSubmit=(e)=>{
e.preventDefault();
addTransaction({
    description,
    transactionAmount,
            transactionType,
})
}
const signUserOut=async()=>{
    try{
        await signOut(auth);
        localStorage.clear();
        navigate("/"); 
    }
    catch(e){
        console.error(e)
    }
}
    return <>
    <div className="expense-tracker">
        <div className="container">
            <h1>{uname} Expense Tracker</h1>
            <div className="balance">
                <h3>balance</h3>
                <h2>{balance}</h2>
            </div>
            <div className="summary">
                <div className="income">
                    <h4>Income</h4>
                    <p>{income}</p>
                </div>
                <div className="expense">
                <h4>Expenses</h4>
                    <p>{expense}</p>
                </div>
            </div>

<form onSubmit={onSubmit} className="add-transaction">

    <input type="text" placeholder="Description" required onChange={(e)=>{setDescription(e.target.value)}}/>
    <input type="text" placeholder="Amount" required onChange={(e)=>{setTransactionAmount(e.target.value)}}/>
    <input type="radio" id="expense" value="expense" checked={transactionType==="expense"} onChange={(e)=>{setTransactionType(e.target.value)}}/>
    <label htmlFor="expense">Expense</label>
    <input type="radio" id="income" value="income" checked={transactionType==="income"} onChange={(e)=>{setTransactionType(e.target.value)}} />
    <label htmlFor="income">Income</label>
    <button type="submit">Add Transaction</button>
    {/* <h1>DES: {description}</h1> */}


</form>
        </div>
        <div className="sign-out">
{profilePhoto && <div><img src={profilePhoto}></img></div>
}
<button onClick={signUserOut}>Sign out</button>
    </div>
    </div>
<div className="transactions">
    <h1>Transactions</h1>
    <ul>
        {transactions.map((transaction)=>{
            console.log(transaction)
            const {description,transactionAmount,transactionType}=transaction;
            return(
                <li>
                <h4>{description}</h4>
                <p>{transactionAmount}<label>{transactionType}</label></p>
                </li>
            )
        })}
    </ul>
</div>
    </>
}