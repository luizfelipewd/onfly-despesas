<template>
  <div>
    <h1>Edit Transaction</h1>
    <form v-on:submit.prevent="saveTransaction">
      <input
        class="form-control"
        type="text"
        placeholder="Default input"
        aria-label="default input example"
        v-model="transaction.user"
      />
      <input
        class="form-control"
        type="text"
        placeholder="Default input"
        aria-label="default input example"
        v-model="transaction.title"
      />
      <input
        class="form-control"
        type="text"
        placeholder="Default input"
        aria-label="default input example"
        v-model="transaction.price"
      />
      <input
        class="form-control"
        type="text"
        placeholder="Default input"
        aria-label="default input example"
        v-model="transaction.type"
      />
      <input
        class="form-control"
        type="text"
        placeholder="Default input"
        aria-label="default input example"
        v-model="transaction.date"
      />
      <button class="btn btn-primary btn-lg">Enviar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "editTransaction",
  mounted() {
    const index = this.transactions.find(
      (item) => item.id === this.$route.params.id
    );
    this.selectedIndex = index;
    console.log(selectedIndex);
  },
  data() {
    return {
      transaction: {
        user: "",
        title: "",
        price: "",
        type: "",
        date: "",
      },
      selectedIndex: {},
    };
  },
  methods: {
    editTransaction() {
      this.$store.dispatch("addTransaction", this.transaction);
      this.transaction = {};
      this.$router.push({ path: "home" });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>