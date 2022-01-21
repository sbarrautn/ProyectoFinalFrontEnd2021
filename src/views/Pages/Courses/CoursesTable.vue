<template>
  <div>
    <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header"
         style="min-height: 400px; background-image: url(img/theme/students-in-classroom-792x418.jpg); background-size: cover; background-position: center top;">
      <b-container fluid>
        <!-- Mask -->
        <span class="mask bg-gradient-success opacity-8"></span>
        <!-- Header container -->
        <b-container fluid class="d-flex align-items-center">
          <b-row>
            <b-col lg="12" md="10">
              <h1 class="display-2 text-white">Tus cursos</h1>
              <router-link :to="{ name: 'new-course' }">Nuevo curso</router-link>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </div>

    <b-container fluid class="mt--6">
      <b-row>

        <div v-for="course in courses" v-bind:key="course.id" class="custom-card m-3">
          <card style="min-width: 300px">
            <b-row align-v="center" slot="header">
              <b-col cols="8" style="cursor: pointer" v-on:click="goToShowCourseDashboardPage(course.id)">
                <h3 class="mb-0">{{ course.title }}</h3>
              </b-col>
              <b-col cols="2" style="cursor: pointer" v-on:click="goToEditCoursePage(course.id)">
                <img width="20px"
                     src="https://cdn4.iconfinder.com/data/icons/basic-user-interface-elements/700/edit-change-pencil-512.png"
                     alt="edit button">
              </b-col>
              <b-col cols="2" style="cursor: pointer" v-on:click="deleteCourse(course.id)">
                <img width="20px"
                     src="https://cdn4.iconfinder.com/data/icons/basic-user-interface-elements/700/exit-delete-remove-close-x-512.png"
                     alt="delete button">
              </b-col>
            </b-row>

            <div class="p-lg-0" style="cursor: pointer" v-on:click="goToShowCourseDashboardPage(course.id)">
              <img class="p-0" src="img/theme/course-default.png" style="max-width: 320px"
                   alt="course image">
            </div>
          </card>
        </div>

      </b-row>
    </b-container>
  </div>
</template>

<script>
import {Table, TableColumn} from "element-ui";
import SessionService from "../../../services/SessionService";
import router from "../../../routes/router";

export default {
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  data() {
    return {
      courses: [],
      currentPage: 1,
      showHardcodedCourses: false
    };
  },
  methods: {
    goToShowCourseDashboardPage(id) {
      console.log("show: " + id)
    },
    goToEditCoursePage(id) {
      router.push({name: 'edit-course', params: {id: `${id}`}});
    },
    deleteCourse(id) {
      if (confirm("Está seguro de que quiere eliminar este curso?")) {
        const session = SessionService.getSession();

        axios.delete(`${process.env.VUE_APP_API_URL}courses/${id}`,
          {
            headers: {
              'Authorization': `${session}`
            }
          })
          .then((response) => {
            if (response.data.http_code === 200) {
              const index = this.courses.map(function (e) {
                return e.id
              }).indexOf(id)
              if (index > -1) {
                this.courses.splice(index, 1);
              } else {
                this.$notify({
                  type: 'danger',
                  verticalAlign: 'bottom',
                  horizontalAlign: 'center',
                  message: 'No se pudieron reflejar los cambios!'
                });
              }

              this.$notify({
                type: 'success',
                verticalAlign: 'bottom',
                horizontalAlign: 'center',
                message: 'Curso eliminado'
              });
            }
          })
          .catch((error) => {
            this.$notify({
              type: 'danger',
              verticalAlign: 'bottom',
              horizontalAlign: 'center',
              message: error.message
            });
          });
      }
    }
  },
  beforeCreate() {
    SessionService.validateSession();

    const session = SessionService.getSession();
    axios.get(`${process.env.VUE_APP_API_URL}courses/`,
      {
        headers: {
          'Authorization': `${session}`
        }
      })
      .then((response) => {
        if (response.data.http_code === 200) {
          let coursesIds = response.data.data.courses;
          coursesIds.forEach(courseId => {
            axios.get(`${process.env.VUE_APP_API_URL}courses/${courseId}`,
              {
                headers: {
                  'Authorization': `${session}`
                }
              })
              .then((response) => {
                if (response.data.http_code === 200) {
                  this.courses.push(response.data.data)
                }
              })
              .catch((error) => {
                this.$notify({
                  type: 'danger',
                  verticalAlign: 'bottom',
                  horizontalAlign: 'center',
                  message: error.message
                });
              });
          })
        }
      })
      .catch((error) => {
        this.$notify({type: 'danger', verticalAlign: 'bottom', horizontalAlign: 'center', message: error.message});
      });
  }
};
</script>

<style scoped>
.card-body {
  padding: 0;
}
</style>
