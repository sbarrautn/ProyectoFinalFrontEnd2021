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
            <b-col lg="12" md="10">
              <h1 class="display-2 text-white">Mis cursos</h1>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </div>

    <b-container fluid class="mt--6">
      <b-row>
        <div class="custom-card">
          <card>
            <b-row align-v="center" slot="header">
              <b-col cols="8">
                <h3 class="mb-0">Curso 1</h3>
              </b-col>
              <b-col cols="2">
                <i class="ni ni-bullet-list-67"></i>
              </b-col>
              <b-col cols="2">
                <i class="ni ni-fat-remove"></i>
              </b-col>
            </b-row>

            <b-form @submit.prevent="updateProfile">
              <div class="pl-lg-4">
                <b-row>
                  <b-col lg="12">
                    <img src="img/theme/course-default.png" style="max-width: 200px; padding-right: 15px">
                  </b-col>
                </b-row>
              </div>
            </b-form>
          </card>
        </div>

        <div class="horizontal-space"></div>

        <div class="custom-card">
          <card>
            <b-row align-v="center" slot="header">
              <b-col cols="8">
                <h3 class="mb-0">Curso 2</h3>
              </b-col>
              <b-col cols="2">
                <i class="ni ni-bullet-list-67"></i>
              </b-col>
              <b-col cols="2">
                <i class="ni ni-fat-remove"></i>
              </b-col>
            </b-row>

            <b-form @submit.prevent="updateProfile">
              <div class="pl-lg-4">
                <b-row>
                  <b-col lg="12">
                    <img src="img/theme/course-default.png" style="max-width: 200px; padding-right: 15px">
                  </b-col>
                </b-row>
              </div>
            </b-form>
          </card>
        </div>

        <div class="horizontal-space"></div>

        <div class="custom-card">
          <a href="#">
            <card>
              <b-row align-v="center" slot="header">
                <b-col cols="8">
                  <h3 class="mb-0">Curso 3</h3>
                </b-col>
                <b-col cols="2">
                  <i class="ni ni-bullet-list-67"></i>
                </b-col>
                <b-col cols="2">
                  <i class="ni ni-fat-remove"></i>
                </b-col>
              </b-row>
              <b-form @submit.prevent="updateProfile">
                <div class="pl-lg-4">
                  <b-row>
                    <b-col lg="12">
                      <img src="img/theme/course-default.png" style="max-width: 200px; padding-right: 15px">
                    </b-col>
                  </b-row>
                </div>
              </b-form>
            </card>
          </a>
        </div>
      </b-row>
    </b-container>
    <div class="vertical-space"></div>
  </div>
</template>

<script>
import router from "../../../routes/router";
import {Table, TableColumn} from "element-ui";
import projects from "../../Tables/projects";
import courses from "../../Tables/coursesData";

export default {
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  data() {
    return {
      projects,
      courses,
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
<style scoped>
.horizontal-space {
  margin-right: 30px;
}
.vertical-space {
  margin-bottom: 200px;
}
.btn-info {
  display: inline;
  padding: 3px 5px;
}
</style>
