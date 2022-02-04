<template>
  <div>
    <div class="header pb-0 pt-5 pt-lg-8 d-flex align-items-center profile-header"
         style="min-height: 600px; background-image: url(img/theme/students-in-classroom-792x418.jpg); background-size: cover; background-position: center top;">
      <b-container fluid>
        <!-- Mask -->
        <span class="mask bg-gradient-success opacity-8"></span>
        <!-- Header container -->
        <b-container fluid class="d-flex align-items-center">
          <b-row>
            <b-col lg="9" md="12">
              <h1 class="display-3 text-white">Nueva asignación de tarea</h1>
              <p class="text-white mt-0 mb-0">Aquí puede realizar nuevas asignaciones de tareas pendientes</p>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </div>
    <!-- Page content -->
    <b-container class="mt -0 pb-5">
                <div class="card-group mt-0">
                  <card
                    title="Tarea titulo"
                    style="max-width: 20rem;"
                    class="mb-2"
                  >
                  <b-button href="#" variant="primary">Go somewhere</b-button>
                  </card>
                </div>
    </b-container>
  </div>
</template>
<script>
import router from "../../../routes/router";
import axios from "axios";

//import axios from "axios";
export default {



  data() {
    return {
      error: '',
      model: {
        id: '',
        title: '',
        status:''
      }
    };
  },
    created() {
                let tareas = {
                           id: '',
                           title:'',

                        };
                axios.post('http://api.proyecto.test/api/tasks', {
                                                                     
                                                                  })
                                                                  .then((response)=> {
                                                                    console.log("por then");
                                                                    console.log(response.data);
                                                                  })
                                                                  .catch((error)=> {
                                                                    console.log("por catch");
                                                                    console.log(error);
                                                                  });
    
  },
};
</script>
