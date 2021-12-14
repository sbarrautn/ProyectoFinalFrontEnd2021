<template>
  <div>
    <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header"
         style="min-height: 600px; background-image: url(img/theme/students-in-classroom-792x418.jpg); background-size: cover; background-position: center top;">
      <b-container fluid>
        <!-- Mask -->
        <span class="mask bg-gradient-success opacity-8"></span>
        <!-- Header container -->
        <b-container fluid class="d-flex align-items-center">
          <b-row>
            <b-col lg="7" md="10">
              <h1 class="display-2 text-white">Gestión de tareas y asignaciones</h1>
              <p class="text-white mt-0 mb-5">Aquí puedes llevar el control de las tareas y asignaciones</p>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </div>

    <b-container fluid class="mt--6">
      <b-row>
        <div class="custom-card">
          <card>
            <b-row align-v="center" slot="header">
              <b-col cols="8">
                <h3 class="mb-0">Nueva tarea</h3>
              </b-col>
            </b-row>

            <b-form @submit.prevent="updateProfile">
              <h6 class="heading-small text-muted mb-4">Datos de la tarea</h6>

              <div class="pl-lg-4">
                <b-row>
                  <b-col lg="5">
                    <base-input
                      type="text"
                      label="Título"
                      placeholder="Título de la tarea"
                      v-model="task.title"
                    >
                    </base-input>
                  </b-col>
                  <b-col lg="5">
                    <base-input
                      type="text"
                      label="Descripción"
                      placeholder="Descripción de la tarea"
                      v-model="task.description"
                    >
                    </base-input>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="5">
                    <base-input alternative
                                type="date"
                                name="Desde"
                                label="Desde"
                                placeholder=""
                                v-model="task.fromDate"
                    >
                    </base-input>
                  </b-col>
                  <b-col lg="4">
                    <base-input alternative
                                type="date"
                                name="Hasta"
                                label="Hasta"
                                placeholder=""
                                v-model="task.toDate"
                    >
                    </base-input>
                  </b-col>
                  <b-col cols="1" class="text-right">
                    <base-button type="primary" native-type="submit" class="my-4">Guardar cambios</base-button>
                  </b-col>
                </b-row>
              </div>
            </b-form>
          </card>
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import router from "../../../routes/router";

export default {
  data() {
    return {
      task: {
        title: 'Tarea 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        fromDate: '11/11/2021',
        toDate: '',
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
  },
  beforeCreate() {
    let session = localStorage.getItem('session');
    if (!session) {
      session = sessionStorage.getItem('session');
    }
    if (!session) {
      router.push({name: 'login'});
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
