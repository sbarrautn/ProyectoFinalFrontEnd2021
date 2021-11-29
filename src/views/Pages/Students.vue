<template>
  <div>
    <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header"
         style="min-height: 600px; background-image: url(img/theme/students-in-classroom-792x418.jpg); background-size: cover; background-position: center top;">
      <b-container fluid>
        <!-- Mask -->
        <span class="mask bg-gradient-success opacity-8"></span>
        <!-- Header container -->
        <b-container fluid class="d-flex align-items-center">
          <b-row >
            <b-col lg="7" md="10">
              <h1 class="display-2 text-white">Gestión de estudiantes</h1>
              <p class="text-white mt-0 mb-5">Aquí puedes llevar el control de tus estudiantes</p>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </div>

    <b-container fluid class="mt--6">
      <b-row>
        <StudentsTable></StudentsTable>
        <b-col xl="8" class="order-xl-1">
          <new-student></new-student>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import router from "../../routes/router";
import NewStudent from './Students/NewStudent.vue';
import StudentsTable from './Students/StudentsTable.vue';

export default {
  data() {
    return {
      error: '',
      model: {
        email: '',
      }
    };
  },
  components: {
    NewStudent,
    StudentsTable
  },
  methods: {
    onSubmit() {
    }
  },
  beforeCreate() {
    let session = localStorage.getItem('session');
    if (!session) {
      session = sessionStorage.getItem('session');
    }
    if (!session) {
      router.push({ name: 'login' });
    }
  }
};
</script>
