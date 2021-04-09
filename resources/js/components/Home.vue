<template>
  <div id="page-content-wrapper" class="container-fluid">
    <h1>Home</h1>

    <div class="list-group">
      <div
        v-for="(transaction, index) of transactions"
        class="list-group-item list-group-item-action"
        :key="index"
      >
        <div class="d-flex w-100 justify-content-between">
          <h5
            class="mb-1"
            :class="
              transaction.type === 'Receita' ? 'text-success' : 'text-danger'
            "
          >
            {{
              transaction.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })
            }}
          </h5>
          <small>{{ transaction.date }}</small>
        </div>
        <p class="mb-1">{{ transaction.title }}</p>
        <small>{{ transaction.user }}</small>
        <button
          type="button"
          class="btn btn-secondary float-right"
          v-on:click="selectTransaction(transaction)"
          href="#"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Editar
        </button>
      </div>
    </div>

    <p class="lead" v-if="this.transactions.length === 0">
      Você não tem transações no momento.
    </p>

    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ selectedIndex.title }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              v-on:click="listTransactions"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h5>Título</h5>
            <input
              class="form-control"
              type="text"
              v-model="selectedIndex.title"
              aria-label="default input example"
            />
            <hr />
            <h5>Valor</h5>
            <input
              class="form-control"
              type="text"
              v-model="selectedIndex.price"
              aria-label="default input example"
              maxlength="10"
              id="inputPrice"
              v-on:keyup="formatCurrency"
            />
            <hr />
            <h5>Tipo de transação</h5>
            <input
              class="form-control"
              type="text"
              v-model="selectedIndex.type"
              aria-label="default input example"
            />
            <hr />
            <h5>Data (formato DD/MM/AAAA):</h5>
            <input
              class="form-control"
              type="text"
              v-model="selectedIndex.date"
              aria-label="default input example"
            />
            <hr />
            <h5>Usuário</h5>
            <input
              class="form-control"
              type="text"
              v-model="selectedIndex.user"
              aria-label="default input example"
              disabled
              readonly
            />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              v-on:click="editTransaction(selectedIndex)"
            >
              Salvar alterações
            </button>
            <button
              type="button"
              class="btn btn-danger"
              v-on:click="deleteTransaction(selectedIndex)"
            >
              Excluir transação
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "home",
  mounted() {
    this.listTransactions();
  },
  data() {
    return {
      selectedIndex: {},
    };
  },
  methods: {
    listTransactions() {
      this.$store.dispatch("loadTransactions");
    },

    selectTransaction(transaction) {
      let index = this.transactions.find((item) => item.id === transaction.id);
      index.price = index.price.toLocaleString("pt-BR");
      this.selectedIndex = index;
    },

    deleteTransaction(selectedIndex) {
      this.$store.dispatch("deleteTransaction", selectedIndex);
      selectedIndex = {};
      this.listTransactions();
      $("#exampleModal").modal("hide");
    },

    editTransaction(selectedIndex) {
      let editedTransaction = {
        id: selectedIndex.id,
        user: selectedIndex.user,
        title: selectedIndex.title,
        price: selectedIndex.price.replace(".", "").replace(",", "."),
        type: selectedIndex.type,
        date: selectedIndex.date,
      };
      this.$store.dispatch("editTransaction", editedTransaction);
      selectedIndex = {};
      this.listTransactions();
      $("#exampleModal").modal("hide");
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
      this.selectedIndex.price = element.value;
    },
  },
  computed: {
    ...mapState(["transactions"]),
  },
};
</script>

<style lang="scss" scoped>
</style>