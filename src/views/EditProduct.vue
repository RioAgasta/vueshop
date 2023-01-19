<template>
  <div class="container">
    <div class="card border-primary mt-5 shadow mt-4">
      <div class="card-body">
        <div class="row">
          <div class="col">
            <h4><span class="badge bg-primary"> Edit Product </span></h4>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col p-4">
            <form @submit.prevent="editProduct">
              <div class="form-group row">
                <label class="col-sm-2 col-form-label"> Code </label>
                <input
                  type="text"
                  class="form-control"
                  v-model="products.code"
                />
              </div>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label"> Name </label>
                <input
                  type="text"
                  class="form-control"
                  v-model="products.name"
                />
              </div>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label"> Price </label>
                <input
                  type="text"
                  class="form-control"
                  v-model="products.price"
                />
              </div>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label"> stock </label>
                <input type="number" v-model="products.stock" class="form-control" min="1">
              </div>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label"> Image </label>
                <input class="form-control" type="file" @change="imgUpload" />
              </div>
              <div class="form-group mt-4">
                <img :src="preview" alt="" width="200" />
              </div>
              <button
                type="submit"
                class="btn btn-primary"
                style="float: right"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "editproduct",
  data() {
    return {
      products: {},
      image: "",
      preview: "",
    };
  },
  created() {
    this.getProductById();
  },
  methods: {
    async getProductById() {
      let url = `http://127.0.0.1:8000/api/getProductById/${this.$route.params.id}`;
      await axios
        .get(url)
        .then((response) => {
          console.log(response);
          this.products = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    imgUpload(e) {
      this.image = e.target.files[0];
      console.log(this.image);

      this.products.image = this.image;

      let fileReader = new FileReader();
      fileReader.readAsDataURL(this.image);
      fileReader.onload = (e) => {
        this.preview = e.target.result;
        console.log(this.preview);
      };
    },
    async editProduct() {
      let url = `http://127.0.0.1:8000/api/editProduct/${this.$route.params.id}`;
      let code = this.products.code;
      let name = this.products.name;
      let price = this.products.price;
      let stock = this.products.stock;

      console.log(code);
      console.log(name);
      console.log(price);
      console.log(stock);

      axios
        .put(url, {
          code: code,
          name: name,
          price: price,
          stock: stock,
        })
        .then((response) => {
          console.log(response);
          this.$router.push({ name: "productlist" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
