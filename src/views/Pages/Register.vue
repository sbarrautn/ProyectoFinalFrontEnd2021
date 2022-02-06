<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <b-container class="container">
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-white">Create an account</h1>
              <p class="text-lead text-white">Use these awesome forms to login or create new account in your project for
                free.</p>
            </b-col>
          </b-row>
        </div>
      </b-container>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1"
             xmlns="http://www.w3.org/2000/svg">
          <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <b-container class="mt--8 pb-5">
      <!-- Table -->
      <b-row class="justify-content-center">
        <b-col lg="6" md="8" >
          <b-card no-body class="bg-secondary border-0">
            <b-card-body class="px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                <small>Regístrate con tus credenciales</small>
              </div>
              <validation-observer v-slot="{handleSubmit}" ref="formValidator">
                <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-hat-3"
                              placeholder="Nombre"
                              name="FirstName"
                              :rules="{required: true}"
                              v-model="model.firstName">
                  </base-input>

                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-hat-3"
                              placeholder="Apellido"
                              name="LastName"
                              :rules="{required: true}"
                              v-model="model.lastName">
                  </base-input>

                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-email-83"
                              placeholder="Email"
                              name="Email"
                              :rules="{required: true, email: true}"
                              v-model="model.email">
                  </base-input>

                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-lock-circle-open"
                              placeholder="Contraseña"
                              type="password"
                              name="Password"
                              :rules="{required: true, min: 6}"
                              v-model="model.password">
                  </base-input>
                  <div class="text-center">
                    <b-button type="submit" variant="primary" class="mt-4">Crear cuenta</b-button>
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

  export default {
    name: 'register',
    data() {
      return {
        model: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmationUrl: 'http://localhost:8081/#/confirm',
          successMsg: 'Cuenta creada correctamente!',
          conflictMsg: 'Ya existe una cuenta con esa dirección de correo asociada!'
        }
      }
    },
    methods: {
      onSubmit() {
        requestAxios.post('/signup', {
          firstName: this.model.firstName,
          lastName: this.model.lastName,
          email: this.model.email,
          confirmationUrl: this.model.confirmationUrl,
          password: this.model.password
        })
          .then((response) => {
            if (response.data.http_code === 201) {
              this.$notify({type: 'success', verticalAlign: 'bottom', horizontalAlign: 'center', message: this.model.successMsg});

              router.push({name: 'proceed'});
            }
          })
          .catch((error) => {
            if (error.response.data.http_code === 409) {
              this.$notify({type: 'warning', verticalAlign: 'bottom', horizontalAlign: 'center', message: this.model.conflictMsg});
            } else {
              this.$notify({type: 'danger', verticalAlign: 'bottom', horizontalAlign: 'center', message: error.message});
            }
          });
      }
    }

  };
</script>
<style></style>
