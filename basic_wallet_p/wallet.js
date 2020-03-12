import React, {useState, useEffect} from 'react'
import Blockchain from '../basic_transactions_gp/blockchain.py'
import axios from 'axios'
import TransactionList from './transactions';
import axiosWithAuth from './utils/axiosWithAuth';

const Wallet = () => {
    const [transactions, setTransactions] = useState({});
    axiosWithAuth()
    .get('/wallet')
    .then(res => setTransactions(res.data))
    .catch(err => console.log(err));

    return (
        <>

        <TransactionList />
        <Blockchain />

        </>
    )
}

export default Wallet;
