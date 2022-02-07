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
        <b-row
          align-h="between"
          align-v="center"
        >
          <b-col>
            <h1 class="display-2 text-white">Gestión de actividades</h1>
            <p class="text-white mt-0 mb-5">Aquí puedes llevar el control de tus actividades</p>
          </b-col>
          <b-col cols="2">
            <b-modal
              id="new-activity-modal"
              type="primary"
              title="Agregue una nueva actividad"
              @hidden="cleanActivity"
              @ok="saveActivity"
              cancel-title="Cancelar"
              ok-title="Crear Actividad"
            >
              <b-form-group label="Nombre de la actividad">
                <b-form-input
                  v-model="activity.name"
                  placeholder="Nombre de la actividad"
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="Tipo de actividad"
                v-slot="{ ariaDescribedby }"
              >
                <b-form-radio
                  v-model="activity.type"
                  :aria-describedby="ariaDescribedby"
                  name="some-radios"
                  value="1"
                >Autoevaluativa</b-form-radio>
                <b-form-radio
                  v-model="activity.type"
                  :aria-describedby="ariaDescribedby"
                  name="some-radios"
                  value="2"
                >Cohevaluativa</b-form-radio>
                <b-form-radio
                  v-model="activity.type"
                  :aria-describedby="ariaDescribedby"
                  name="some-radios"
                  value="3"
                >Heteroevaluativa</b-form-radio>
              </b-form-group>

              <b-form
                inline
                label="Agrergar preguntas"
              >

                <b-form-group label="Agregue una pregunta">
                  <b-form-input
                    id="inline-form-input-name"
                    class="mb-2 mr-sm-2 mb-sm-0 pr-8"
                    placeholder="Escriba su pregunta aqui"
                    v-model="question"
                  ></b-form-input>

                  <b-button
                    variant="primary"
                    @click="addQuestion()"
                  >Agregar</b-button>                  
                </b-form-group>
                  <b-form-group label="Tipo de Pregunta">
                    <b-form-radio
                      
                      :aria-describedby="ariaDescribedby"
                      name="some-radios"
                      value="1"
                      class="mb-2 mr-sm-2 mb-sm-0 pr-8"
                    >Multople opción</b-form-radio>
                    <b-form-radio
                      
                      :aria-describedby="ariaDescribedby"
                      name="some-radios"
                      value="2"
                      class="mb-2 mr-sm-2 mb-sm-0 pr-8"
                    >Verdadero Falso</b-form-radio>
                    <b-form-radio
                      :aria-describedby="ariaDescribedby"
                      name="some-radios"
                      value="3"
                      class="mb-2 mr-sm-6 mb-sm-0 pr-8"
                    >Abierta</b-form-radio>
                  </b-form-group>
              </b-form>
              <b-list-group class="my-2">
                <b-list-group-item
                  v-for="aQuestion in activity.questions"
                  :key="`task-${aQuestion}`"
                >{{aQuestion}}</b-list-group-item>
              </b-list-group>
            </b-modal>
          </b-col>
        </b-row>
        <b-button
              variant="primary"
              v-b-modal.new-activity-modal
            >Crear actividad</b-button>
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
          <b-card :title="item.name ? item.name.toUpperCase(): ''">
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
                :title="item.name"
              >
                <b-form-group label="Tipo de Actividad">
                  <b-form-radio
                    v-model="item.type"
                    :aria-describedby="ariaDescribedby"
                    name="some-radios"
                    value="1"
                    disabled
                  >Autoevaluativa</b-form-radio>
                  <b-form-radio
                    v-model="item.type"
                    :aria-describedby="ariaDescribedby"
                    name="some-radios"
                    value="2"
                    disabled
                  >Cohevaluativa</b-form-radio>
                  <b-form-radio
                    v-model="item.type"
                    :aria-describedby="ariaDescribedby"
                    name="some-radios"
                    value="3"
                    disabled
                  >Heteroevaluativa</b-form-radio>
                </b-form-group>
                <b-form-group label="Preguntas">
                  <b-list-group class="my-2">
                    <b-list-group-item
                      v-for="aQuestion in item.questions"
                      :key="`task-${aQuestion}`"
                    >{{aQuestion}}</b-list-group-item>
                  </b-list-group>
                </b-form-group>

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
      activity: {
        name: '',
        type: '',
        questions: [],
      },
      question: '',
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
    },
    addQuestion () {
      if (this.question.trim()) {
        this.activity.questions.push(this.question);
        this.question = '';
      } else {
        this.question = ''
      }
    },
    cleanActivity () {
      this.activity = {
        name: '',
        type: '',
        questions: [],
      }
      this.question = '';
    },
    async saveActivity (bvModalEvt) {
      bvModalEvt.preventDefault()
      await this.$db.collection('activities').add(this.activity);
      this.cleanActivity();
      this.getData();
      this.$bvModal.hide('new-activity-modal')
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
