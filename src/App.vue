<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary mb-3 bg-primary">
      <div class="container">
        <div class="container-fluid">
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 ml-0">
              <a class="navbar-brand" href="#">Toko Jaya Abadi</a>
              <li class="nav-item">
                <router-link class="nav-link" to="/">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/product">Menu</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/cart">Keranjang</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/addproduct">Tambah Produk</router-link>
              </li>
            </ul>
            <form class="d-flex" role="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-light" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
    <router-view />
  </template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
