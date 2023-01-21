<template>
  <div class="container">
    <div class="card border-primary mt-5 shadow mt-4">
      <div class="card-body">
        <div class="row">
          <div class="col">
            <h4><span class="badge bg-primary"> Add Product </span></h4>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col p-4">
            <form @submit.prevent="addProduct">
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
                <label class="col-sm-2 col-form-label"> Stock </label>
                <input type="number" v-model="products.stock" min="1" class="form-control">
              </div>
              <div class="form-group row">
                <label class="form-label mt-4"> Image </label>
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
import axios from 'axios';
export default {
  name: "addproduct",
  data() {
    return {
      products: {
        stock: 1,
      },
      image: "",
      preview: "",
    };
  },
  methods: {
    imgUpload(e) {
      this.image = e.target.files[0];
      console.log(this.image);

      console.log(this.products.code);
      console.log(this.products.name);
      console.log(this.products.price);
      console.log(this.products.stock);

      let fileReader = new FileReader();
      fileReader.readAsDataURL(this.image);
      fileReader.onload = (e) => {
        this.preview = e.target.result;
        console.log(this.preview);
      };
    },
    async addProduct() {
      let formData = new FormData();
      formData.append("code", this.products.code);
      formData.append("name", this.products.name);
      formData.append("price", this.products.price);
      formData.append("image", this.image);
      formData.append("stock", this.products.stock);

      console.log(formData);

      let url = "http://127.0.0.1:8000/api/addProduct";
      await axios
        .post(url, formData)
        .then((response) => {
          if (response.data.success == true) {
            alert(response.data.message);
            this.products.code = "";
            this.products.name = "";
            this.products.price = "";
            this.products.image = "";
            this.products.stock = "";

            this.$router.push({ name: "productlist" });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
