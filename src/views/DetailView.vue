<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-lg-6">
        <h2>Order Details</h2>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <img
          :src="`http://localhost:8000/storage/${product.image}`"
          width="200"
          height="200"
          style="object-fit: contain"
        />
      </div>
      <div class="col-md-6">
        <form v-on:submit.prevent="addCart" class="">
          <div class="form-group">
            <h4>{{ product.name }}</h4>
            <h5>Stock : <strong>{{ product.stock }}</strong></h5>
            <hr />
            <h4>Harga : Rp. {{ product.price }}</h4>
            <label class="mb-2 mt-2"> Quantity </label>
            <input
              type="number"
              min="1"
              :max="product.stock"
              class="form-control mb-2"
              placeholder="Quantity"
              v-model="order.quantity"
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlTextarea1" class="mb-2"
              >Description</label
            >
            <textarea
              class="form-control mb-4"
              id="exampleFormControlTextarea1"
              placeholder="Description"
              v-model="order.desc"
            ></textarea>
          </div>
          <input type="hidden" :value="product.id" name="product_id" />

          <button type="submit" class="btn btn-primary" @click="pemesanan">
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "detailpage",
  data() {
    return {
      product: {
        // id
      },
      order: {
        quantity: 1
      },
    };
  },
  methods: {
    getProductById(id) {
      let url = `http://127.0.0.1:8000/api/getProduct/${id}`;
      axios
        .get(url)
        .then((response) => {
          this.product = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addCart() {
      this.order.products = this.product;
      this.order.product_id = this.product.id;
      axios
        .post("http://127.0.0.1:8000/api/addCart", this.order)
        .then(() => {
          alert("Masuk keranjang");
          this.$router.push({ name: "cartpage" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    axios
      .get("http://127.0.0.1:8000/api/getProductById/" + this.$route.params.id)
      .then((response) => {
        this.product = response.data.data;
      })
      .catch((error) => console.log(error));
  },
};
</script>
