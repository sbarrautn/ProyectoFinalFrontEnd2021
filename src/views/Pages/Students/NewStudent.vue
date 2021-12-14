<template>
  <div class="custom-card">
    <card>
      <b-row align-v="center" slot="header">
        <b-col cols="8">
          <h3 class="mb-0">Nuevo estudiante</h3>
        </b-col>
      </b-row>

      <b-form @submit.prevent="updateProfile">
        <h6 class="heading-small text-muted mb-4">Datos del estudiante</h6>

        <div class="pl-lg-4">
          <b-row>
            <b-col lg="5">
              <base-input
                type="text"
                label="Nombre"
                placeholder="First Name"
                v-model="user.firstName"
              >
              </base-input>
            </b-col>
            <b-col lg="5">
              <base-input
                type="text"
                label="Apellido"
                placeholder="Last Name"
                v-model="user.lastName"
              >
              </base-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="5">
              <base-input alternative
                          prepend-icon="ni ni-email-83"
                          type="email"
                          name="email"
                          label="Dirección de Email"
                          placeholder="alumno@email.com"
                          v-model="user.email"
              >
              </base-input>
            </b-col>
            <b-col lg="4">
              <base-input alternative
                          class="mb-3"
                          prepend-icon="ni ni-lock-circle-open"
                          placeholder="Contraseña"
                          type="password"
                          label="Contraseña"
                          name="Password"
                          :rules="{required: true, min: 6}"
                          v-model="user.password">
              </base-input>
            </b-col>
            <b-col cols="1" class="text-right">
              <base-button type="primary" native-type="submit" class="my-4">Invitar</base-button>
            </b-col>
          </b-row>
        </div>
      </b-form>
    </card>
  </div>
</template>
<script>

export default {
  data() {
    return {
      user: {
        email: '',
        firstName: 'Mike',
        lastName: 'Andrew',
        password: '',
        confirmationUrl: 'http://localhost:8081/#/confirm',
        successMsg: 'Cuenta creada correctamente!',
        conflictMsg: 'Ya existe una cuenta con esa dirección de correo asociada!'
      }
    };
  },
  methods: {
    updateProfile() {
      let session = localStorage.getItem('session');
      if (!session) {
        session = sessionStorage.getItem('session');
      }
      axios.post('http://api.proyecto.test/api/student', {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        confirmationUrl: this.user.confirmationUrl,
        password: this.user.password
      }, {
        headers: {
          'Authorization': `${session}`
        }
      })
        .then((response) => {
          if (response.data.http_code === 201) {
            this.$notify({
              type: 'success',
              verticalAlign: 'bottom',
              horizontalAlign: 'center',
              message: this.model.successMsg
            });
          }
        })
        .catch((error) => {
          if (error.response.data.http_code === 409) {
            this.$notify({
              type: 'warning',
              verticalAlign: 'bottom',
              horizontalAlign: 'center',
              message: this.model.conflictMsg
            });
          } else {
            this.$notify({type: 'danger', verticalAlign: 'bottom', horizontalAlign: 'center', message: error.message});
          }
        });
    }
  }
};
</script>
<style>
.custom-card {
  min-width: 100% !important;
  margin-bottom: 70px;
}
</style>
