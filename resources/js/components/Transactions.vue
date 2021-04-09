<template>
  <div>
    <h1>Transactions</h1>
    <form v-on:submit.prevent="saveTransaction">
      <input
        class="form-control"
        type="text"
        placeholder="Usuário"
        aria-label="Usuário"
        v-model="transaction.user"
      />
      <input
        class="form-control"
        type="text"
        placeholder="Título da transação"
        aria-label="Título da transação"
        v-model="transaction.title"
      />
      <input
        type="text"
        class="form-control"
        maxlength="10"
        id="inputPrice"
        v-on:keyup="formatCurrency"
        placeholder="Valor"
        aria-label="Valor"
        v-model="transaction.price"
      />
      <input
        class="form-control"
        type="text"
        placeholder="Tipo da transação"
        aria-label="Tipo da transação"
        v-model="transaction.type"
      />
      <input
        class="form-control"
        type="text"
        placeholder="Data da transação"
        aria-label="Data da transação"
        v-model="transaction.date"
      />
      <button class="btn btn-primary btn-lg">Enviar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "transactions",
  data() {
    return {
      transaction: {
        id: "",
        user: "",
        title: "",
        price: "",
        type: "",
        date: "",
      },
    };
  },
  methods: {
    saveTransaction() {
      let newTransaction = {
        id: this.transaction.id,
        user: this.transaction.user,
        title: this.transaction.title,
        price: this.transaction.price.replace(".", "").replace(",", "."),
        type: this.transaction.type,
        date: this.transaction.date,
      };
      this.$store.dispatch("addTransaction", newTransaction);
      this.transaction = {};
      this.$router.push({ path: "home" });
    },

    formatCurrency() {
      var element = document.getElementById("inputPrice");
      var inputPrice = element.value;

      inputPrice = inputPrice + "";
      inputPrice = parseInt(inputPrice.replace(/[\D]+/g, ""));
      inputPrice = inputPrice + "";
      inputPrice = inputPrice.replace(/([0-9]{2})$/g, ",$1");

      if (inputPrice.length > 6) {
        inputPrice = inputPrice.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
      }

      element.value = inputPrice;
      if (inputPrice == "NaN") element.value = "";
      this.transaction.price = element.value;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>