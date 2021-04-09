import {http} from './config';

export default {
    getTransactions: () => {
        return http.get('transactions');
    },
    saveTransaction: (transaction) => {
        return http.post('transactions',transaction);
    },
    updateTransaction: (transaction) => {
        return http.put(`transactions/${transaction.id}`,transaction);
    },
    deleteTransaction: (transaction) => {
        return http.delete(`transactions/${transaction.id}`,{data: transaction});
    },
}