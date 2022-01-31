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
            <b-col lg="9" md="12">
              <h1 class="display-3 text-white">Nueva asignación de tarea</h1>
              <p class="text-white mt-0 mb-5">Aquí puede realizar nuevas asignaciones de tareas pendientes</p>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </div>
    <!-- Page content -->
    <b-container class="mt--4 pb-5">
        
    </b-container>
  </div>
</template>
<script>
import router from "../../../routes/router";

export default {
  data() {
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
    onSubmit() {
      axios.post('http://api.proyecto.test/api/asignaciones', {
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

          router.push({name: 'dashboard'});
        })
        .catch((error) => {
          if (error.response.data.errors.message) {
            this.$notify({type: 'warning', verticalAlign: 'bottom', horizontalAlign: 'center', message: error.response.data.errors.message});
          } else {
            this.$notify({type: 'danger', verticalAlign: 'bottom', horizontalAlign: 'center', message: error.message});
          }
        });
    }
  }
};
</script>
