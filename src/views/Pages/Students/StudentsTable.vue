<template>
  <div class="custom-card">
    <b-card no-body class="bg-default shadow">
      <b-card-header class="bg-transparent border-0">
        <h3 class="mb-0 text-white">Estudiantes</h3>
      </b-card-header>

      <el-table class="table-responsive table table-dark"
                header-row-class-name="thead-dark"
                :data="students">
        <el-table-column label="Id"
                         prop="id">
          <template v-slot="{row}">
            <b-media no-body class="align-items-center">
              <a href="#" class="mr-3">
                <b-img class="avatar" rounded="circle" alt="Image placeholder" :src="row.img"/>
              </a>
              <b-media-body>
                <span class="font-weight-600 name mb-0 text-sm">{{ row.title }}</span>
              </b-media-body>
            </b-media>
          </template>
        </el-table-column>
        <el-table-column label="Nombre"
                         prop="firstName">
        </el-table-column>
        <el-table-column label="Apellido"
                         prop="lastName">
        </el-table-column>
        <el-table-column label="Email"
                         prop="email"
                         min-width="170px">
        </el-table-column>

        <el-table-column label="Estado"
                         min-width="170px"
                         prop="status">
          <template v-slot="{row}">
            <badge class="badge-dot mr-4">
              <i :class="`bg-${row.statusType}`"></i>
              <span class="status" :class="`text-${row.statusType}`">{{ row.status }}</span>
            </badge>
          </template>
        </el-table-column>

        <el-table-column label=""
                         prop=""
                         min-width="125px">
          <a href="#!" class="btn btn-info">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill"
                 viewBox="0 0 16 16">
              <path
                d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
            </svg>
          </a>
          <a href="#!" class="btn btn-info">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill"
                 viewBox="0 0 16 16">
              <path
                d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
            </svg>
          </a>
        </el-table-column>
      </el-table>

    </b-card>
  </div>
</template>
<script>
import projects from './../../Tables/projects'
import students from './../../Tables/studentsData'
import {Table, TableColumn} from 'element-ui'

export default {
  name: 'light-table',
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  data() {
    return {
      projects,
      students,
      currentPage: 1
    };
  }
}
</script>
<style>
.btn-info {
  display: inline;
  padding: 3px 5px;
}
</style>
