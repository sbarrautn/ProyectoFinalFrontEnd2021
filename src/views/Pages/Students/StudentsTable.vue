<template>
  <b-card no-body class="bg-default shadow">
    <b-card-header class="bg-transparent border-0">
      <h3 class="mb-0 text-white">Estudiantes</h3>
    </b-card-header>

    <el-table class="table-responsive table table-dark"
              header-row-class-name="thead-dark"
              :data="students">
      <el-table-column label="Id"
                       min-width="100px"
                       prop="id">
        <template v-slot="{row}">
          <b-media no-body class="align-items-center">
            <a href="#" class="mr-3">
              <b-img class="avatar" rounded="circle" alt="Image placeholder" :src="row.img" />
            </a>
            <b-media-body>
              <span class="font-weight-600 name mb-0 text-sm">{{row.title}}</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column>
      <el-table-column label="Nombre"
                       prop="firstName"
                       min-width="140px">
      </el-table-column>
      <el-table-column label="Apellido"
                       prop="lastName"
                       min-width="140px">
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
            <span class="status" :class="`text-${row.statusType}`">{{row.status}}</span>
          </badge>
        </template>
      </el-table-column>
    </el-table>

  </b-card>
</template>
<script>
import projects from './../../Tables/projects'
import students from './../../Tables/studentsData'
import { Table, TableColumn} from 'element-ui'
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
