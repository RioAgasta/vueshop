<template>
  <div class="row mt-4">
    <div class="col">
      <div class="d-flex h-100">
        <div class="justify-content-center align-self-center">
          <h2><strong>Toko Jaya Abadi</strong> <br />Sekarang Hadir Di Sini</h2>
          <p>Ayo Pesan Sekarang</p>
          <router-link class="nav-link" to="/product">
            <button class="btn btn-lg btn-success">Pesan</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Hero",
};
</script>
