import Vue from 'vue';
import Vuex from 'vuex';
import Transaction from "../services/transactions";

Vue.use(Vuex);

const state = {transactions: [], transaction: {}};
const actions = {
    addTransaction({commit}, transaction) {
        Transaction.saveTransaction(transaction).then((response) => {
            commit('saveTransaction');
        });
    },
    loadTransactions({commit}) {
        Transaction.getTransactions().then((response) => {
            let transactions = response.data;
            commit('showTransactions', transactions);
        });
    },
    editTransaction({commit}, transaction) {
        Transaction.updateTransaction(transaction).then((response) => {
            commit('updateTransaction');
        });
    },
    deleteTransaction({commit}, transaction) {
        Transaction.deleteTransaction(transaction).then((response) => {
            commit('deleteTransaction');
        });
    }
};
const mutations = {
    showTransactions(state, transactions) {
        state.transactions = transactions;
    },
    saveTransaction() {
        alert("Salvo com sucesso");
    },
    updateTransaction() {
        alert("Atualizado com sucesso");
    },
    deleteTransaction() {
        alert("Deletado com sucesso");
    }
};

const store = new Vuex.Store({
    state,
    actions,
    mutations
});

export default store;