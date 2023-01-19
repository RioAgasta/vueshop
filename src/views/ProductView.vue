<template>
  <div class="container">
    <div class="card border-primary mt-5 shadow">
      <div class="card-body">
        <div class="column">
          <div class="row">
            <div class="col-md-4" v-for="product in products" :key="product.id">
              <div class="card mt-4 p-4">
                <div class="row">
                  <img
                    :src="`http://localhost:8000/storage/${product.image}`"
                    width="200"
                    height="200"
                    style="object-fit: contain"
                  />
                </div>
                <div class="card-body" align="right">
                  <h5 class="card-title">{{ product.name }}</h5>
                  <p class="card-text">Rp. {{ product.price }}</p>
                  <p class="card-text">Stock : {{ product.stock }}</p>

                  <div class="row">
                    <router-link
                      class="btn btn-primary rounded shadow mb-3"
                      :to="{ name: 'editproduct', params: { id: product.id } }"
                      >Edit
                    </router-link>

                    <button
                      class="btn btn-danger btm-sm rounded shadow"
                      @click.prevent="delProduct(product.id)"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      products: Array,
    };
  },
  created() {
    this.getProduct();
  },
  mounted() {
    console.log("Product List Created");
  },
  methods: {
    async getProduct() {
      let url = "http://127.0.0.1:8000/api/getProduct";
      await axios
        .get(url)
        .then((response) => {
          this.products = response.data.data;
          console.log(this.products);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async delProduct(id) {
      let url = `http://127.0.0.1:8000/api/delProduct/${id}`;
      await axios
        .delete(url)
        .then((response) => {
          if (response.data.code == 200) {
            alert(response.data.message);
            this.getProduct();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
