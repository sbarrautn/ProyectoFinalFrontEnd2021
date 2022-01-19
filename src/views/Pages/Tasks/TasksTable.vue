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
              <router-link :to="{ name: 'courses' }">Volver a mis cursos</router-link>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </div>

    <b-container fluid class="mt--6">
      <b-row>
        <div class="custom-card">
          <b-card no-body class="bg-default shadow">
            <b-card-header class="bg-transparent border-0">
              <b-row align-v="center" slot="header">
                <b-col cols="11">
                  <h3 class="mb-0 text-white">Tareas</h3>
                </b-col>
                <b-col cols="1">
                  <div class="btn btn-sm btn-primary" style="cursor: pointer" v-on:click="goToCreateTaskPage()">
                    <img width="20px"
                         src="https://cdn4.iconfinder.com/data/icons/basic-user-interface-elements/700/plus-add-new-create-attach-maximize-512.png"
                         alt="add button">
                  </div>
                </b-col>
              </b-row>
            </b-card-header>

            <el-table class="table-responsive table table-dark"
                      header-row-class-name="thead-dark"
                      :data="tasks">
              <el-table-column label="Id"
                               prop="id"
                               min-width="100%">
              </el-table-column>
              <el-table-column label="Título"
                               prop="title"
                               min-width="200%">
              </el-table-column>
              <el-table-column label="Descripción"
                               prop="description"
                               min-width="400%">
              </el-table-column>
              <el-table-column label="Desde"
                               prop="fromDate"
                               min-width="150%">
              </el-table-column>
              <el-table-column label="Hasta"
                               prop="toDate"
                               min-width="150%">
              </el-table-column>
              <el-table-column label=""
                               min-width="100%" style="padding: 0">
                <template v-slot="{row}">
                  <div style="cursor: pointer" v-on:click="goToEditTaskPage(row.id)">
                    <img width="20px"
                         src="https://cdn4.iconfinder.com/data/icons/basic-user-interface-elements/700/edit-change-pencil-512.png"
                         alt="edit button">
                  </div>
                </template>
              </el-table-column>
              <el-table-column label=""
                               min-width="100%" style="padding: 0">
                <template v-slot="{row}">
                  <div style="cursor: pointer" v-on:click="deleteTarea(row.id)">
                    <img width="20px"
                         src="https://cdn4.iconfinder.com/data/icons/basic-user-interface-elements/700/exit-delete-remove-close-x-512.png"
                         alt="delete button">
                  </div>
                </template>
              </el-table-column>
            </el-table>

          </b-card>
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
      tasks: [],
      courseId: 0
    };
  },
  methods: {
    goToCreateTaskPage() {
      router.push({name: 'new-task', params: {id: `${this.courseId}`}});
    },
    goToEditTaskPage(id) {
      router.push({name: 'edit-task', params: {id: `${id}`}});
    },
    deleteTarea(id) {
      if (confirm("Está seguro de que quiere eliminar esta tarea?")) {
        const session = SessionService.getSession();

        axios.delete(`${process.env.VUE_APP_API_URL}tasks/${id}`,
          {
            headers: {
              'Authorization': `${session}`
            }
          })
          .then((response) => {
            if (response.data.http_code === 200) {
              const index = this.tasks.map(function (e) {
                return e.id
              }).indexOf(id)
              if (index > -1) {
                this.tasks.splice(index, 1);
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
                message: 'Tarea eliminada'
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
  },
  created() {
    this.courseId = this.$route.params.id;
    const session = SessionService.getSession();

    axios.get(`${process.env.VUE_APP_API_URL}courses/${this.courseId}/tasks/`,
      {
        headers: {
          'Authorization': `${session}`
        }
      })
      .then((response) => {
        if (response.data.http_code === 200) {
          let tasksIds = response.data.data.tasks;
          tasksIds.forEach(taskId => {
            axios.get(`${process.env.VUE_APP_API_URL}tasks/${taskId}`,
              {
                headers: {
                  'Authorization': `${session}`
                }
              })
              .then((response) => {
                if (response.data.http_code === 200) {
                  this.tasks.push(response.data.data)
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
