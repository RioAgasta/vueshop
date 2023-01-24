<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h2 id="nav-breadcrumbs">product Saya</h2>
        <div class="table mt-3">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Total</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in cart" :key="product.id">
                <td>{{ index + 1 }}</td>
                <td>
                  <img
                    :src="`http://localhost:8000/storage/${product.product_model.image}`"
                    class="img-fluid shadow"
                    width="100"
                  />
                </td>
                <td>{{ product.product_model.name }}</td>
                <td>{{ product.desc ? product.desc : "-" }}</td>
                <td>{{ product.quantity }}</td>
                <td>Rp. {{ product.product_model.price }}</td>
                <td>
                  Rp. {{ product.quantity * product.product_model.price }}
                </td>
                <td class="text-danger" align="center">
                  <div class="col">
                    <div class="row" style="justify-content: space-between">
                      <button
                        class="btn btn-primary btm-sm rounded shadow"
                        style="width: 48%"
                        @click.prevent="increaseCart(product.id, index)"
                      >
                        <PlusIcon />
                      </button>
                      <button
                        class="btn btn-warning btm-sm rounded shadow"
                        style="width: 48%; color: white"
                        @click.prevent="decreaseCart(product.id, index)"
                      >
                        <MinusIcon />
                      </button>
                    </div>
                    <div class="row mt-2">
                      <button
                        class="btn btn-danger btm-sm rounded shadow"
                        @click.prevent="delCart(product.id)"
                      >
                        <TrashCanIcon />
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
              <tr style="boder: none !important">
                <td colspan="6" align="right" style="border-style: hidden">
                  Total Pembelian :
                </td>
                <td>Rp. {{ totalharga }}</td>
                <td style="border-style: hidden"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="row justify-content-end">
      <div class="col-md-4">
        <form v-on:submit.prevent class="">
          <div class="form-group">
            <label class="mb-2 mt-4">Name</label>
            <input type="text" class="form-control" v-model="order.name" />
          </div>
          <div class="form-group">
            <label class="mb-2 mt-2">Table Number</label>
            <input
              type="text"
              class="form-control mb-2"
              v-model="order.table_num"
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary"
            @click="checkout"
            style="float: right"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import TrashCanIcon from "vue-material-design-icons/TrashCan.vue";
import PlusIcon from "vue-material-design-icons/Plus.vue";
import MinusIcon from "vue-material-design-icons/Minus.vue";

export default {
  name: "cartpage",
  data() {
    return {
      cart: [],
      order: {},
    };
  },
  components: {
    TrashCanIcon,
    PlusIcon,
    MinusIcon,
  },
  methods: {
    async getCart() {
      let url = "http://127.0.0.1:8000/api/getCart";
      await axios
        .get(url)
        .then((response) => {
          this.cart = response.data.data;
          console.log(this.cart);
        })
        .catch((error) => console.log(error));
    },

    async increaseCart(id, index) {
      let url = `http://127.0.0.1:8000/api/editCart/${id}`;
      let newQuantity = this.cart[index].quantity + 1;

      console.log(newQuantity);
      axios
        .put(url, {
          quantity: newQuantity,
        })
        .then((response) => {
          this.cart = response.data.data;
          this.getCart();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async decreaseCart(id, index) {
      let url = `http://127.0.0.1:8000/api/editCart/${id}`;
      let newQuantity = this.cart[index].quantity - 1;

      console.log(newQuantity);

      axios
        .put(url, {
          quantity: newQuantity,
        })
        .then((response) => {
          this.cart = response.data.data;
          this.getCart();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async delCart(id) {
      let url = `http://127.0.0.1:8000/api/delCart/${id}`;
      await axios
        .delete(url)
        .then((response) => {
          alert(response.data.message);
          this.getCart();
        })
        .catch((error) => console.log(error));
    },
    async checkout() {
      if (this.order.name && this.order.table_num) {
        let url = "http://127.0.0.1:8000/api/addOrder";
        this.order.cart = this.cart;

        await axios
          .post(url, this.order)
          .then((response) => {
            axios
              .put(
                "http://127.0.0.1:8000/api/getOrderId/" + response.data.data.id
              )
              .then(() => {
                axios.post("http://127.0.0.1:8000/api/addHistory");
              });

            alert(response.data.message);
            this.order.name = "";
            this.order.table_num = "";
            this.getCart();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("Name and Table Number Cannot be Empty");
      }
      this.cart.map(async function (item) {
        try {
          return await axios.delete(
            "http://127.0.0.1:8000/api/delCart/" + item.id
          );
        } catch (e) {
          return console.log(e);
        }
      });
      this.getCart();
    },
  },
  mounted() {
    this.getCart();
  },
  computed: {
    totalharga() {
      return this.cart.reduce(function (items, data) {
        return items + data.product_model.price * data.quantity;
      }, 0);
    },
  },
};
</script>
