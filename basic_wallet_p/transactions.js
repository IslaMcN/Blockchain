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
        .put('http://localhost:5000/')
    }
}