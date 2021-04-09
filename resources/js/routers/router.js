import Home from '../components/Home.vue'
import Transactions from '../components/Transactions.vue'

const routes = [
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/transactions',
        name: 'transactions',
        component: Transactions
    },
];

export default routes;