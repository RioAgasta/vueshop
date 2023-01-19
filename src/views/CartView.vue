<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h2 id="nav-breadcrumbs">product Saya</h2>
        <div class="table-responsive mt-3">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Foto</th>
                <th scope="col">Product</th>
                <th scope="col">Description</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Total</th>
                <th>Hapus</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(producta, index) in products" :key="producta.id">
                <td>{{ index + 1 }}</td>
                <td>
                  <img
                  :src="`http://localhost:8000/storage/${producta.image}`"
                      class="img-fluid shadow"
                      width="100"
                    />
                </td>
                <td>
                  {{ producta.name }}
                </td>
                <td>
                  {{ producta.desc ? producta.desc : "-" }}
                </td>
                <td>
                  {{ producta.quantity }}
                </td>
                <td>
                    Rp. {{ producta.price }}
                </td>
                <td>
                    Rp. {{ producta.quantity * producta.price }}
                </td>
                <td class="text-danger" align="center">
                  <i class="bi bi-trash" @click="hapusitem(producta.id)"></i>
                </td>
              </tr>
              <tr style="boder: none !important">
                <td colspan="6" align="right" style="border-style: hidden">
                  Total Pembelian :
                </td>
                <td>
                    Rp. {{ totalharga }}
                </td>
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
            <label class="mb-2 mt-4">Nama</label>
            <input type="text" class="form-control" v-model="pesan.nama" />
          </div>
          <div class="form-group">
            <label class="mb-2 mt-2">Nomor Meja</label>
            <input
              type="text"
              class="form-control mb-2"
              v-model="pesan.noMeja"
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

export default {
  name: "cartpage",
  data() {
    return {
      products: [],
      pesan: {},
    };
  },
  methods: {
    setproducts(data) {
      this.products = data;
      console.log(this.products);
    },
    async getProducts() {
    //   let url 
    },
    async getCart() {
      let url = "http://127.0.0.1:8000/api/getCart";
      await axios
        .get(url)
        .then((response) => this.setproducts(response.data.data))
        .catch((error) => console.log(error));
    },
    // hapusitem(id) {
    //   axios
    //     .delete("http://localhost:3000/keranjangs/" + id)
    //     .then(() => {
    //       alert("hapus data");
    //       //retrieve data terbaru
    //       axios
    //         .get("http://localhost:3000/keranjangs")
    //         .then((response) => this.setproducts(response.data))
    //         .catch((error) => console.log(error));
    //     })
    //     .catch((error) => console.log(error));
    // },
    // checkout() {
    //   if (this.pesan.nama && this.pesan.noMeja) {
    //     this.pesan.producta = this.products;
    //     this.pesan.producta;

    //     axios
    //       .post("http://localhost:3000/pesanans", this.pesan)
    //       .then(() => {
    //         this.products.map(function (item) {
    //           return axios
    //             .delete("http://localhost:3000/keranjangs/" + item.id)
    //             .catch((error) => console.log(error));
    //         });
    //         alert("sukses di pesan");
    //         this.$router.push({ path: "/sukses-pesan" });
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   } else {
    //     alert("Nama dan No meja tidak boleh kosong");
    //   }
    // },
  },
  mounted() {
    this.getCart();
  },
  
    computed: {
      totalharga() {
        return this.products.reduce(function (items, data) {
          return items + data.price * data.quantity;
        }, 0);
      },
    },
};
</script>
