<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <b-container class="container">
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-white">{{ title }}</h1>
              <p class="text-lead text-white">{{ msg }}</p>
            </b-col>
          </b-row>
        </div>
        <div class="text-center">
          <b-button @click="goToDashboard" variant="primary" class="mt-4">Ir al dashboard</b-button>
        </div>
      </b-container>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1"
             xmlns="http://www.w3.org/2000/svg">
          <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>

import router from "../../routes/router";

export default {
  name: 'confirm',
  data() {
    return {
      title: '',
      msg: ''
    }
  },
  methods: {
    goToDashboard() {
      router.push({name: 'dashboard'});
    }
  },
  mounted() {
    axios.post(`${process.env.VUE_APP_API_URL}confirm`,
      {}, {
        params: {
          hash: this.$route.query.hash
        }
      }
    )
      .then((response) => {
        if (response.data.http_code === 200) {
          this.title = 'Cuenta confirmada!'
          this.msg = 'Ya puedes ingresar al dashboard y comenzar a utilizar la plataforma.'

          const sessionHash = response.data.data.session
          localStorage.setItem('session', sessionHash)
        }
      })
      .catch((error) => {
        if (error.response.data.http_code === 409) {
          this.title = 'Tu cuenta ya se encuentra confirmada!'
          this.msg = 'Puedes ingresar al dashboard y utilizar la plataforma.'
          this.$notify({
            type: 'warning',
            verticalAlign: 'bottom',
            horizontalAlign: 'center',
            message: error.response.data.message
          });
        } else {
          this.$notify({type: 'danger', verticalAlign: 'bottom', horizontalAlign: 'center', message: error.message});
        }
      });
  }
};
</script>
<style></style>
