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
          <b-card no-body class="bg-default shadow">
            <b-card-header class="bg-transparent border-0">
              <h3 class="mb-0 text-white">Tareas</h3>
            </b-card-header>

            <el-table class="table-responsive table table-dark"
                      header-row-class-name="thead-dark"
                      :data="tasks">
              <el-table-column label="Id"
                               prop="id">
              </el-table-column>
              <el-table-column label="Título"
                               prop="title">
              </el-table-column>
              <el-table-column label="Descripción"
                               prop="description"
                               min-width="400px">
              </el-table-column>
              <el-table-column label="Desde"
                               prop="fromDate"
                               min-width="150px">
              </el-table-column>
              <el-table-column label="Hasta"
                               prop="toDate"
                               min-width="150px">
              </el-table-column>
            </el-table>

          </b-card>
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import router from "../../../routes/router";
import {Table, TableColumn} from "element-ui";
import projects from "../../Tables/projects";
import tasks from "../../Tables/tasksData";

export default {
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  data() {
    return {
      projects,
      tasks,
      currentPage: 1
    };
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
.btn-info {
  display: inline;
  padding: 3px 5px;
}
</style>
