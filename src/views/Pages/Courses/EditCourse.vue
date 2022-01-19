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
            <b-col lg="12" md="10">
              <h1 class="display-2 text-white">Gestión de cursado</h1>
              <p class="text-white mt-0 mb-5">Aquí puedes llevar el control de los cursos</p>
              <router-link :to="{ name: 'courses' }">Volver a mis cursos</router-link>
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
                <h3 class="mb-0">Editar curso</h3>
              </b-col>
            </b-row>

            <b-form @submit.prevent="editCourse">
              <h6 class="heading-small text-muted mb-4">Datos del curso</h6>

              <div class="pl-lg-4">
                <b-row>
                  <b-col lg="5">
                    <base-input
                      type="text"
                      label="Título"
                      placeholder="Título del curso"
                      v-model="course.title"
                    >
                    </base-input>
                  </b-col>
                  <b-col lg="5">
                    <base-input
                      type="text"
                      label="Descripción"
                      placeholder="Descripción del curso"
                      v-model="course.description"
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
                                v-model="course.fromDate"
                    >
                    </base-input>
                  </b-col>
                  <b-col lg="4">
                    <base-input alternative
                                type="date"
                                name="Hasta"
                                label="Hasta"
                                placeholder=""
                                v-model="course.toDate"
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
import SessionService from "../../../services/SessionService";
import router from "../../../routes/router";

export default {
  data() {
    return {
      course: {
        id: 0,
        title: '',
        description: '',
        days: [],
        fromDate: '',
        toDate: '',
        successMsg: 'Cambios guardados'
      }
    };
  },
  methods: {
    editCourse() {
      const session = SessionService.getSession();
      // TODO: add days
      axios.put(`${process.env.VUE_APP_API_URL}courses/` + this.course.id, {
        title: this.course.title,
        description: this.course.description,
        fromDate: this.course.fromDate,
        toDate: this.course.toDate,
        days: this.course.days
      }, {
        headers: {
          'Authorization': `${session}`
        }
      })
        .then((response) => {
          if (response.data.http_code === 200) {
            this.$notify({
              type: 'success',
              verticalAlign: 'bottom',
              horizontalAlign: 'center',
              message: this.course.successMsg
            });
            router.push({name: 'courses'});
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
    this.course.id = this.$route.params.id;
    const session = SessionService.getSession();

    axios.get(`${process.env.VUE_APP_API_URL}courses/${this.course.id}`, {
      headers: {
        'Authorization': `${session}`
      }
    })
      .then((response) => {
        if (response.data.http_code === 200) {
          const course = response.data.data;
          this.course.title = course.title;
          this.course.description = course.description;
          this.course.fromDate = course.fromDate;
          this.course.toDate = course.toDate;
          this.course.days = course.days;
        }
      })
      .catch((error) => {
        this.$notify({type: 'danger', verticalAlign: 'bottom', horizontalAlign: 'center', message: error.message});
      });
  }
};
</script>

<style scoped>
.custom-card {
  min-width: 100% !important;
  margin-bottom: 70px;
}
</style>
