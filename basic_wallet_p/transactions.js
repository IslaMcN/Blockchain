import React, {useState} from 'react';
import axios from 'axios';

const initialTransaction = {
    'sender': '',
    'recipient': '',
    'amount': ''
}

const TransactionList = ({transactions, updateTransactions}) => {
    const [edit, setEdit] = useState(false);
    const [transactionToEdit, setTransactionToEdit] = useState(initialTransaction);

    const editTransaction = bit => {
        setEdit(true);
        setTransactionToEdit(bit);
    };
    const saveEdit = e => {
        e.preventDefault();
        axios
        .put('http://localhost:5000/NOTTOOSUREYET/:id')
        .then(res => {
            console.log('This is coming from TransactionList', res)
            updateTransactions(res.data)
        })
        .catch(err => {
            console.log('Nope', err)
        });

    };
    const deleteTransaction = bit => {
        axios
        .delete('http://localhost:50000/NOTTOOSUREYET/:id')
        .then(res => {
            console.log('This is coming from delete in TransactionList', res)
            updateTransactions(res.data)
        })
        .catch(err => {
            console.log(err)
        });
    };

    return(
        <div>
            <p>transactions</p>
            <ul>
                {transactions.map(bit => {
                    <li onClick={() => editTransaction(bit)}>
                        <span>
                            <span onClick={()=> deleteTransaction(bit)}> X </span>
                        </span>
                    </li>
                })}
            </ul>
            {edit && (
                <form onSubmit={saveEdit}>
                    <legend>edit transactions</legend>
                    <label>

                        Sender:
                        <input onChange = {e => setTransactionToEdit({ ...transactionToEdit, sender: e.target.value})}
                        value = {transactionToEdit.sender}/>
                    </label>
                    <label>
                        Recipient:
                        <input onChange = {e => setTransactionToEdit({...transactionToEdit, recipient: e.target.value})} value = {transactionToEdit.recipient}/>
                    </label>
                    <label>
                        Amount:
                        <input onChange = {e => setTransactionToEdit({...setTransactionToEdit, amount: e.target.value})} value = {transactionToEdit.amount}/>
                    </label>
                    <div>
                        <button type="submit">Save</button>
                        <button onClick={() => setEdit(false)}>Cancel</button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default TransactionList;