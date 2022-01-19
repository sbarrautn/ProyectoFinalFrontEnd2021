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
              <router-link :to="{ name: 'tasks', params: { id: this.task.courseId }}">Volver las tareas del curso
              </router-link>
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

            <b-form @submit.prevent="createTask">
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
                    <base-button type="primary" native-type="submit" class="my-4">Crear tarea</base-button>
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
import SessionService from "../../../services/SessionService";
import router from "../../../routes/router";

export default {
  data() {
    return {
      task: {
        courseId: 0,
        title: '',
        description: '',
        fromDate: '',
        toDate: '',
        successMsg: 'Tarea creada correctamente!'
      }
    };
  },
  methods: {
    createTask() {
      const session = SessionService.getSession();
      axios.post(`${process.env.VUE_APP_API_URL}courses/` + this.task.courseId + '/tasks', {
        title: this.task.title,
        description: this.task.description,
        fromDate: this.task.fromDate,
        toDate: this.task.toDate
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
              message: this.task.successMsg
            });
            router.push({name: 'tasks', params: {id: `${this.task.courseId}`}});
          }
        })
        .catch((error) => {
          this.$notify({type: 'danger', verticalAlign: 'bottom', horizontalAlign: 'center', message: error.message});
        });
    }
  },
  beforeCreate() {
    SessionService.validateSession();
  },
  created() {
    this.task.courseId = this.$route.params.id;
  }
};
</script>

<style>
.custom-card {
  min-width: 100% !important;
  margin-bottom: 70px;
}
</style>
