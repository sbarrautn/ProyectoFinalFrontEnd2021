<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            class="fill-default"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <b-container class="mt--8 pb-5">
      <b-row class="justify-content-center">
        <b-col
          lg="5"
          md="7"
        >
          <b-card
            no-body
            class="bg-secondary border-0 mb-0"
          >
            <b-card-header class="bg-transparent pb-2">
             <h1 class="text-green mt-2">
               Iniciar Sesión
             </h1>
            </b-card-header>
            <b-card-body class="px-lg-5 py-lg-5">
              <validation-observer
                v-slot="{handleSubmit}"
                ref="formValidator"
              >
                <b-form
                  role="form"
                  @submit.prevent="handleSubmit(onSubmit)"
                >
                  <base-input
                    alternative
                    class="mb-3"
                    name="Email"
                    :rules="{required: true, email: true}"
                    prepend-icon="ni ni-email-83"
                    placeholder="Email"
                    v-model="model.email"
                  >
                  </base-input>

                  <base-input
                    alternative
                    class="mb-3"
                    name="Password"
                    :rules="{required: true, min: 6}"
                    prepend-icon="ni ni-lock-circle-open"
                    type="password"
                    placeholder="Password"
                    v-model="model.password"
                  >
                  </base-input>

                  <b-form-checkbox v-model="model.rememberMe">Recordarme</b-form-checkbox>
                  <div class="text-center">
                    <base-button
                      type="primary"
                      native-type="submit"
                      class="my-4"
                    >Ingresar</base-button>
                  </div>
                </b-form>
              </validation-observer>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import router from "../../routes/router";
import requestAxios from "../../plugins/axios";
import * as taxios from "axios";

export default {
  data () {
    return {
      error: '',
      model: {
        email: '',
        password: '',
        rememberMe: false
      }
    };
  },
  methods: {
    onSubmit () {
      requestAxios.post('/login', {
        email: this.model.email,
        password: this.model.password
      })
        .then((response) => {
          const sessionHash = response.data.data.hash;
          if (this.model.rememberMe) {
            localStorage.setItem('session', sessionHash);
          } else {
            sessionStorage.setItem('session', sessionHash);
          }
          const payload = this.parseJwt(sessionHash);
          localStorage.setItem('name', `${payload.user.firstName} ${payload.user.lastName}`);
          console.log(payload)
          router.push({ name: 'dashboard' });
        })
        .catch((error) => {
          if (error.response.data.errors.message) {
            this.$notify({ type: 'warning', verticalAlign: 'bottom', horizontalAlign: 'center', message: error.response.data.errors.message });
          } else {
            this.$notify({ type: 'danger', verticalAlign: 'bottom', horizontalAlign: 'center', message: error.message });
          }
        });
    },
    parseJwt (token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    }
  }
};
</script>
