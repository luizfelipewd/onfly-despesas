<template>
  <router-view class="container-fluid"></router-view>
</template>

<script>
import Home from "./Home.vue";
import Transactions from "./Transactions.vue";

export default {
  name: "App",
  components: {
    Home,
    Transactions,
  },
};
</script>