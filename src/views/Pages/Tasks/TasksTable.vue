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
              <h1 class="display-2 text-white">Gestión de tareas y asignaciones</h1>
              <p class="text-white mt-0 mb-5">Aquí puedes llevar el control de las tareas y asignaciones</p>
            </b-col>
          </b-row>
        </b-container>
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
          v-for="item in tasks"
          :key="`task-${item.id}`"
        >
          <b-card :title="item.title ? item.title.toUpperCase(): ''">
            <b-card-text>
              {{item.description}}
            </b-card-text>
            <b-card-text class="mb-0">
              <small class="text-muted">Inicia: {{item.fromDate}}</small>
            </b-card-text>
            <b-card-text class="mb-0">
              <small class="text-muted">Termina: {{item.toDate}} </small>
            </b-card-text>
            <b-card-text>
              <small class="text-muted"> {{item.group ? `Asignado a ${item.group.name}` : 'Sin asignar'}} </small>
            </b-card-text>
            <div>
              <b-button
                variant="outline-primary"
                v-b-modal="`modal-${item.id}`"
              > {{item.group ? 'Cambiar' : 'Asignar'}} </b-button>

              <b-modal
                :id="`modal-${item.id}`"
                centered
                hide-footer
                :title="`Asignar '${item.title}' a un estudiante`"
              >
                <b-card
                  no-body
                  class="mb-1"
                  v-for="group in groups"
                  :key="`group-${group.id}`"
                >
                  <b-card-header
                    header-tag="header"
                    class="p-1"
                    role="tab"
                  >
                    <b-button
                      block
                      v-b-toggle="`acordion-${group.id}`"
                      variant="outline-primary"
                    >{{group.name}}</b-button>
                  </b-card-header>
                  <b-collapse
                    :id="`acordion-${group.id}`"
                    accordion="my-accordion"
                    role="tabpanel"
                  >
                    <b-card-body>
                      <b-list-group>
                        <b-list-group-item
                          v-for="student in getStudenGroup(group.id)"
                          :key="`student-${student.id}`"
                        >{{student.name}}</b-list-group-item>
                      </b-list-group>
                      <b-button
                      class="mt-2"
                        variant="outline-primary"
                        @click="asignTask(group, item); $bvModal.hide(`modal-${item.id}`)"
                      >Asignar Grupo</b-button>
                    </b-card-body>
                  </b-collapse>
                </b-card>

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
      groups: [],
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
    handleChange (value) {
      console.log(value)
      console.log(this.studenSelected)
    },
    getStudenGroup (groupId) {
      return this.students.filter(student => student.groupId === groupId);
    },
    async asignTask (group, task) {
      group.assignedTask = task.id;
      await this.$db.collection('groups').doc({ id: group.id }).set(group)
      task.group = group
      await this.$db.collection('tasks').doc({ id: task.id }).set(task)
      this.getData();
    },
    getData () {
      this.$db.collection('tasks').get().then(tasks => {
        console.log(tasks)
        this.tasks = tasks;
      })
      this.$db.collection('groups').get().then(groups => {
        console.log(groups)
        this.groups = groups;
      })
      this.$db.collection('students').get().then(students => {
        console.log(students)
        this.students = students;
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
