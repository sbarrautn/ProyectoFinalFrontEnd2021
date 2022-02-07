<template>
  <div>
    <div
      class="header d-flex align-items-center profile-header"
      style="min-height: 400px; background-image: url(img/theme/students-in-classroom-792x418.jpg); background-size: cover; background-position: center top;"
    >
      <b-container fluid>
        <!-- Mask -->
        <span class="mask bg-gradient-success opacity-8"></span>
        <!-- Header container -->
        <b-container
          fluid
          class="d-flex align-items-center"
        >
          <b-row>
            <b-col
            >
              <h1 class="display-2 text-white">Gestión de actividades</h1>
              <p class="text-white mt-0 mb-5">Aquí puedes llevar el control de tus actividades</p>
            </b-col>
          </b-row>
        </b-container>
        <b-row>
            <b-col lg="12"
              md="10">
              <base-button type="primary" native-type="submit" class="my-4">Crear actividad</base-button>
            </b-col>
          </b-row>
      </b-container>
    </div>

    <b-container
      fluid
      class="mt--6"
    >
      <b-row align-h="start">
        <b-col
          col
          sm="12"
          md="6"
          xl="3"
          class="mb-3"
          v-for="item in activities"
          :key="`task-${item.id}`"
        >
          <b-card :title="item.title ? item.title.toUpperCase(): ''">
            <!-- <b-card-text>
              {{item.description}}
            </b-card-text> -->
            
            <div>
              <b-button
                variant="outline-primary"
                v-b-modal="`modal-${item.id}`"
              > Ver Actividad </b-button>

              <b-modal
                :id="`modal-${item.id}`"
                centered
                hide-footer
                :title="item.title"
              >
                Descripcion de {{item.title}}

              </b-modal>
            </div>
          </b-card>
        </b-col>
        
      </b-row>
      
    </b-container>
  </div>
</template>

<script>
import router from "../../../routes/router";
import { Table, TableColumn, Cascader } from "element-ui";
import projects from "../../Tables/projects";
import tasks from "../../Tables/tasksData";
import requestAxios from "../../../plugins/axios";
let id = 0
export default {
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Cascader.name]: Cascader
  },
  data () {
    return {
      projects,
      tasks,
      activities: [],
      studenSelected: [],
      students: [],
      currentPage: 1,
    };
  },
  beforeCreate () {
    let session = localStorage.getItem('session');
    if (!session) {
      session = sessionStorage.getItem('session');
    }
    // requestAxios.get('/tasks').then(taskResponse => {
    //   this.tasks = taskResponse.data;
    // })
    if (!session) {
      router.push({ name: 'login' });
    }
  },
  mounted () {
    this.getData();
  },
  methods: {
    getData () {
      this.$db.collection('activities').get().then(activities => {
        console.log(activities)
        this.activities = activities;
      })
    }
  }
};
</script>
<style>
.btn-info {
  display: inline;
  padding: 3px 5px;
}

.list-group > .list-group-item.list-hover:hover {
  background-color: #5e72e4;
  color: white;
  cursor: pointer;
}
</style>
